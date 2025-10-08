"use client";
import React, { useEffect, useState } from "react";


const InstallPrompt = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install prompt if already installed
  }

  return (
    <div className="my-4 w-full max-w-xl">
      <h3 className="text-primary font-bold text-2xl">
        Install App
        <span className="block italic text-sm font-normal mt-1 text-gray-600">
          Windows and Android usually show an automatic install prompt. Use the button below for other platforms.
        </span>
      </h3>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="button"
          className="bg-primary text-white py-2 px-4 rounded-md w-full sm:w-auto text-left"
          aria-label="Prompt to add app to home screen"
        >
          Add to Home Screen
        </button>

        {isIOS && (
          <p className="text-sm text-gray-700">
            On iOS: tap the share icon then choose "Add to Home Screen" to install
            <span aria-hidden> ➕</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;
