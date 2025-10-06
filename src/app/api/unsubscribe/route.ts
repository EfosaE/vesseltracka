import { NextResponse } from "next/server";
import { clearSubscription } from "../subscribe/route";

export async function POST() {
  try {
    clearSubscription();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
