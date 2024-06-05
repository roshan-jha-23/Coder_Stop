import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { oldPassword, newPassword } = await request.json();
    const token:any = request.cookies.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const user = await User.findById(decoded?.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await bcryptjs.compare(oldPassword, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "New password saved" },
      { status: 200 }
    );
  } catch (error) {
    console.log("An error occurred: ", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
