import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "Jan 1", activeUsers: 120 },
  { date: "Jan 8", activeUsers: 135 },
  { date: "Jan 15", activeUsers: 142 },
  { date: "Jan 22", activeUsers: 158 },
  { date: "Jan 29", activeUsers: 165 },
  { date: "Feb 5", activeUsers: 178 },
  { date: "Feb 12", activeUsers: 185 },
  { date: "Feb 19", activeUsers: 192 },
  { date: "Feb 26", activeUsers: 198 },
  { date: "Mar 5", activeUsers: 205 },
  { date: "Mar 12", activeUsers: 220 },
  { date: "Mar 19", activeUsers: 235 },
];

export function UserActivityChart() {
  return (
    <Card className="bg-card border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Active Users Over Time
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Weekly active user count across all accounts
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-card)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="hsl(var(--chart-primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-primary))", strokeWidth: 2, fill: "hsl(var(--background))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}