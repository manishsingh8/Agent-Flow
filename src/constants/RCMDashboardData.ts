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

