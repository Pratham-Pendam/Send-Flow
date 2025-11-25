import { LayoutDashboard, Workflow } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

export type SidebarItem = {
  name: string;
  icon: LucideIcon; // Lucide icons are React components
  path: string;
};
export const sidebarItems: SidebarItem[] = [
    {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
    },
    {
    name: "WorkFlows",
    icon: Workflow,
    path: "/workflows"
  }
   
]