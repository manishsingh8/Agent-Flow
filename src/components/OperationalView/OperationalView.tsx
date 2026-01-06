import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

type ByDay = { day: string; count: number; amount: string; percentage: string };

const COLORS = {
  high: "#166F4C",
  medium: "#249563",
  low: "#6CCBA2",
  alt1: "#1f7a4a",
  alt2: "#2fa06a",
};

const piePalette = [
  COLORS.high,
  COLORS.medium,
  COLORS.low,
  COLORS.alt1,
  COLORS.alt2,
];
const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

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
              <TableCell className="text-right">
                {formatNumber(d.count)}
              </TableCell>
              <TableCell className="text-right">
                {d.amount}
              </TableCell>
              <TableCell className="text-right">{d.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function OperationalView({ data: operationalData }: { data?: any }) {
  // log the operational performance view data passed from the dashboard hook
  console.log("OperationalView received data:", operationalData);

  // const data = operationalData ?? rcmDashboardData;
  const {data}  = rcmDashboardData;

  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between">
        <div>
          <p className="text-lg font-semibold">Operational Performance View</p>
          <p className="text-sm text-muted-foreground">
            Presents holistic operational metrics and efficiency.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 py-1 px-2 h-12 ">
            <TabsTrigger value="overview" className="h-10">
              Executive Summery
            </TabsTrigger>
            <TabsTrigger value="bank-statements">
              Bank Statements Operations
            </TabsTrigger>
            <TabsTrigger value="remits">Remittance Operations</TabsTrigger>
            <TabsTrigger value="transactions">Transactions Processing</TabsTrigger>
            <TabsTrigger value="reports">Performance Analytics</TabsTrigger>
          </TabsList>

          {/* ================= OVERVIEW ================= */}
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <KpiCard
                  title="Bank Statements Processed Month-To-Date"
                  value={`${data.executiveSummary.bankStatementsProcessed}`}
                  description={`${
                    data.executiveSummary.bankStatementsSubtext
                  }`}
                  iconName="FileText"
                  trend="up"
                />
                <KpiCard
                  title="Remittance Completed Month-To-Date"
                  value={`${data.executiveSummary?.remittanceFilesCompleted ?? "N/A"}`}
                  description={`${
                    data.executiveSummary?.remittanceSubtext ?? "N/A"
                  } total`}
                  iconName="Activity"
                  trend="up"
                />
                <KpiCard
                  title=" Posted Transactions Month-To-Date"
                  value={`${
                    data.executiveSummary?.postedTransactionsCount ?? "N/A"
                  }`}
                  description={`${ data.executiveSummary.postedTransactionsSubtext ?? "N/A"}`}
                  iconName="DollarSign"
                  trend="up"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <KpiCard
                  title="Automated Posting Index"
                  value={`${data.executiveSummary.automatedPostingIndex?? "N/A"}`}
                  description={`${data.executiveSummary.automatedPostingSubtext ?? ""}`}
                  iconName="Zap"
                  trend={
                    parseInt(data.executiveSummary.automatedPostingIndex, 10) >= 80 ? "up" : "down"
                  }
                  // after key added caluculate the up and down trend
                />
                <KpiCard
                  title="Posting Report Count (MTD)"
                  value={`${
                    data.executiveSummary.postingReportCount
                  }`}
                  description={`${
                    data.executiveSummary.postingReportSubtext 
                  }`}
                  iconName="FileText"
                  trend={(Number(data.performance?.exceptionRate?.exceptionRatePercent)) < 5 ? "up" : "down"}
                />
                <KpiCard
                  title="Average Processing Duration"
                  value={`${data.executiveSummary?.avgProcessingDuration}`}
                  description={`${data.executiveSummary?.avgDurationSubtext}`}
                  iconName="Clock"
                  trend="down"
                />
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Consolidated Throughput Trends</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Combined view of statements, remits and postings over time
                  </p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.executiveSummary.executiveSummaryChart}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <defs>
                        <linearGradient
                          id="gradBank"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.high}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.high}
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradRemit"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.medium}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.medium}
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradPosting"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.low}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.low}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="activityDate"
                        tickFormatter={(v) => formatShortDate(v)}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="statementCount"
                        name="Statements"
                        stroke={COLORS.high}
                        fill="url(#gradBank)"
                        fillOpacity={1}
                      />
                      <Area
                        type="monotone"
                        dataKey="remitCount"
                        name="Remits"
                        stroke={COLORS.medium}
                        fill="url(#gradRemit)"
                        fillOpacity={1}
                      />
                      <Area
                        type="monotone"
                        dataKey="postingCount"
                        name="Posting"
                        stroke={COLORS.low}
                        fill="url(#gradPosting)"
                        fillOpacity={1}
                      />
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
                <KpiCard
                  title="Statements (MTD)"
                  value={`${data.bankStatements.statementsProcessed}`}
                  description={data.bankStatements.statementsProcessedSubText}
                  iconName="FileText"
                />
                <KpiCard
                  title="Transactions (MTD)"
                  value={`${formatNumber(
                    data.bankStatements.transactionsProcessed
                  )}`}
                  description={
                    data.bankStatements.transactionsProcessedSubText
                  }
                  iconName="TrendingUp"
                />
                <KpiCard
                  title="YTD / MTD"
                  value={`${data.bankStatements.ytdAndMtdValues}`}
                  description={`${data.bankStatements.ytdAndMtdValuesSubText}`}
                  iconName="Activity"
                />
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">
                    Bank Statement Processing Trend (Last 30 days)
                  </p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.bankStatements.trend}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v) => formatShortDate(v)}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Statements"
                        stroke={COLORS.high}
                        fill={COLORS.high}
                        fillOpacity={0.12}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">
                    Distribution by Day (MTD)
                  </p>
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
                    <p className="text-sm font-medium">
                      Remits by Type (Today)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Distribution across remittance types
                    </p>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.remits.byType}
                          dataKey="count"
                          nameKey="type"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label={(entry: {type:string; count:number; percentage:string}) =>
                            `${entry.type}: ${entry.percentage}`
                          }
                        >
                          {data.remits.byType.map((_e, i) => (
                            <Cell
                              key={i}
                              fill={piePalette[i % piePalette.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <p className="text-sm font-medium">Remit Details</p>
                    <p className="text-xs text-muted-foreground">
                      Volume and value by remittance type
                    </p>
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
                        {data.remits.details.map((t) => (
                          <TableRow key={t.type}>
                            <TableCell className="font-medium">
                              {t.type}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatNumber(t.count)}
                            </TableCell>
                            <TableCell className="text-right">
                              {t.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">
                    Remit Processing Trend (Last 30 days)
                  </p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.remits.trend}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v) => formatShortDate(v)}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Remits"
                        stroke={COLORS.medium}
                        fill={COLORS.medium}
                        fillOpacity={0.12}
                      />
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
                  <p className="text-sm font-medium">
                    Transactions by Type (Today)
                  </p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.transactionPosting.byType}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill={COLORS.medium} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">
                    Transactions by EMR (Today)
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>EMR System</TableHead>
                        <TableHead className="text-right">
                          Transactions
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">% of total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.transactionPosting.byEmr.map((emr) => (
                        <TableRow key={emr.emrName}>
                          <TableCell className="font-medium">
                            {emr.emrName}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatNumber(emr.count ?? 0)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(emr.amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            {emr.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">
                    Transaction Posting Trend
                  </p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.transactionPosting.trend}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v) => formatShortDate(v)}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Transactions"
                        stroke={COLORS.low}
                        fill={COLORS.low}
                        fillOpacity={0.12}
                      />
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
                    <p className="text-sm font-medium">
                      Processing Performance
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Operational efficiency metrics
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Avg Processing Time
                      </div>
                      <div className="text-3xl font-bold">
                        {data.performance.avgProcessingTimeMinutes}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Peak Processing Day
                      </div>
                      <div className="text-2xl font-semibold">
                        {data.performance.peakProcessingDay}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Peak Processing Hour
                      </div>
                      <div className="text-2xl font-semibold">
                        {data.performance.peakProcessingHour}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Processing Time (MTD)
                      </div>
                      <div className="text-2xl font-semibold">
                        {data.performance.totalProcessingTimeHours}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <p className="text-sm font-medium">Month-over-Month</p>
                    <p className="text-xs text-muted-foreground">
                      Transactions posted comparison
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Current Month
                      </div>
                      <div className="text-3xl font-bold">
                        {
                          data.performance.mtdComparison.currentMonth
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Last Month
                      </div>
                      <div className="text-2xl font-semibold">
                        {data.performance.mtdComparison.lastMonth}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Change
                      </div>
                      <div
                        className={`text-2xl font-semibold ${
                          parseInt(data.performance.mtdComparison.percentageChange, 10) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {parseInt(data.performance.mtdComparison.percentageChange, 10) > 0
                          ? "+"
                          : ""}
                        {data.performance.mtdComparison.percentageChange}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">
                    Posting Reports Trend (Last 30 days)
                  </p>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.performance.trend}
                      margin={{ top: 8, right: 12, left: -12, bottom: 8 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v) => formatShortDate(v)}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Reports"
                        stroke={COLORS.alt1}
                        fill={COLORS.alt1}
                        fillOpacity={0.12}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Exception Rate</p>
                  <p className="text-xs text-muted-foreground">
                    Transactions requiring manual intervention
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Exception Rate (Today)
                      </div>
                      <div className="text-3xl font-bold">
                        {data.performance.exceptionRate.exceptionRatePercent}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {data.performance.exceptionRate.exceptionRateSubText}{" "}
                        transactions
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          MTD Exceptions
                        </div>
                        <div className="text-2xl font-semibold">
                          {data.performance.exceptionRate.mtdExceptions}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          YTD Exceptions
                        </div>
                        <div className="text-2xl font-semibold">
                          {data.performance.exceptionRate.ytdExceptions}
                        </div>
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

  const dataArr = dateArr.map((date) => {
    const bs = bsTrend.find((t) => t.date === date)?.count ?? 0;
    const rm = remitsTrend.find((t) => t.date === date)?.count ?? 0;
    const tp = postingTrend.find((t) => t.date === date)?.count ?? 0;
    return { date, BankStatements: bs, Remits: rm, Posting: tp };
  });
}
