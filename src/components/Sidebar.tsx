"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Ship,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-primary text-white flex flex-col p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}>
      {/* Header / Toggle */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h2 className="text-2xl font-bold">VesselTracka</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-primary-light">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary-light transition">
          <LayoutDashboard size={20} />
          {!collapsed && <span>Overview</span>}
        </Link>

        <Link
          href="/vessels"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary-light transition">
          <Ship size={20} />
          {!collapsed && <span>Vessels</span>}
        </Link>

        <Link
          href="/outreach"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary-light transition">
          <Ship size={20} />
          {!collapsed && <span>Outreach</span>}
        </Link>
        <Link
          href="/reports"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary-light transition">
          <BarChart3 size={20} />
          {!collapsed && <span>Reports</span>}
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary-light transition">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </Link>
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
