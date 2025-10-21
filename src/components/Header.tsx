"use client";

import React from "react";
import { Bell, ChevronDown, Menu, MoreHorizontal } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { isOnline, toggleSidebar, isSidebarOpen } = useAppContext();
  // Dropdown open/close is handled by shadcn (Radix) DropdownMenu - no local state needed

  return (
    <header className="w-full bg-background shadow-sm flex items-center justify-between px-4 md:px-6 py-3 sticky top-0 z-50">
      {/* Left section — Logo & mobile toggle */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle sidebar">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo or title */}
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          VesselTracka
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Online status */}
        <div className="hidden sm:flex items-center gap-2">
          <span
            aria-hidden
            className={`w-2.5 h-2.5 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm text-gray-600 font-medium">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        {/* Mobile-friendly online status: visible on xs as a compact badge — hidden when mobile nav is open */}
        {!isSidebarOpen && (
          <div className="sm:hidden flex flex-col items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            } mr-2`}
            aria-hidden
          />
          <span className="text-xs">{isOnline ? "Online" : "Offline"}</span>
          </div>
        )}

        {/* Theme toggle (hidden on extra-small screens) */}
        <div className="hidden sm:flex items-center">
          <ModeToggle />
        </div>

        {/* Mobile 'more' menu: visible only on xs, consolidates controls into a dropdown (shadcn) */}
        {!isSidebarOpen && (
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="More">
                  <MoreHorizontal className="w-5 h-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
                      aria-hidden
                    />
                    <span className="text-sm text-gray-600">{isOnline ? "Online" : "Offline"}</span>
                  </div>
                  <div>
                    <ModeToggle />
                  </div>
                </div>
                <hr className="my-1" />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-600" />
                  Notifications
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" aria-hidden />
                </DropdownMenuItem>
                <hr className="my-1" />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <hr className="my-1" />
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Notifications - hidden on xs because mobile 'More' menu contains notifications */}
        <div className="hidden sm:block">
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 hover:bg-gray-100 rounded-full transition focus:outline-none focus:ring-2 focus:ring-primary">
            <Bell className="w-5 h-5 text-gray-700" />
            <span
              className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              aria-hidden
            />
          </button>
        </div>

  {/* Avatar & Dropdown - hidden on xs because mobile 'More' menu contains profile actions */}
        <div className="relative hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition">
                <img
                  src="/avatar-placeholder.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <hr className="my-1" />
              <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
