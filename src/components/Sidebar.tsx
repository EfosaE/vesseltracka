"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import {
  LayoutDashboard,
  Ship,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useAppContext();

  console.log("Sidebar render - isSidebarOpen:", isSidebarOpen);

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-screen bg-primary text-white flex flex-col p-4 transition-all duration-300 z-40
        ${collapsed ? "w-fit" : "md:w-64 w-4/5"}
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}>
      {/* Header / Toggle */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h2 className="text-2xl font-bold">VesselTracka</h2>}
        <div className="flex items-center gap-2">
          {/* Mobile close button */}
          <button
            onClick={() => isSidebarOpen && toggleSidebar()}
            aria-label="Close sidebar"
            className="md:hidden p-1 rounded hover:bg-primary-light">
            <X size={18} />
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-primary-light">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-2">
        {([
          { href: "/", label: "Overview", icon: <LayoutDashboard size={20} /> },
          { href: "/vessels", label: "Vessels", icon: <Ship size={20} /> },
          { href: "/outreach", label: "Outreach", icon: <Ship size={20} /> },
          { href: "/reports", label: "Reports", icon: <BarChart3 size={20} /> },
          { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
        ]).map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded transition"
            onClick={() => {
              if (isSidebarOpen) toggleSidebar();
            }}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer (Logout) */}
      <div className="mt-auto">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-700 transition">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
