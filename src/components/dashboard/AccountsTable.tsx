import { Eye, MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Account {
  id: string;
  name: string;
  userCount: number;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  plan: string;
}

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Acme Corporation",
    userCount: 45,
    status: "active",
    createdAt: "2024-01-15",
    plan: "Enterprise"
  },
  {
    id: "2",
    name: "TechStart Inc",
    userCount: 12,
    status: "active",
    createdAt: "2024-02-20",
    plan: "Professional"
  },
  {
    id: "3",
    name: "Global Solutions",
    userCount: 78,
    status: "inactive",
    createdAt: "2023-11-10",
    plan: "Enterprise"
  },
  {
    id: "4",
    name: "Digital Dynamics",
    userCount: 23,
    status: "active",
    createdAt: "2024-03-05",
    plan: "Professional"
  },
  {
    id: "5",
    name: "Future Systems",
    userCount: 5,
    status: "suspended",
    createdAt: "2024-01-28",
    plan: "Basic"
  },
];

interface AccountsTableProps {
  onAccountSelect: (accountId: string) => void;
}

export function AccountsTable({ onAccountSelect }: AccountsTableProps) {
  const getStatusBadge = (status: Account["status"]) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "active":
        return `${baseClasses} bg-success/10 text-success`;
      case "inactive":
        return `${baseClasses} bg-muted text-muted-foreground`;
      case "suspended":
        return `${baseClasses} bg-destructive/10 text-destructive`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  return (
    <Card className="bg-card border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Account Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-muted-foreground">Account Name</TableHead>
              <TableHead className="text-muted-foreground">Users</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Plan</TableHead>
              <TableHead className="text-muted-foreground">Created</TableHead>
              <TableHead className="text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAccounts.map((account) => (
              <TableRow key={account.id} className="border-border/50 hover:bg-muted/50">
                <TableCell className="font-medium text-foreground">
                  {account.name}
                </TableCell>
                <TableCell className="text-foreground">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span>{account.userCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={getStatusBadge(account.status)}>
                    {account.status}
                  </span>
                </TableCell>
                <TableCell className="text-foreground">{account.plan}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(account.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onAccountSelect(account.id)}>
                        <Eye size={16} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}