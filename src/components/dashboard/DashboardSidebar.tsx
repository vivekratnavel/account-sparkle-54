import { Users, Building, BarChart3, Settings, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: typeof Home;
  label: string;
  id: string;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Overview", id: "overview", active: true },
  { icon: Building, label: "Accounts", id: "accounts" },
  { icon: Users, label: "Users", id: "users" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <div className="w-64 bg-dashboard-sidebar text-dashboard-sidebar-foreground h-screen flex flex-col">
      <div className="p-6 border-b border-dashboard-sidebar/20">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-dashboard-sidebar-foreground/70 mt-1">
          Manage accounts and users
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                    isActive
                      ? "bg-dashboard-sidebar-accent text-white"
                      : "text-dashboard-sidebar-foreground/80 hover:bg-dashboard-sidebar-foreground/10 hover:text-dashboard-sidebar-foreground"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-dashboard-sidebar/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-dashboard-sidebar-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-dashboard-sidebar-foreground/70">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}