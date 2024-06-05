import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";


connect();
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
      success: true,
    });
   await response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
