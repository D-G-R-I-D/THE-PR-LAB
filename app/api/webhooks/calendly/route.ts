import { NextRequest, NextResponse } from 'next/server';

/**
 * Calendly Webhook Handler
 * Receives booking events and sends email notifications to info@theprlabafrica.co
 * 
 * Set up in Calendly:
 * 1. Go to Settings → Webhooks
 * 2. Add webhook URL: https://yourdomain.com/api/webhooks/calendly
 * 3. Subscribe to: invitee.created event
 * 4. (Optional) Add authorization header for security
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the event (useful for debugging)
    console.log('Calendly Webhook Event:', body);

    // Check if it's an invitee.created event (booking confirmation)
    if (body.event === 'invitee.created') {
      const eventData = body.payload.event;
      const inviteeData = body.payload.invitee;

      // Send notification email
      const emailSent = await sendBookingNotification({
        eventName: eventData.name,
        eventDate: eventData.start_time,
        eventDuration: eventData.duration_minutes,
        inviteeName: inviteeData.name,
        inviteeEmail: inviteeData.email,
        inviteePhone: inviteeData.phone_number,
        inviteeNotes: inviteeData.text_reminder_number,
      });

      if (!emailSent) {
        console.error('Failed to send booking notification email');
        return NextResponse.json(
          { error: 'Failed to send notification' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendBookingNotification(bookingData: {
  eventName: string;
  eventDate: string;
  eventDuration: number;
  inviteeName: string;
  inviteeEmail: string;
  inviteePhone?: string;
  inviteeNotes?: string;
}) {
  try {
    // Using your existing contact/email API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/contact`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `New Appointment Booking: ${bookingData.eventName}`,
          name: bookingData.inviteeName,
          email: bookingData.inviteeEmail,
          message: `
            A new appointment has been booked:
            
            Event: ${bookingData.eventName}
            Date & Time: ${new Date(bookingData.eventDate).toLocaleString()}
            Duration: ${bookingData.eventDuration} minutes
            
            Client Name: ${bookingData.inviteeName}
            Client Email: ${bookingData.inviteeEmail}
            ${bookingData.inviteePhone ? `Client Phone: ${bookingData.inviteePhone}` : ''}
            ${bookingData.inviteeNotes ? `Notes: ${bookingData.inviteeNotes}` : ''}
          `,
          notificationEmail: 'info@theprlabafrica.co',
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Error sending booking notification:', error);
    return false;
  }
}
