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
    const result = await resend.emails.send({
      from: 'theprlabafrica@gmail.com',
      //noreply@theprlabafrica.co
      to: userEmail,
      subject: 'We received your message - THE P.R. LAB',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Dear ${userName},</p>
          <p>Thank you for reaching out to THE P.R. LAB. We have received your message and appreciate your interest in our services.</p>
          <p>Our team will review your inquiry and get back to you within 24 hours during business hours.</p>
          <p>In the meantime, feel free to explore our services at <a href="https://www.theprlabafrica.co">www.theprlabafrica.co</a> or contact us via WhatsApp for urgent matters.</p>
          <p>Best regards,<br/>THE P.R. LAB Team</p>
        </div>
      `,
    });
    return !!result.data?.id;
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
    const result = await resend.emails.send({
      from: 'chukwudid344@gmail.com',
      //noreply@theprlabafrica.co
      to: process.env.ADMIN_EMAIL || 'theprlabafrica@gmail.com',
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px;">${contactData.message}</p>
          <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        </div>
      `,
    });
    return !!result.data?.id;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}

