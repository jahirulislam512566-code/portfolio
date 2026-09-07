import { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode | string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  isActive?: boolean;
  isExternal?: boolean;
  isDisabled?: boolean;
  roles?: string[];
  children?: NavItem[];
  section?: string;
  order?: number;
}

export interface NavSection {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode | string;
  items: NavItem[];
  isMain?: boolean;
  order?: number;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
  icon?: ReactNode | string;
}

export interface NavigationConfig {
  main: NavSection[];
  footer: NavSection[];
  sidebar: NavSection[];
  breadcrumbs: BreadcrumbItem[];
}

export interface NavigationState {
  isOpen: boolean;
  activeSection: string;
  activeItem: string;
  isMobileOpen: boolean;
}

export type NavigationAction = 
  | { type: "OPEN_NAV" }
  | { type: "CLOSE_NAV" }
  | { type: "TOGGLE_NAV" }
  | { type: "SET_ACTIVE_SECTION"; payload: string }
  | { type: "SET_ACTIVE_ITEM"; payload: string }
  | { type: "OPEN_MOBILE" }
  | { type: "CLOSE_MOBILE" }
  | { type: "TOGGLE_MOBILE" };