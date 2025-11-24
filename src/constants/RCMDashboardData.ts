export interface TransactionPostingMetrics {
  autoPostRate: number; // percent
  autoPostedCount: number;
  totalTransactionsPosted: number;
}

export interface PerformanceMetrics {
  avgProcessingTimeMinutes: number;
  mtdComparison: {
    percentageChange: number; // positive => slower, negative => faster
  };
}

export interface PostingReportsMetrics {
  exceptionRate: number; // percent (0-100)
  totalExceptions: number;
}

export interface OperationalMetrics {
  transactionPosting: TransactionPostingMetrics;
  performance: PerformanceMetrics;
  postingReports: PostingReportsMetrics;
}

export interface KpiCardItem {
  title: string;
  value: string;
  description?: string;
  iconName?: string;
  trend?: "up" | "down" | "neutral";
}

export const operationalMetrics: OperationalMetrics = {
  transactionPosting: {
    autoPostRate: 78.0, // "78.0%"
    autoPostedCount: 2480, // "2,480 of 3,179 auto-posted"
    totalTransactionsPosted: 3179,
  },
  performance: {
    avgProcessingTimeMinutes: 16.0, // "16.0 min"
    mtdComparison: {
      // screenshot shows "2.7% slower than last month" => positive 2.7
      percentageChange: 2.7,
    },
  },
  postingReports: {
    // Quality Rate 95.7% => exceptionRate = 100 - 95.7 = 4.3
    exceptionRate: 4.3,
    totalExceptions: 117,
  },
};


export function buildKpiCards(data: OperationalMetrics): KpiCardItem[] {
  const { transactionPosting, performance, postingReports } = data;

  return [
    {
      title: "Auto-Post Rate",
      value: `${transactionPosting.autoPostRate.toFixed(1)}%`,
      description: `${transactionPosting.autoPostedCount.toLocaleString()} of ${transactionPosting.totalTransactionsPosted.toLocaleString()} auto-posted`,
      iconName: "TrendingUp",
      trend: transactionPosting.autoPostRate >= 90 ? "up" : "down",
    },
    {
      title: "Avg. Processing Time",
      value: `${performance.avgProcessingTimeMinutes.toFixed(1)} min`,
      description: `${Math.abs(performance.mtdComparison.percentageChange).toFixed(1)}% ${performance.mtdComparison.percentageChange < 0 ? "faster" : "slower"} than last month`,
      iconName: "Clock",
      trend: performance.mtdComparison.percentageChange < 0 ? "down" : "up",
    },
    {
      title: "Quality Rate",
      value: `${(100 - postingReports.exceptionRate).toFixed(1)}%`,
      description: `${postingReports.totalExceptions} exceptions in reports`,
      iconName: "ShieldCheck",
      trend: postingReports.exceptionRate < 5 ? "up" : "down",
    },
  ];
}


export interface UserProductivity {
  userId: string;
  userName: string;
  tasksCompleted: number;
  avgTimeToResolution: number; // hours
  team: string;
  role: string;
}


export const userProductivityData: UserProductivity[] = [
  {
    userId: "user-5",
    userName: "Pamela Cruz",
    tasksCompleted: 214,
    avgTimeToResolution: 14.4,
    team: "Denials",
    role: "Specialist",
  },
  {
    userId: "user-1",
    userName: "Logan Roberts",
    tasksCompleted: 208,
    avgTimeToResolution: 15.9,
    team: "Denials",
    role: "Senior Specialist",
  },
  {
    userId: "user-3",
    userName: "Joshua Gonzalez",
    tasksCompleted: 165,
    avgTimeToResolution: 15.6,
    team: "Denials",
    role: "Specialist",
  },
  {
    userId: "user-4",
    userName: "Christian Ramos",
    tasksCompleted: 142,
    avgTimeToResolution: 15.5,
    team: "Denials",
    role: "Specialist",
  },
  {
    userId: "user-2",
    userName: "Shirley Rogers",
    tasksCompleted: 135,
    avgTimeToResolution: 12.7,
    team: "Denials",
    role: "Senior Specialist",
  },
  {
    userId: "user-6",
    userName: "Pamela Turner",
    tasksCompleted: 206,
    avgTimeToResolution: 22.1,
    team: "Prior Auth",
    role: "Senior Specialist",
  },
  {
    userId: "user-8",
    userName: "Laura Harris",
    tasksCompleted: 185,
    avgTimeToResolution: 27.1,
    team: "Prior Auth",
    role: "Specialist",
  },
  {
    userId: "user-10",
    userName: "Tyler Nelson",
    tasksCompleted: 182,
    avgTimeToResolution: 28.2,
    team: "Prior Auth",
    role: "Specialist",
  },
  {
    userId: "user-9",
    userName: "Eugene Morris",
    tasksCompleted: 168,
    avgTimeToResolution: 25.9,
    team: "Prior Auth",
    role: "Specialist",
  },
  {
    userId: "user-7",
    userName: "William Richardson",
    tasksCompleted: 134,
    avgTimeToResolution: 22.2,
    team: "Prior Auth",
    role: "Senior Specialist",
  },
  {
    userId: "user-11",
    userName: "Rebecca Kim",
    tasksCompleted: 315,
    avgTimeToResolution: 10.3,
    team: "A/R Follow-up",
    role: "Senior Specialist",
  },
  {
    userId: "user-15",
    userName: "Janet Ward",
    tasksCompleted: 309,
    avgTimeToResolution: 9,
    team: "A/R Follow-up",
    role: "Specialist",
  },
  {
    userId: "user-13",
    userName: "Melissa Smith",
    tasksCompleted: 264,
    avgTimeToResolution: 10.3,
    team: "A/R Follow-up",
    role: "Specialist",
  },
  {
    userId: "user-14",
    userName: "Sara Stewart",
    tasksCompleted: 262,
    avgTimeToResolution: 9.5,
    team: "A/R Follow-up",
    role: "Specialist",
  },
  {
    userId: "user-12",
    userName: "Alan Bailey",
    tasksCompleted: 239,
    avgTimeToResolution: 8.3,
    team: "A/R Follow-up",
    role: "Senior Specialist",
  },
];

export type WorkQueueDataPoint = {
  date: string; 
  "New Items": number;
  "Completed Items": number;
  "Rollover Items": number;
};

export const workQueueData: WorkQueueDataPoint[] = [
  { date: "2025-10-26", "New Items": 275, "Completed Items": 239, "Rollover Items": 55 },
  { date: "2025-10-27", "New Items": 187, "Completed Items": 283, "Rollover Items": 42 },
  { date: "2025-10-28", "New Items": 264, "Completed Items": 260, "Rollover Items": 45 },
  { date: "2025-10-29", "New Items": 243, "Completed Items": 221, "Rollover Items": 47 },
  { date: "2025-10-30", "New Items": 222, "Completed Items": 202, "Rollover Items": 42 },
  { date: "2025-10-31", "New Items": 86,  "Completed Items": 79,  "Rollover Items": 19 },
  { date: "2025-11-01", "New Items": 105, "Completed Items": 96,  "Rollover Items": 18 },
  { date: "2025-11-02", "New Items": 208, "Completed Items": 175, "Rollover Items": 60 },
  { date: "2025-11-03", "New Items": 237, "Completed Items": 263, "Rollover Items": 41 },
  { date: "2025-11-04", "New Items": 237, "Completed Items": 294, "Rollover Items": 59 },
  { date: "2025-11-05", "New Items": 244, "Completed Items": 227, "Rollover Items": 51 },
  { date: "2025-11-06", "New Items": 286, "Completed Items": 265, "Rollover Items": 56 },
  { date: "2025-11-07", "New Items": 111, "Completed Items": 107, "Rollover Items": 18 },
  { date: "2025-11-08", "New Items": 77,  "Completed Items": 115, "Rollover Items": 20 },
  { date: "2025-11-09", "New Items": 232, "Completed Items": 220, "Rollover Items": 49 },
  { date: "2025-11-10", "New Items": 208, "Completed Items": 188, "Rollover Items": 51 },
  { date: "2025-11-11", "New Items": 263, "Completed Items": 230, "Rollover Items": 54 },
  { date: "2025-11-12", "New Items": 283, "Completed Items": 188, "Rollover Items": 46 },
  { date: "2025-11-13", "New Items": 218, "Completed Items": 311, "Rollover Items": 62 },
  { date: "2025-11-14", "New Items": 104, "Completed Items": 106, "Rollover Items": 21 },
  { date: "2025-11-15", "New Items": 89,  "Completed Items": 99,  "Rollover Items": 17 },
  { date: "2025-11-16", "New Items": 217, "Completed Items": 272, "Rollover Items": 45 },
  { date: "2025-11-17", "New Items": 261, "Completed Items": 251, "Rollover Items": 56 },
  { date: "2025-11-18", "New Items": 277, "Completed Items": 277, "Rollover Items": 63 },
  { date: "2025-11-19", "New Items": 283, "Completed Items": 275, "Rollover Items": 44 },
  { date: "2025-11-20", "New Items": 252, "Completed Items": 319, "Rollover Items": 60 },
  { date: "2025-11-21", "New Items": 117, "Completed Items": 94,  "Rollover Items": 21 },
  { date: "2025-11-22", "New Items": 92,  "Completed Items": 80,  "Rollover Items": 26 },
  { date: "2025-11-23", "New Items": 220, "Completed Items": 319, "Rollover Items": 53 },
  { date: "2025-11-24", "New Items": 293, "Completed Items": 314, "Rollover Items": 45 },
];

