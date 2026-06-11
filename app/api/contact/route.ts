import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Validation function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Allow empty phone, but if provided, check it's valid
  if (!phone) return true;
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Nigerian format: 11 digits (08012345678) or 13 with country code (2348012345678)
  // International formats: typically 7-15 digits
  const isValidLength = digitsOnly.length >= 7 && digitsOnly.length <= 15;
  
  // Check format allows only phone-like characters
  const phoneRegex = /^[\d\s+\-().]+$/;
  
  return phoneRegex.test(phone) && isValidLength;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend or your email service
    // For now, we'll log the data and send a success response
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send auto-response email to user (when email service is configured)
    const autoResponseSent = await sendAutoResponse(email, name);
    console.log('Auto-response sent:', autoResponseSent);

    // Send notification to admin (when email service is configured)
    const adminNotificationSent = await sendAdminNotification({ name, email, phone, message });
    console.log('Admin notification sent:', adminNotificationSent);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received! We will get back to you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}


// Optional: Add email sending functions below
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendAutoResponse(userEmail: string, userName: string) {
  try {
    // Parse CC emails from environment variable (comma-separated)
    // Example: "admin1@example.com,admin2@example.com"
    // const bccEmails = process.env.ADMIN_BCC_EMAILS 
    //   ? process.env.ADMIN_BCC_EMAILS.split(',').map(email => email.trim()).filter(email => email)
    //   : [];
    const result = await resend.emails.send({
      from: 'THE P.R. LAB AFRICA <info@theprlabafrica.co>',
      to: userEmail,
      // ...(bccEmails.length > 0 && { bcc: bccEmails }),
      subject: 'We received your message - THE P.R. LAB',
      html: `
        <div style="background: linear-gradient(135deg, #f5f1ed 0%, #faf8f6 100%); padding: 40px 20px; font-family: 'Segoe UI', Arial, sans-serif; width: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(42, 36, 32, 0.1); overflow: hidden;">
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #2A2420 0%, #3d3430 100%); padding: 40px 30px; text-align: center; border-bottom: 4px solid #D4A574;">
              <h1 style="color: #f5f1ed; margin: 0; font-size: 28px; letter-spacing: 1px;">THE P.R. LAB AFRICA</h1>
              <p style="color: #D4A574; margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Message Received</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #2A2420; margin: 0 0 10px 0; font-size: 24px;">Hello ${userName}!</h2>
              
              <p style="color: #4D443D; line-height: 1.8; font-size: 15px; margin: 0 0 25px 0;">
                Thank you for reaching out to THE P.R. LAB. We have received your message and truly appreciate your interest in our services.
              </p>
              
              <div style="background: #faf8f6; border-left: 4px solid #D4A574; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <p style="color: #2A2420; margin: 0 0 15px 0; font-weight: 600; font-size: 15px;">What happens next?</p>
                <ul style="color: #4D443D; line-height: 2; margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>Our team will review your inquiry carefully</li>
                  <li>We'll get back to you within 24 hours</li>
                  <li>For urgent matters, contact us via WhatsApp</li>
                </ul>
              </div>
              
              <p style="color: #4D443D; line-height: 1.8; font-size: 15px; margin: 25px 0;">
                In the meantime, feel free to explore our services and learn more about our protocol-driven approach to beauty intelligence. We're always here to help!
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://www.theprlabafrica.co" style="display: inline-block; background: linear-gradient(135deg, #2A2420 0%, #3d3430 100%); color: #f5f1ed; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #D4A574;">Explore Our Services</a>
              </div>
              
              <p style="color: #666; font-size: 13px; margin: 30px 0 0 0; text-align: center; line-height: 1.8;">
                For urgent inquiries:<br/>
                <a href="https://wa.me/2349123750327" style="color: #D4A574; text-decoration: none; font-weight: 600;">WhatsApp: +234 912 375 0327</a><br/>
                <a href="mailto:info@theprlabafrica.co" style="color: #D4A574; text-decoration: none; font-weight: 600;">📧 theprlabafrica</a>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #faf8f6; padding: 25px 30px; text-align: center; border-top: 1px solid #e8e4df;">
              <p style="color: #999; font-size: 12px; margin: 0; line-height: 1.6;">
                © ${new Date().getFullYear()} THE P.R. LAB AFRICA. All rights reserved.<br/>
                <span style="color: #bbb;">Proof-Driven Beauty Intelligence</span>
              </p>
            </div>
          </div>
        </div>
      `,
    });
    if ('error' in result && result.error) {
      console.error('Resend error:', result.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to send auto-response:', error);
    return false;
  }
}

async function sendAdminNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    //  const adminEmail = process.env.ADMIN_EMAIL || 'theprlabafrica@gmail.com';
    
    // Parse CC emails from environment variable (comma-separated)
    // Example: "admin1@example.com,admin2@example.com"
    const bccEmails = process.env.ADMIN_BCC_EMAILS 
      ? process.env.ADMIN_BCC_EMAILS.split(',').map(email => email.trim()).filter(email => email)
      : [];

    const adminMail1 = process.env.ADMIN_EMAIL1 || 'info@theprlabafrica.co'  
    const result = await resend.emails.send({
      from: 'THE P.R. LAB AFRICA <info@theprlabafrica.co>',
      to: adminMail1,
      ...(bccEmails.length > 0 && { bcc: bccEmails }),
      subject: `New Contact: ${contactData.name}`,
      html: `
        <div style="background: linear-gradient(135deg, #f5f1ed 0%, #faf8f6 100%); padding: 40px 20px; font-family: 'Segoe UI', Arial, sans-serif; width: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(42, 36, 32, 0.1); overflow: hidden;">
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #2A2420 0%, #3d3430 100%); padding: 30px 30px; text-align: center; border-bottom: 4px solid #D4A574;">
              <h1 style="color: #f5f1ed; margin: 0; font-size: 24px; letter-spacing: 1px;">THE P.R. LAB AFRICA</h1>
              <p style="color: #D4A574; margin: 8px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">New Contact Inquiry</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 30px;">
              <h2 style="color: #2A2420; margin: 0 0 20px 0; font-size: 20px;">Contact Form Submission</h2>
              
              <div style="background: #faf8f6; border-left: 4px solid #D4A574; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #4D443D; margin: 0 0 12px 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Name:</strong><br/>
                  <span style="color: #666;">${contactData.name}</span>
                </p>
                
                <p style="color: #4D443D; margin: 0 0 12px 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Email:</strong><br/>
                  <a href="mailto:${contactData.email}" style="color: #D4A574; text-decoration: none; font-weight: 600;">${contactData.email}</a>
                </p>
                
                ${contactData.phone ? `
                <p style="color: #4D443D; margin: 0 0 12px 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Phone:</strong><br/>
                  <span style="color: #666;">${contactData.phone}</span>
                </p>
                ` : ''}
                
                <p style="color: #4D443D; margin: 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Submission Time:</strong><br/>
                  <span style="color: #666;">${new Date().toLocaleString()}</span>
                </p>
              </div>
              
              <div style="margin: 20px 0;">
                <p style="color: #2A2420; margin: 0 0 10px 0; font-weight: 600; font-size: 14px;">Message:</p>
                <div style="background: #fff9f5; border: 1px solid #e8e4df; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #4D443D; font-size: 14px; line-height: 1.6;">
                  ${contactData.message}
                </div>
              </div>
              
              <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #2e7d32; margin: 0; font-size: 13px; font-weight: 600;">
                  Action Required: Please respond to this inquiry within 24 hours.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #faf8f6; padding: 20px 30px; text-align: center; border-top: 1px solid #e8e4df;">
              <p style="color: #999; font-size: 11px; margin: 0; line-height: 1.6;">
                © ${new Date().getFullYear()} THE P.R. LAB AFRICA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    });
    if ('error' in result && result.error) {
      console.error('Resend error:', result.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}

