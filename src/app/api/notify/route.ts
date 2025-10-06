import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { getSubscription } from "../subscribe/route";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const subscription = getSubscription();

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: "No active subscription" },
        { status: 400 }
      );
    }

    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending push:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
