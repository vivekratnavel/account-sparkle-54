import { useState } from "react";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, Users, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Account {
  id: string;
  name: string;
  email: string;
  userCount: number;
  status: "active" | "inactive" | "suspended" | "trial";
  plan: "Basic" | "Professional" | "Enterprise";
  createdAt: string;
  lastLogin: string;
  revenue: number;
  billingStatus: "current" | "overdue" | "pending";
}

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "admin@acme.com",
    userCount: 45,
    status: "active",
    plan: "Enterprise",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-19",
    revenue: 2500,
    billingStatus: "current"
  },
  {
    id: "2",
    name: "TechStart Inc",
    email: "billing@techstart.io",
    userCount: 12,
    status: "active",
    plan: "Professional",
    createdAt: "2024-02-20",
    lastLogin: "2024-03-18",
    revenue: 899,
    billingStatus: "current"
  },
  {
    id: "3",
    name: "Global Solutions",
    email: "accounts@global.net",
    userCount: 78,
    status: "inactive",
    plan: "Enterprise",
    createdAt: "2023-11-10",
    lastLogin: "2024-02-15",
    revenue: 3200,
    billingStatus: "overdue"
  },
  {
    id: "4",
    name: "Digital Dynamics",
    email: "info@digitaldyn.com",
    userCount: 23,
    status: "trial",
    plan: "Professional",
    createdAt: "2024-03-05",
    lastLogin: "2024-03-19",
    revenue: 0,
    billingStatus: "pending"
  },
  {
    id: "5",
    name: "Future Systems",
    email: "support@futuresys.org",
    userCount: 5,
    status: "suspended",
    plan: "Basic",
    createdAt: "2024-01-28",
    lastLogin: "2024-03-10",
    revenue: 299,
    billingStatus: "overdue"
  },
];

export function AccountManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    const matchesPlan = planFilter === "all" || account.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status: Account["status"]) => {
    const variants = {
      active: "bg-success/10 text-success border-success/20",
      inactive: "bg-muted text-muted-foreground border-border",
      suspended: "bg-destructive/10 text-destructive border-destructive/20",
      trial: "bg-warning/10 text-warning border-warning/20"
    };
    
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`;
  };

  const getBillingBadge = (status: Account["billingStatus"]) => {
    const variants = {
      current: "bg-success/10 text-success border-success/20",
      overdue: "bg-destructive/10 text-destructive border-destructive/20",
      pending: "bg-warning/10 text-warning border-warning/20"
    };
    
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`;
  };

  const totalRevenue = mockAccounts.reduce((sum, account) => sum + account.revenue, 0);
  const activeAccounts = mockAccounts.filter(account => account.status === "active").length;
  const trialAccounts = mockAccounts.filter(account => account.status === "trial").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Accounts
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockAccounts.length}</div>
            <p className="text-xs text-success mt-1">+3 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Accounts
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeAccounts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((activeAccounts / mockAccounts.length) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trial Accounts
            </CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{trialAccounts}</div>
            <p className="text-xs text-warning mt-1">Convert to paid plans</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-success mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="bg-card border-border/50 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Account Management
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage all customer accounts and billing
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border focus:ring-ring"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Accounts Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-muted-foreground font-medium">Account</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Users</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Plan</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Revenue</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Billing</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Last Login</TableHead>
                  <TableHead className="text-muted-foreground font-medium w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{account.name}</div>
                        <div className="text-sm text-muted-foreground">{account.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-muted-foreground" />
                        <span>{account.userCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(account.status)}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground font-medium">{account.plan}</TableCell>
                    <TableCell className="text-foreground font-medium">
                      ${account.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getBillingBadge(account.billingStatus)}>
                        {account.billingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(account.lastLogin).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <Filter size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye size={16} className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit size={16} className="mr-2" />
                            Edit Account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={16} className="mr-2" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No accounts found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}