"use client";

import { sidebarItems, type SidebarItem } from "@/lib/sidebar-items";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Send, ChevronDown } from "lucide-react"; // Example icon — replace with your logo

export default function Sidebar() {
  const [expand, setExpand] = useState(false);
  const [workflowsOpen, setWorkflowsOpen] = useState(false);
  const pathname = usePathname();

  // Auto-open workflows accordion when on workflows routes
  useEffect(() => {
    if (pathname.startsWith("/workflows") || pathname.startsWith("/workflow")) {
      setWorkflowsOpen(true);
    }
  }, [pathname]);

  const isActive = (item: SidebarItem) => {
    // Exact match for dashboard
    if (item.path === "/dashboard") return pathname === "/dashboard";
    // Handle dynamic workflows path like /workflows/:id
    if (item.path.startsWith("/workflows") || item.path.startsWith("/workflow")) {
      return pathname.startsWith("/workflows") || pathname.startsWith("/workflow");
    }
    return pathname === item.path;
  };

  return (
    <aside
      className={`relative h-screen bg-muted flex flex-col transition-all duration-300
        ${expand ? "w-60" : "w-15"}
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
          const active = isActive(item);
          const isWorkflows = item.name.toLowerCase().includes("workflow");
          return (
            <li key={index}>
              <Link
                href={item.path as any}
                className={
                  `flex items-center gap-3 p-2 rounded-lg transition ` +
                  (active
                    ? "bg-indigo-100 text-foreground font-medium ring-1 ring-indigo-200"
                    : "hover:bg-indigo-100/70")
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {expand && (
                  <>
                    <span className="flex-1 text-left">{item.name}</span>
                    {isWorkflows && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setWorkflowsOpen((v) => !v);
                        }}
                        className="ml-auto p-1 rounded hover:bg-indigo-100"
                        aria-label="Toggle workflows menu"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${workflowsOpen ? "rotate-180" : "rotate-0"}`}
                        />
                      </button>
                    )}
                  </>
                )}
              </Link>
              {/* Accordion content for Workflows (add links once routes are confirmed) */}
              {isWorkflows && workflowsOpen && expand && (
                <div className="ml-10 mt-1 mb-2 space-y-1 text-sm">
                  {/* <Link
                    href={"/workflows" as any}
                    className={
                      `block px-2 py-1 rounded hover:bg-indigo-100 ` +
                      (pathname === "/workflows" ? "bg-indigo-200 font-medium" : "")
                    }
                  >
                    All Workflows
                  </Link>
                  <Link
                    href={"/workflows/new" as any}
                    className={
                      `block px-2 py-1 rounded hover:bg-indigo-100 ` +
                      (pathname === "/workflows/new" ? "bg-indigo-200 font-medium" : "")
                    }
                  >
                    Create Workflow
                  </Link> */}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {/* Elegant hairline divider instead of a hard border */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent"
      />
    </aside>
  );
}
