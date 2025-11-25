import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import KpiCard from "@/components/KpiCard/KpiCard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { rcmDashboardData } from "@/constants/RCMDashboardData";

type ByDay = { day: string; count: number; amount: number; percentage: number };

const COLORS = {
  high: "#166F4C",
  medium: "#249563",
  low: "#6CCBA2",
  alt1: "#1f7a4a",
  alt2: "#2fa06a",
};

const piePalette = [COLORS.high, COLORS.medium, COLORS.low, COLORS.alt1, COLORS.alt2];
const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

const formatNumber = (v: number) => new Intl.NumberFormat("en-US").format(v);

function ByDayTable({ items }: { items: ByDay[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead className="text-right">Count</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">% of total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((d) => (
            <TableRow key={d.day}>
              <TableCell className="font-medium">{d.day}</TableCell>
              <TableCell className="text-right">{formatNumber(d.count)}</TableCell>
              <TableCell className="text-right">{formatCurrency(d.amount)}</TableCell>
              <TableCell className="text-right">{d.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function OperationalView() {
  const data = rcmDashboardData;

  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between">
        <div>
          <p className="text-lg font-semibold">Operational View</p>
          <p className="text-sm text-muted-foreground">
            Comprehensive operational metrics — last updated:{" "}
            {new Date(data.lastUpdated).toLocaleString()}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bank-statements">Bank Statements</TabsTrigger>
            <TabsTrigger value="remits">Remits</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports & Performance</TabsTrigger>
          </TabsList>

          {/* ================= OVERVIEW ================= */}
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <KpiCard
                  title="Bank Statements (MTD)"
                  value={`${data.bankStatements.mtd.statementsProcessed}`}
                  description={`${formatNumber(data.bankStatements.mtd.transactionsProcessed)} transactions`}
                  iconName="FileText"
                  trend="up"
                />
                <KpiCard
                  title="Remits Processed (MTD)"
                  value={`${data.remits.mtd.totalRemitsProcessed}`}
                  description={`${formatCurrency(data.remits.mtd.totalAmount)} total`}
                  iconName="Activity"
                  trend="up"
                />
                <KpiCard
                  title="Transactions Posted (MTD)"
                  value={`${formatNumber(data.transactionPosting.mtd.totalTransactionsPosted)}`}
                  description={`${formatCurrency(data.transactionPosting.mtd.totalAmount)} total`}
                  iconName="DollarSign"
                  trend="up"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <KpiCard
                  title="Auto-Post Rate"
                  value={`${data.transactionPosting.autoPostRate.toFixed(1)}%`}
                  description={`${formatNumber(data.transactionPosting.autoPostedCount)} auto / ${formatNumber(data.transactionPosting.manualPostedCount)} manual`}
                  iconName="Zap"
                  trend={data.transactionPosting.autoPostRate >= 80 ? "up" : "down"}
                />
                <KpiCard
                  title="Posting Reports (MTD)"
                  value={`${formatNumber(data.postingReports.mtd.totalReportsGenerated)}`}
                  description={`${formatNumber(data.postingReports.mtd.totalTransactionsInReports)} transactions`}
                  iconName="FileText"
                  trend={data.postingReports.exceptionRate < 5 ? "up" : "down"}
                />
                <KpiCard
                  title="Avg Processing Time"
                  value={`${data.performance.avgProcessingTimeMinutes.toFixed(1)} min`}
                  description={`${data.performance.totalProcessingTimeHours}h total (MTD)`}
                  iconName="Clock"
                  trend="down"
                />
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Combined Volume Trends</p>
                  <p className="text-xs text-muted-foreground mt-1">Combined view of statements, remits and postings over time</p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mergeTrendsForOverview(
                        data.bankStatements.trend,
                        data.remits.trend,
                        data.transactionPosting.trend
                      )}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <defs>
                        <linearGradient id="gradBank" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.high} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.high} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradRemit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.medium} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.medium} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradPosting" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.low} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.low} stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(v) => formatShortDate(v)} />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      <Legend />
                      <Area type="monotone" dataKey="BankStatements" name="Statements" stroke={COLORS.high} fill="url(#gradBank)" fillOpacity={1} />
                      <Area type="monotone" dataKey="Remits" name="Remits" stroke={COLORS.medium} fill="url(#gradRemit)" fillOpacity={1} />
                      <Area type="monotone" dataKey="Posting" name="Posting" stroke={COLORS.low} fill="url(#gradPosting)" fillOpacity={1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= BANK STATEMENTS ================= */}
          <TabsContent value="bank-statements" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <KpiCard title="Statements (MTD)" value={`${data.bankStatements.mtd.statementsProcessed}`} description={`${data.bankStatements.avgTransactionsPerStatement} avg txns/statement`} iconName="FileText" />
                <KpiCard title="Transactions (MTD)" value={`${formatNumber(data.bankStatements.mtd.transactionsProcessed)}`} description={`${formatCurrency(data.bankStatements.mtd.totalAmount)}`} iconName="TrendingUp" />
                <KpiCard title="YTD / MTD" value={`${data.bankStatements.ytd.statementsProcessed} / ${data.bankStatements.mtd.statementsProcessed}`} description={`${formatNumber(data.bankStatements.ytd.transactionsProcessed)} / ${formatNumber(data.bankStatements.mtd.transactionsProcessed)}`} iconName="Activity" />
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Bank Statement Processing Trend (Last 30 days)</p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.bankStatements.trend} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(v) => formatShortDate(v)} />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      <Area type="monotone" dataKey="count" name="Statements" stroke={COLORS.high} fill={COLORS.high} fillOpacity={0.12} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Distribution by Day (MTD)</p>
                </CardHeader>
                <CardContent>
                  <ByDayTable items={data.bankStatements.byDayOfWeek} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= REMITS ================= */}
          <TabsContent value="remits" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <p className="text-sm font-medium">Remits by Type (Today)</p>
                    <p className="text-xs text-muted-foreground">Distribution across remittance types</p>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data.remits.byType} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={90} label={(entry: any) => `${entry.type}: ${entry.percentage}%`} >
                          {data.remits.byType.map((e, i) => <Cell key={i} fill={piePalette[i % piePalette.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <p className="text-sm font-medium">Remit Details</p>
                    <p className="text-xs text-muted-foreground">Volume and value by remittance type</p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Count</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.remits.byType.map((t) => (
                          <TableRow key={t.type}>
                            <TableCell className="font-medium">{t.type}</TableCell>
                            <TableCell className="text-right">{formatNumber(t.count)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(t.totalAmount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Remit Processing Trend (Last 30 days)</p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.remits.trend} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(v) => formatShortDate(v)} />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      <Area type="monotone" dataKey="count" name="Remits" stroke={COLORS.medium} fill={COLORS.medium} fillOpacity={0.12} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= TRANSACTIONS / POSTING ================= */}
          <TabsContent value="transactions" className="mt-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Transactions by Type (Today)</p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.transactionPosting.byType} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill={COLORS.medium} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Transactions by EMR (Today)</p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>EMR System</TableHead>
                        <TableHead className="text-right">Transactions</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">% of total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.transactionPosting.byEmr.map((emr) => (
                        <TableRow key={emr.emrName}>
                          <TableCell className="font-medium">{emr.emrName}</TableCell>
                          <TableCell className="text-right">{formatNumber(emr.transactionsPosted)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(emr.totalAmount)}</TableCell>
                          <TableCell className="text-right">{emr.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Transaction Posting Trend</p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.transactionPosting.trend} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(v) => formatShortDate(v)} />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      <Area type="monotone" dataKey="count" name="Transactions" stroke={COLORS.low} fill={COLORS.low} fillOpacity={0.12} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= REPORTS & PERFORMANCE ================= */}
          <TabsContent value="reports" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <p className="text-sm font-medium">Processing Performance</p>
                    <p className="text-xs text-muted-foreground">Operational efficiency metrics</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Processing Time</div>
                      <div className="text-3xl font-bold">{data.performance.avgProcessingTimeMinutes} min</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Peak Processing Day</div>
                      <div className="text-2xl font-semibold">{data.performance.peakProcessingDay}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Peak Processing Hour</div>
                      <div className="text-2xl font-semibold">{data.performance.peakProcessingHour}:00</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Processing Time (MTD)</div>
                      <div className="text-2xl font-semibold">{data.performance.totalProcessingTimeHours} hours</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <p className="text-sm font-medium">Month-over-Month</p>
                    <p className="text-xs text-muted-foreground">Transactions posted comparison</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Month</div>
                      <div className="text-3xl font-bold">{formatNumber(data.performance.mtdComparison.currentMonth)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Last Month</div>
                      <div className="text-2xl font-semibold">{formatNumber(data.performance.mtdComparison.lastMonth)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Change</div>
                      <div className={`text-2xl font-semibold ${data.performance.mtdComparison.percentageChange > 0 ? "text-green-600" : "text-red-600"}`}>
                        {data.performance.mtdComparison.percentageChange > 0 ? "+" : ""}{data.performance.mtdComparison.percentageChange}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Posting Reports Trend (Last 30 days)</p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.postingReports.trend} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(v) => formatShortDate(v)} />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb" }} />
                      <Area type="monotone" dataKey="count" name="Reports" stroke={COLORS.alt1} fill={COLORS.alt1} fillOpacity={0.12} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Exception Rate</p>
                  <p className="text-xs text-muted-foreground">Transactions requiring manual intervention</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Exception Rate (Today)</div>
                      <div className="text-3xl font-bold">{data.postingReports.exceptionRate}%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatNumber(data.postingReports.totalExceptions)} exceptions out of {formatNumber(data.postingReports.totalTransactionsInReports)} transactions
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-sm text-muted-foreground">MTD Exceptions</div>
                        <div className="text-2xl font-semibold">{formatNumber(data.postingReports.mtd.totalExceptions)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">YTD Exceptions</div>
                        <div className="text-2xl font-semibold">{formatNumber(data.postingReports.ytd.totalExceptions)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

/* -------------------------
   Helper utilities below
   ------------------------- */

function formatShortDate(iso: string) {
  try {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  } catch {
    return iso;
  }
}

/**
 * Merge three trend arrays for the overview combined chart.
 * returns [{ date, BankStatements, Remits, Posting }]
 */
function mergeTrendsForOverview(
  bsTrend: { date: string; count: number }[],
  remitsTrend: { date: string; count: number }[],
  postingTrend: { date: string; count: number }[]
) {
  const dates = new Set<string>();
  bsTrend.forEach((t) => dates.add(t.date));
  remitsTrend.forEach((t) => dates.add(t.date));
  postingTrend.forEach((t) => dates.add(t.date));
  const dateArr = Array.from(dates).sort();

  return dateArr.map((date) => {
    const bs = bsTrend.find((t) => t.date === date)?.count ?? 0;
    const rm = remitsTrend.find((t) => t.date === date)?.count ?? 0;
    const tp = postingTrend.find((t) => t.date === date)?.count ?? 0;
    return { date, BankStatements: bs, Remits: rm, Posting: tp };
  });
}
