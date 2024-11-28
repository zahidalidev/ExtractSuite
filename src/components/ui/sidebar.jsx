"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export const SidebarProvider = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarInset = ({ children }) => (
  <div className="flex-1 flex flex-col">{children}</div>
);

export const SidebarTrigger = ({ className }) => (
  <button className={className}>☰</button>
);

export const SidebarMenu = ({ children }) => (
  <nav className="sidebar-menu">{children}</nav>
);

export const SidebarMenuItem = ({ children }) => (
  <div className="sidebar-menu-item">{children}</div>
);

export const SidebarMenuButton = ({ children, onClick }) => (
  <button className="sidebar-menu-button" onClick={onClick}>{children}</button>
);

export const SidebarMenuAction = ({ children, onClick }) => (
  <button className="sidebar-menu-action" onClick={onClick}>{children}</button>
);

export const SidebarMenuSub = ({ children }) => (
  <div className="sidebar-menu-sub">{children}</div>
);

export const SidebarMenuSubItem = ({ children }) => (
  <div className="sidebar-menu-sub-item">{children}</div>
);

export const SidebarMenuSubButton = ({ children, onClick }) => (
  <button className="sidebar-menu-sub-button" onClick={onClick}>{children}</button>
);

export const SidebarFooter = ({ children }) => (
  <footer className="sidebar-footer">{children}</footer>
);
