"use client";

import { sidebarItems, type SidebarItem } from "@/lib/sidebar-items";
import Link from "next/link";
import { useState } from "react";
import { Send } from "lucide-react"; // Example icon — replace with your logo

export default function Sidebar() {
  const [expand, setExpand] = useState(false);

  return (
    <aside
      className={`h-screen bg-muted flex flex-col transition-all duration-300
        ${expand ? "w-60" : "w-20"}
      `}
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
    >
      {/* === Logo Section (no border, same alignment as items) === */}
      <div className="flex items-center gap-3 p-4 mt-2">
        <Send className="w-6 h-6 flex-shrink-0" />
        {expand && (
          <span className="text-xl font-bold tracking-wide">
            SENDFLOW
          </span>
        )}
      </div>

      {/* === Sidebar Items === */}
      <ul className="flex flex-col gap-1 mt-2 px-2">
        {sidebarItems.map((item: SidebarItem, index: number) => {
          const Icon = item.icon;
          return (
            <li key={index}>
              <Link
                href={item.path as any}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-200 transition"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {expand && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
