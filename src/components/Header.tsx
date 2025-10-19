"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, Menu, MoreHorizontal } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useAppContext } from "@/context/AppContext";

const Header = () => {
  const { isOnline, toggleSidebar, isSidebarOpen } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Proper cleanup for both listeners
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

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

        {/* Mobile 'more' menu: visible only on xs, consolidates controls into a dropdown */}
        {!isSidebarOpen && (
          <div className="sm:hidden relative" ref={mobileMenuRef}>
          <button
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="More"
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-primary">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </button>

          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
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
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-600" />
                Notifications
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" aria-hidden />
              </button>
              <hr className="my-1" />
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Settings</button>
              <hr className="my-1" />
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">Logout</button>
            </div>
          )}
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
  <div ref={dropdownRef} className="relative hidden sm:block">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            type="button"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            aria-controls="user-menu"
            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary">
            <img
              src="/avatar-placeholder.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              id="user-menu"
              role="menu"
              aria-label="User menu"
              className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 sm:rounded-xl rounded-b-xl shadow-lg py-1 animate-fadeIn z-50">
              <button
                role="menuitem"
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                Profile
              </button>
              <button
                role="menuitem"
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                Settings
              </button>
              <hr className="my-1" />
              <button
                role="menuitem"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
