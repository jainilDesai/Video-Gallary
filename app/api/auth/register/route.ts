import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(requst: NextRequest) {
  try {
    const { email, password } = await requst.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { error: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
