import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// temporary in-memory store (replace with DB)
let subscription: webpush.PushSubscription | null = null;

function normalizeSubscription(sub: any): webpush.PushSubscription {
  return {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.keys?.p256dh || "",
      auth: sub.keys?.auth || "",
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    subscription = normalizeSubscription(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

// Export subscription so other routes (notify/unsubscribe) can use it
export function getSubscription() {
  return subscription;
}
export function clearSubscription() {
  subscription = null;
}
