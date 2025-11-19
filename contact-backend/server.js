import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "customercare@newshivkrupaauto.com",
      subject: `New Inquiry: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});





app.post("/dealer", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    whatsapp,
    businessName,
    businessType,
    gst,
    experience,
    address,
    city,
    state,
    pincode,
    district,
    products,
    investment,
    space,
    monthlyTarget,
    additionalInfo,
    referral,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "customercare@newshivkrupaauto.com",
      subject: "🧾 New Dealer Application Received",
      text: `
📋 DEALER APPLICATION DETAILS

👤 PERSONAL INFORMATION
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
WhatsApp: ${whatsapp || "N/A"}

🏢 BUSINESS INFORMATION
Business Name: ${businessName}
Business Type: ${businessType}
GST Number: ${gst || "N/A"}
Experience: ${experience}

📍 LOCATION DETAILS
Address: ${address}
City: ${city}
State: ${state}
Pincode: ${pincode}
District: ${district}

🛠 PRODUCTS OF INTEREST
${Array.isArray(products) ? products.join(", ") : products}

💰 BUSINESS CAPACITY
Investment Capacity: ${investment}
Available Space: ${space} sq ft
Expected Monthly Target: ${monthlyTarget}

📝 ADDITIONAL INFORMATION
Reason: ${additionalInfo || "N/A"}
Referral Source: ${referral || "N/A"}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Dealer application sent successfully!" });
  } catch (error) {
    console.error("Dealer form error:", error);
    res.status(500).json({ success: false, message: "Error sending dealer application" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
