import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("mai yaha tak aaya")
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("mai yaha tak aaya 2");
    // Send verification email
 await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });
console.log("mai yaha tak aaya 3");
    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        user: savedUser,
      },
      { status: 201 }
    );
  } catch (error:any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
