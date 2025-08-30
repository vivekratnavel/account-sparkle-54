import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const handleAccountSelect = (accountId: string) => {
    console.log("Selected account:", accountId);
    // Future: Navigate to account detail view
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview onAccountSelect={handleAccountSelect} />;
      case "accounts":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Account Management</h2>
            <p className="text-muted-foreground">Detailed account management interface coming soon.</p>
          </div>
        );
      case "users":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
            <p className="text-muted-foreground">User management interface coming soon.</p>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
            <p className="text-muted-foreground">Advanced analytics dashboard coming soon.</p>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <p className="text-muted-foreground">System settings coming soon.</p>
          </div>
        );
      default:
        return <DashboardOverview onAccountSelect={handleAccountSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-content flex">
      <DashboardSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {activeSection === "overview" ? "Dashboard Overview" : 
               activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's what's happening with your accounts and users.
            </p>
          </header>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
