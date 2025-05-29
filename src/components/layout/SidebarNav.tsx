import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  FileSpreadsheet,
  Archive as ArchiveIcon,
  Mail as MailIcon,
  Inbox as InboxIcon,
  CalendarDays as CalendarDaysIcon,
  HelpCircle,
  Settings2,
  Shapes,
  Icon as LucideIcon
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType<React.ComponentProps<LucideIcon>>;
  exact?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid, exact: true },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/customers', label: 'Customers', icon: UserCircle2 },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: FileSpreadsheet },
  { href: '/items', label: 'Items', icon: ArchiveIcon },
  { href: '/mail', label: 'Mail', icon: MailIcon },
  { href: '/shoebox', label: 'Shoebox', icon: InboxIcon },
  { href: '/calendar', label: 'Calendar', icon: CalendarDaysIcon },
];

const utilityNavItems: NavItem[] = [
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed top-0 left-0 z-20 h-screen w-64 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="h-[70px] flex items-center justify-center px-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
          <Shapes className="h-8 w-8 text-sidebar-primary" />
          <span className="font-semibold text-xl">BO</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = item.exact ? currentPath === item.href : currentPath.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3 border-t border-sidebar-border space-y-1.5">
        {utilityNavItems.map((item) => {
          const isActive = item.exact ? currentPath === item.href : currentPath.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default SidebarNav;
