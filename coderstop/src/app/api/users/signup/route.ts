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
    const existingUserByUsernameAndIsVerified = await User.findOne({
      username: username,
      isVerified: true,
    });
    if (existingUserByUsernameAndIsVerified) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
      
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If the user exists and is verified, return an error
      if (existingUser.isVerified) {
        return NextResponse.json(
          { message: "Email already exists and is verified" },
          { status: 400 }
        );
      } else {
        // If the user exists but is not verified, update password and send verification email
        const hashedPassword = await bcryptjs.hash(password, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();

        // Send verification email
        await sendEmail({
          email,
          emailType: "VERIFY",
          userId: existingUser._id,
        });

        return NextResponse.json(
          {
            message: "User registered successfully. Verification email sent.",
            success: true,
          },
          { status: 200 }
        );
      }
    } else {
      // If the user does not exist, create a new user
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      // Send verification email
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });

      return NextResponse.json(
        {
          message: "User registered successfully",
          success: true,
          user: savedUser,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
