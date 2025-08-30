import { useState } from "react";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, User, Mail, Shield, Clock } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "manager" | "viewer";
  status: "active" | "inactive" | "pending" | "suspended";
  accountName: string;
  accountId: string;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  sessionsCount: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acme.com",
    role: "admin",
    status: "active",
    accountName: "Acme Corporation",
    accountId: "1",
    lastLogin: "2024-03-19T10:30:00Z",
    createdAt: "2024-01-15",
    permissions: ["read", "write", "delete", "admin"],
    sessionsCount: 45
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    role: "manager",
    status: "active",
    accountName: "Acme Corporation",
    accountId: "1",
    lastLogin: "2024-03-19T08:15:00Z",
    createdAt: "2024-02-01",
    permissions: ["read", "write"],
    sessionsCount: 32
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@techstart.io",
    role: "admin",
    status: "active",
    accountName: "TechStart Inc",
    accountId: "2",
    lastLogin: "2024-03-18T16:45:00Z",
    createdAt: "2024-02-20",
    permissions: ["read", "write", "delete", "admin"],
    sessionsCount: 28
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@global.net",
    role: "user",
    status: "inactive",
    accountName: "Global Solutions",
    accountId: "3",
    lastLogin: "2024-02-15T12:00:00Z",
    createdAt: "2023-11-15",
    permissions: ["read"],
    sessionsCount: 67
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    email: "alex@digitaldyn.com",
    role: "user",
    status: "pending",
    accountName: "Digital Dynamics",
    accountId: "4",
    lastLogin: "2024-03-05T09:20:00Z",
    createdAt: "2024-03-05",
    permissions: ["read"],
    sessionsCount: 5
  },
  {
    id: "6",
    name: "Lisa Wilson",
    email: "lisa@futuresys.org",
    role: "viewer",
    status: "suspended",
    accountName: "Future Systems",
    accountId: "5",
    lastLogin: "2024-03-10T14:30:00Z",
    createdAt: "2024-02-01",
    permissions: ["read"],
    sessionsCount: 12
  },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesAccount = accountFilter === "all" || user.accountId === accountFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesAccount;
  });

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      active: "bg-success/10 text-success border-success/20",
      inactive: "bg-muted text-muted-foreground border-border",
      pending: "bg-warning/10 text-warning border-warning/20",
      suspended: "bg-destructive/10 text-destructive border-destructive/20"
    };
    
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`;
  };

  const getRoleBadge = (role: User["role"]) => {
    const variants = {
      admin: "bg-chart-primary/10 text-chart-primary border-chart-primary/20",
      manager: "bg-chart-secondary/10 text-chart-secondary border-chart-secondary/20",
      user: "bg-muted text-muted-foreground border-border",
      viewer: "bg-chart-tertiary/10 text-chart-tertiary border-chart-tertiary/20"
    };
    
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[role]}`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === "active").length;
  const pendingUsers = mockUsers.filter(user => user.status === "pending").length;
  const totalSessions = mockUsers.reduce((sum, user) => sum + user.sessionsCount, 0);

  const uniqueAccounts = [...new Set(mockUsers.map(user => ({ id: user.accountId, name: user.accountName })))];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <User className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
            <p className="text-xs text-success mt-1">+8 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((activeUsers / totalUsers) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Users
            </CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingUsers}</div>
            <p className="text-xs text-warning mt-1">Require approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sessions
            </CardTitle>
            <Mail className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSessions}</div>
            <p className="text-xs text-success mt-1">Across all accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Management */}
      <Card className="bg-card border-border/50 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                User Management
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage users across all accounts and their permissions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add User
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:ring-ring"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={accountFilter} onValueChange={setAccountFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {uniqueAccounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-muted-foreground font-medium">User</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Account</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Role</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Sessions</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Last Login</TableHead>
                  <TableHead className="text-muted-foreground font-medium w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {user.accountName}
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground font-medium">
                      {user.sessionsCount}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatLastLogin(user.lastLogin)}
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit size={16} className="mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield size={16} className="mr-2" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={16} className="mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}