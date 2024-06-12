import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    //validation
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "user not found You need to login first" },
        { status: 404 }
      );
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Check Your Credential" },
        { status: 401 }
      );
    }
    const verified=await user.isVerified
    if(!verified){
        return NextResponse.json(
          { message: "You need to verify first" },
          { status: 401 }
        );
    }
   
    const payload = {
      email: user.email,
      id: user._id,
      username: user.username,
    };
    const token =  jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
   
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
