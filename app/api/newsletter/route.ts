import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { SITE_URL, SOCIALS } from '@/lib/constants';

// Validation function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Import inside function to avoid module resolution issues
    const { createClient } = await import('@supabase/supabase-js');

    // Initialize Supabase client for this request
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const body = await request.json();
    const { email } = body;

        // Validation
        if (!email) {
        return NextResponse.json(
            { error: 'Email is required.' },
            { status: 400 }
        );
        }

        if (!validateEmail(email)) {
        return NextResponse.json(
            { error: 'Please provide a valid email address.' },
            { status: 400 }
        );
        }

        // Check if email already exists before inserting
        const { data: existingData, error: checkError } = await supabase
          .from('newsletter_subscribers')
          .select('id')
          .eq('email', email)
          .single();

        if (!checkError && existingData) {
          // Email already subscribed
          console.log('Email already subscribed:', email);
          return NextResponse.json(
            { 
              success: true, 
              message: 'You are already subscribed to our newsletter!',
              isExisting: true
            },
            { status: 200 }
          );
        }

        // Store email in Supabase (only if not already exists)
        const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, subscribed_at: new Date().toISOString() }])
        .select();
        
        if (subscriptionError) {
        console.error('Supabase insertion error:', subscriptionError);
        // Don't throw - continue with email sending even if DB fails
        } else {
        console.log('Email stored in Supabase:', subscriptionData);
        }


        // const db = client.db('your_db');
        //     await db.collection('newsletter_subscribers').insertOne({
        //     email,
        //     subscribedAt: new Date(),
        // });

        // For now, log the subscription
        console.log('Newsletter subscription:', {
        email,
        subscribedAt: new Date().toISOString(),
        });

        // Send welcome email to subscriber
        const welcomeEmailSent = await sendWelcomeEmail(email);
        console.log('Welcome email sent:', welcomeEmailSent);

        // Send admin notification
        const adminNotificationSent = await sendAdminNotification(email);
        console.log('Admin notification sent:', adminNotificationSent);

      return NextResponse.json(
      {
        success: true,
        message: 'Welcome! Check your email for updates and exclusive content.',
      },
      { status: 200 }
    );
    } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process your subscription. Please try again later.' },
      { status: 500 }
    );
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(userEmail: string): Promise<boolean> {
  try {
    const result = await resend.emails.send({
      from: 'THE P.R. LAB AFRICA <noreply@theprlabafrica.co>',
      to: userEmail,
      subject: 'Welcome to THE P.R. LAB Newsletter',
      html: `
        <div style="background: linear-gradient(135deg, #f5f1ed 0%, #faf8f6 100%); border-radius: 12px; padding: 40px 20px; font-family: 'Segoe UI', Arial, sans-serif; width: 100%; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(42, 36, 32, 0.1); overflow: hidden;">
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #2A2420 0%, #3d3430 100%); padding: 40px 30px; text-align: center; border-bottom: 4px solid #D4A574;">
              <h1 style="color: #f5f1ed; margin: 0; font-size: 28px; letter-spacing: 1px;">THE P.R. LAB AFRICA</h1>
              <p style="color: #D4A574; margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Where Beauty Meets Proof</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #2A2420; margin: 0 0 20px 0; font-size: 24px; text-align: center;">Welcome Aboard! 🎉</h2>
              
              <p style="color: #4D443D; line-height: 1.8; font-size: 15px; margin: 0 0 25px 0;">
                Thank you for subscribing to our newsletter! We're thrilled to have you join our community of beauty enthusiasts and industry professionals.
              </p>
              
              <div style="border-left: 5px solid #D4A574; padding: 20px; margin: 25px 0;">
                <p style="color: #2A2420; margin: 0 0 15px 0; font-weight: 600; font-size: 15px;">You'll now receive:</p>
                <ul style="color: #4D443D; line-height: 2; margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>Protocol-led beauty intelligence updates</li>
                  <li>Exclusive beauty insights and research</li>
                  <li>Product testing and certification news</li>
                  <li>Special offers and magazine releases</li>
                </ul>
              </div>
              
              <p style="color: #4D443D; line-height: 1.8; font-size: 15px; margin: 25px 0;">
                We're committed to delivering <strong>proof-driven beauty information</strong> to your inbox. Our team works tirelessly to bring you the latest in beauty science and industry trends.
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://www.theprlabafrica.co" style="display: inline-block; background: linear-gradient(135deg, #2A2420 0%, #3d3430 100%); color: #f5f1ed; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #D4A574;">Visit Our Website</a>
              </div>
              
              <p style="color: #666; font-size: 13px; margin: 30px 0 0 0; text-align: center; line-height: 1.8;">
                Have questions? Contact us:<br/>
                <a href="mailto:info@theprlabafrica.co" style="color: #D4A574; text-decoration: none; font-weight: 600;">📧 theprlabafrica</a><br/>
                <a href="https://wa.me/2349123750327" style="color: #D4A574; text-decoration: none; font-weight: 600;">WhatsApp: +234 912 375 0327</a>
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
    // Check if response contains error
    if ('error' in result && result.error) {
      console.error('Resend error:', result.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}

async function sendAdminNotification(userEmail: string): Promise<boolean> {
  try {
    const adminMail1 = process.env.ADMIN_EMAIL1 || 'info@theprlabafrica.co';
    
    // Parse CC emails from environment variable (comma-separated)
    // Example: "admin1@example.com,admin2@example.com"
    const bccEmails = process.env.ADMIN_BCC_EMAILS 
      ? process.env.ADMIN_BCC_EMAILS.split(',').map(email => email.trim()).filter(email => email)
      : [];
    
    const result = await resend.emails.send({
      from: 'THE P.R. LAB AFRICA <noreply@theprlabafrica.co>',
      to: adminMail1,
      ...(bccEmails.length > 0 && { bcc: bccEmails }),
      subject: 'New Newsletter Subscriber',
      html: `
        <div style="background: linear-gradient(135deg, #f5f1ed 0%, #faf8f6 100%); padding: 40px 20px; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(42, 36, 32, 0.1); overflow: hidden;">
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #2A2420 0%, #3d3430 100%); padding: 30px 30px; text-align: center; border-bottom: 4px solid #D4A574;">
              <h1 style="color: #f5f1ed; margin: 0; font-size: 24px; letter-spacing: 1px;">THE P.R. LAB AFRICA</h1>
              <p style="color: #D4A574; margin: 8px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Newsletter Admin Alert</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 30px;">
              <h2 style="color: #2A2420; margin: 0 0 20px 0; font-size: 20px; text-align: center;">New Subscriber Alert</h2>
              
              <div style="background: #faf8f6; border-left: 4px solid #D4A574; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #4D443D; margin: 0 0 15px 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Email Address:</strong><br/>
                  <span style="color: #666; font-size: 16px; word-break: break-all;">${userEmail}</span>
                </p>
                
                <p style="color: #4D443D; margin: 0 0 15px 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Subscription Time:</strong><br/>
                  <span style="color: #666;">${new Date().toLocaleString()}</span>
                </p>
                
                <p style="color: #4D443D; margin: 0; font-size: 14px;">
                  <strong style="color: #2A2420;">Total Action:</strong><br/>
                  <span style="color: #666;">New user added to newsletter_subscribers table</span>
                </p>
              </div>
              
              <div style="border-left: 5px solid #ffc107; padding: 15px; margin: 20px 0;">
                <p style="color: #2A2420; margin: 0; font-size: 13px; font-weight: 600;">
                  Note: Welcome email has been automatically sent to the subscriber.
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
    // Check if response contains error
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
