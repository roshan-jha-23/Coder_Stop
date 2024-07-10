import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, profilePicUrl, favoritecodinglanguage, skills, bio } =
      reqBody;

    // Validate the presence of email
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user profile fields
    user.bio = bio || user.bio;
    user.favoritecodinglanguage =
      favoritecodinglanguage || user.favoritecodinglanguage;
    user.skills = skills || user.skills;

    await user.save();

    return NextResponse.json(
      { message: "Profile updated successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
