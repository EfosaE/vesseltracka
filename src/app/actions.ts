"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// Store subscription in-memory (replace with DB in production)
let subscription: webpush.PushSubscription | null = null;

// Helper to normalize browser subscription to web-push format
function normalizeSubscription(sub: PushSubscription): webpush.PushSubscription {
  return {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.toJSON().keys?.p256dh || "",
      auth: sub.toJSON().keys?.auth || "",
    },
  };
}

export async function subscribeUser(sub: PushSubscription) {
  subscription = normalizeSubscription(sub);
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
