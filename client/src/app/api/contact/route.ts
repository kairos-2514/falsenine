import { NextResponse } from "next/server";
import { Resend } from "resend";
import { MongoClient } from "mongodb";

const resend = new Resend(process.env.RESEND_API_URL);
const mongo = new MongoClient(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await mongo.connect();
    const db = mongo.db("your-db");
    await db.collection("messages").insertOne({
      name,
      email,
      subject: subject || "No Subject",
      message,
      timestamp: new Date(),
    });

    await resend.emails.send({
      to: "electrifyingthefuture@vividgroup.in",
      from: "http://localhost:3000",
      subject: `New contact form submission: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await mongo.close();
  }
}
