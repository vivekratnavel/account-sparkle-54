import { Building, Users, Activity, TrendingUp } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { UserActivityChart } from "./UserActivityChart";
import { AccountsTable } from "./AccountsTable";

interface DashboardOverviewProps {
  onAccountSelect: (accountId: string) => void;
}

export function DashboardOverview({ onAccountSelect }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Accounts"
          value="247"
          change="+12 this month"
          changeType="positive"
          icon={Building}
          description="Active customer accounts"
        />
        <MetricCard
          title="Total Users"
          value="3,492"
          change="+148 this week"
          changeType="positive"
          icon={Users}
          description="Across all accounts"
        />
        <MetricCard
          title="Active Sessions"
          value="1,234"
          change="+5.2% from yesterday"
          changeType="positive"
          icon={Activity}
          description="Currently online"
        />
        <MetricCard
          title="Growth Rate"
          value="15.8%"
          change="+2.1% from last month"
          changeType="positive"
          icon={TrendingUp}
          description="Monthly user growth"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserActivityChart />
        <div className="space-y-6">
          <AccountsTable onAccountSelect={onAccountSelect} />
        </div>
      </div>
    </div>
  );
}