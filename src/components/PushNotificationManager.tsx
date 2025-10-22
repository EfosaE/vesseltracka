"use client";

import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/app/actions";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(subscription);
  }, [subscription]);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      // ensure server knows about the subscription (sync), we would use a DB connection soon
      if (sub) {
        const serialized = JSON.parse(JSON.stringify(sub)); // safe to serialize
        try {
          await subscribeUser(serialized); // server action
          console.log("Server subscription synced");
        } catch (err) {
          console.error("Failed to sync subscription to server", err);
        }
      }
    } catch (err) {
      console.error("SW registration failed:", err);
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      setSubscription(sub);
      console.log("Subscription Object", sub);
      // Using server actions
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);

      // Send subscription to server API
      // await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(sub.toJSON()),
      // });
    } catch (err) {
      console.error("Subscribe failed:", err);
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();

      // await fetch("/api/unsubscribe", {
      //   method: "POST",
      // });
    } catch (err) {
      console.error("Unsubscribe failed:", err);
    }
  }

  async function sendTestNotification() {
    if (!subscription) return;

    try {
      await sendNotification(message);
      // await fetch("/api/notify", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message }),
      // });
      setMessage("");
    } catch (err) {
      console.error("Send notification failed:", err);
    }
  }

  if (!isSupported) {
    return (
      <div className="my-4">
        <h3 className="text-primary font-bold text-2xl">Push Notifications</h3>
        <p className="text-sm text-gray-600 mt-2">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <h3 className="text-primary font-bold text-2xl">Push Notifications</h3>
      {subscription ? (
        <div className="flex flex-col gap-3 mt-3">
          <p className="text-green-600 text-sm">
            You are subscribed to push notifications.
          </p>
          <button
            onClick={unsubscribeFromPush}
            className="bg-red-500 text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Unsubscribe
          </button>
          <label className="sr-only" htmlFor="test-message">
            Notification message
          </label>
          <Input
            id="test-message"
            type="text"
            placeholder="Enter notification message to test"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={sendTestNotification}
            disabled={message.trim().length === 0}
            className="bg-primary disabled:opacity-50 text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Send Test
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-3">
          <p className="text-gray-600 italic text-sm">
            You are not subscribed to push notifications.
          </p>
          <button
            onClick={subscribeToPush}
            className="bg-primary text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
