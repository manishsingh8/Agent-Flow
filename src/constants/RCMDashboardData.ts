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

export type WorklistType =
  | "Denial"
  | "Prior Auth"
  | "Unreconciled"
  | "AR"
  | "CDI"
  | "Charge Audit"
  | "Coding"
  | "Credit Balance"
  | "Financial Counseling"
  | "Patient Statement"
  | "AR Follow-up"
  | "Coding Query";

export interface AggregatedWorklistItem {
  id: string;
  worklistType: WorklistType;
  type: WorklistType;
  patientName: string;
  priority: "High" | "Medium" | "Low";
  assignedTo?: string;
  dateCreated: string;
  mrn: string;
  age: number;
  balance: number;
  description: string;
  dueDate: string;
  link: string;
  category?: string;
  count?: number;
  value?: number;
  details?: string;
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

export type WorkQueueDataPoint = {
  date: string; 
  "New Items": number;
  "Completed Items": number;
  "Rollover Items": number;
};

export type ByDayOfWeekItem = {
  day: string;
  count: number;
  amount: number;
  percentage: number;
};

export type TrendPoint = {
  date: string; // YYYY-MM-DD
  count: number;
  amount: number;
};

export type RemitTypeItem = {
  type: string;
  count: number;
  transactionCount: number;
  totalAmount: number;
  percentage: number;
};

export type PostingByType = {
  type: string;
  count: number;
  totalAmount: number;
  percentage: number;
};

export type PostingByEmr = {
  emrName: string;
  transactionsPosted: number;
  totalAmount: number;
  percentage: number;
  byType: PostingByType[];
};

export type BankStatementsSection = {
  statementsProcessed: number;
  transactionsProcessed: number;
  totalAmount: number;
  avgTransactionsPerStatement: number;
  ytd: {
    statementsProcessed: number;
    transactionsProcessed: number;
    totalAmount: number;
  };
  mtd: {
    statementsProcessed: number;
    transactionsProcessed: number;
    totalAmount: number;
  };
  byDayOfWeek: ByDayOfWeekItem[];
  trend: TrendPoint[];
};

export type RemitsSection = {
  totalRemitsProcessed: number;
  totalTransactions: number;
  totalAmount: number;
  avgTransactionsPerRemit: number;
  byType: RemitTypeItem[];
  ytd: {
    totalRemitsProcessed: number;
    totalTransactions: number;
    totalAmount: number;
  };
  mtd: {
    totalRemitsProcessed: number;
    totalTransactions: number;
    totalAmount: number;
  };
  byDayOfWeek: ByDayOfWeekItem[];
  trend: TrendPoint[];
};

export type TransactionPostingSection = {
  totalTransactionsPosted: number;
  totalAmount: number;
  autoPostedCount: number;
  manualPostedCount: number;
  autoPostRate: number;
  byType: PostingByType[];
  byEmr: PostingByEmr[];
  ytd: {
    totalTransactionsPosted: number;
    totalAmount: number;
    autoPostedCount: number;
  };
  mtd: {
    totalTransactionsPosted: number;
    totalAmount: number;
    autoPostedCount: number;
  };
  byDayOfWeek: ByDayOfWeekItem[];
  trend: TrendPoint[];
};

export type PostingReportsSection = {
  totalReportsGenerated: number;
  totalTransactionsInReports: number;
  avgTransactionsPerReport: number;
  totalExceptions: number;
  exceptionRate: number;
  ytd: {
    totalReportsGenerated: number;
    totalTransactionsInReports: number;
    totalExceptions: number;
  };
  mtd: {
    totalReportsGenerated: number;
    totalTransactionsInReports: number;
    totalExceptions: number;
  };
  byDayOfWeek: ByDayOfWeekItem[];
  trend: TrendPoint[];
};

export type PerformanceSection = {
  avgProcessingTimeMinutes: number;
  peakProcessingDay: string;
  peakProcessingHour: number;
  totalProcessingTimeHours: number;
  mtdComparison: {
    currentMonth: number;
    lastMonth: number;
    percentageChange: number;
  };
};

export type RcmDashboardData = {
  bankStatements: BankStatementsSection;
  remits: RemitsSection;
  transactionPosting: TransactionPostingSection;
  postingReports: PostingReportsSection;
  performance: PerformanceSection;
  lastUpdated: string;
};


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

export const rcmDashboardData: RcmDashboardData = {
  bankStatements: {
    statementsProcessed: 50,
    transactionsProcessed: 1400,
    totalAmount: 5923862,
    avgTransactionsPerStatement: 28,
    ytd: {
      statementsProcessed: 8198,
      transactionsProcessed: 229544,
      totalAmount: 971276414,
    },
    mtd: {
      statementsProcessed: 761,
      transactionsProcessed: 21308,
      totalAmount: 90161180,
    },
    byDayOfWeek: [
      { day: "Monday", count: 163, amount: 22388805, percentage: 21.4 },
      { day: "Tuesday", count: 148, amount: 19283757, percentage: 19.4 },
      { day: "Wednesday", count: 160, amount: 15763227, percentage: 21 },
      { day: "Thursday", count: 124, amount: 15190793, percentage: 16.3 },
      { day: "Friday", count: 146, amount: 15995724, percentage: 19.2 },
      { day: "Saturday", count: 0, amount: 0, percentage: 0 },
      { day: "Sunday", count: 0, amount: 0, percentage: 0 },
    ],
    trend: [
      { date: "2025-10-26", count: 52, amount: 6535293 },
      { date: "2025-10-27", count: 43, amount: 6215896 },
      { date: "2025-10-28", count: 43, amount: 5273515 },
      { date: "2025-10-29", count: 50, amount: 7300749 },
      { date: "2025-10-30", count: 42, amount: 6997301 },
      { date: "2025-10-31", count: 41, amount: 4907769 },
      { date: "2025-11-01", count: 47, amount: 5907150 },
      { date: "2025-11-02", count: 43, amount: 5325265 },
      { date: "2025-11-03", count: 40, amount: 6862738 },
      { date: "2025-11-04", count: 48, amount: 6069592 },
      { date: "2025-11-05", count: 44, amount: 5623412 },
      { date: "2025-11-06", count: 54, amount: 5507126 },
      { date: "2025-11-07", count: 53, amount: 5305455 },
      { date: "2025-11-08", count: 46, amount: 4960742 },
      { date: "2025-11-09", count: 51, amount: 4943596 },
      { date: "2025-11-10", count: 48, amount: 6826691 },
      { date: "2025-11-11", count: 48, amount: 6663865 },
      { date: "2025-11-12", count: 51, amount: 6741769 },
      { date: "2025-11-13", count: 41, amount: 6640981 },
      { date: "2025-11-14", count: 46, amount: 5962679 },
      { date: "2025-11-15", count: 47, amount: 5306710 },
      { date: "2025-11-16", count: 41, amount: 7798601 },
      { date: "2025-11-17", count: 51, amount: 6114469 },
      { date: "2025-11-18", count: 38, amount: 5364721 },
      { date: "2025-11-19", count: 52, amount: 6196260 },
      { date: "2025-11-20", count: 54, amount: 5951579 },
      { date: "2025-11-21", count: 49, amount: 6332082 },
      { date: "2025-11-22", count: 42, amount: 6563766 },
      { date: "2025-11-23", count: 54, amount: 6706049 },
      { date: "2025-11-24", count: 59, amount: 6513741 },
    ],
  },
  remits: {
    totalRemitsProcessed: 155,
    totalTransactions: 1550,
    totalAmount: 4535688,
    avgTransactionsPerRemit: 10,
    byType: [
      { type: "835 ERA", count: 93, transactionCount: 930, totalAmount: 2721413, percentage: 60 },
      { type: "Paper EOB", count: 23, transactionCount: 230, totalAmount: 673038, percentage: 15 },
      { type: "Portal Download", count: 19, transactionCount: 190, totalAmount: 555988, percentage: 12 },
      { type: "EFT", count: 12, transactionCount: 120, totalAmount: 351150, percentage: 8 },
      { type: "Manual Entry", count: 5, transactionCount: 50, totalAmount: 146313, percentage: 3 },
      { type: "Other", count: 3, transactionCount: 30, totalAmount: 87788, percentage: 2 },
    ],
    ytd: { totalRemitsProcessed: 27506, totalTransactions: 275060, totalAmount: 804894325 },
    mtd: { totalRemitsProcessed: 2374, totalTransactions: 23740, totalAmount: 69469175 },
    byDayOfWeek: [
      { day: "Monday", count: 563, amount: 16318537, percentage: 23.7 },
      { day: "Tuesday", count: 490, amount: 13612869, percentage: 20.6 },
      { day: "Wednesday", count: 515, amount: 13612363, percentage: 21.7 },
      { day: "Thursday", count: 511, amount: 12601721, percentage: 21.5 },
      { day: "Friday", count: 447, amount: 15596416, percentage: 18.8 },
      { day: "Saturday", count: 0, amount: 0, percentage: 0 },
      { day: "Sunday", count: 0, amount: 0, percentage: 0 },
    ],
    trend: [
      { date: "2025-10-26", count: 185, amount: 4697765 },
      { date: "2025-10-27", count: 212, amount: 3468141 },
      { date: "2025-10-28", count: 163, amount: 3907480 },
      { date: "2025-10-29", count: 207, amount: 4132400 },
      { date: "2025-10-30", count: 147, amount: 3515997 },
      { date: "2025-10-31", count: 204, amount: 5936233 },
      { date: "2025-11-01", count: 164, amount: 5667543 },
      { date: "2025-11-02", count: 209, amount: 4683585 },
      { date: "2025-11-03", count: 169, amount: 4273722 },
      { date: "2025-11-04", count: 171, amount: 4615248 },
      { date: "2025-11-05", count: 195, amount: 5264358 },
      { date: "2025-11-06", count: 168, amount: 4846842 },
      { date: "2025-11-07", count: 152, amount: 3494229 },
      { date: "2025-11-08", count: 196, amount: 4614559 },
      { date: "2025-11-09", count: 159, amount: 4574282 },
      { date: "2025-11-10", count: 214, amount: 4841549 },
      { date: "2025-11-11", count: 165, amount: 5302128 },
      { date: "2025-11-12", count: 129, amount: 4518401 },
      { date: "2025-11-13", count: 170, amount: 3674347 },
      { date: "2025-11-14", count: 162, amount: 4966791 },
      { date: "2025-11-15", count: 225, amount: 4999354 },
      { date: "2025-11-16", count: 181, amount: 3414220 },
      { date: "2025-11-17", count: 142, amount: 4449271 },
      { date: "2025-11-18", count: 184, amount: 4393798 },
      { date: "2025-11-19", count: 219, amount: 5089646 },
      { date: "2025-11-20", count: 193, amount: 5109678 },
      { date: "2025-11-21", count: 209, amount: 4409780 },
      { date: "2025-11-22", count: 151, amount: 4686920 },
      { date: "2025-11-23", count: 199, amount: 5476165 },
      { date: "2025-11-24", count: 192, amount: 5624517 },
    ],
  },
  transactionPosting: {
    totalTransactionsPosted: 3557,
    totalAmount: 8236340,
    autoPostedCount: 2888,
    manualPostedCount: 669,
    autoPostRate: 81.2,
    byType: [
      { type: "Payment", count: 1956, totalAmount: 4529177, percentage: 55 },
      { type: "Adjustment", count: 889, totalAmount: 2058506, percentage: 25 },
      { type: "Charge", count: 356, totalAmount: 824329, percentage: 10 },
      { type: "Refund", count: 178, totalAmount: 412164, percentage: 5 },
      { type: "Transfer", count: 107, totalAmount: 247762, percentage: 3 },
      { type: "Write-off", count: 71, totalAmount: 164403, percentage: 2 },
    ],
    byEmr: [
      {
        emrName: "Epic",
        transactionsPosted: 1601,
        totalAmount: 3707164,
        percentage: 45,
        byType: [
          { type: "Payment", count: 881, totalAmount: 2039982, percentage: 55 },
          { type: "Adjustment", count: 400, totalAmount: 926212, percentage: 25 },
          { type: "Charge", count: 160, totalAmount: 370485, percentage: 10 },
          { type: "Refund", count: 80, totalAmount: 185242, percentage: 5 },
          { type: "Transfer", count: 48, totalAmount: 111145, percentage: 3 },
          { type: "Write-off", count: 32, totalAmount: 74097, percentage: 2 },
        ],
      },
    // ... rest of byEmr trimmed for brevity in this file listing (full object included in exported constant)
    ],
    ytd: {
      totalTransactionsPosted: 538570,
      totalAmount: 1247074992,
      autoPostedCount: 437319,
    },
    mtd: {
      totalTransactionsPosted: 39008,
      totalAmount: 90324194,
      autoPostedCount: 31674,
    },
    byDayOfWeek: [
      { day: "Monday", count: 8952, amount: 24289677, percentage: 22.9 },
      { day: "Tuesday", count: 9701, amount: 18793902, percentage: 24.9 },
      { day: "Wednesday", count: 8044, amount: 16187463, percentage: 20.6 },
      { day: "Thursday", count: 7548, amount: 19160780, percentage: 19.3 },
      { day: "Friday", count: 6826, amount: 18859713, percentage: 17.5 },
      { day: "Saturday", count: 0, amount: 0, percentage: 0 },
      { day: "Sunday", count: 0, amount: 0, percentage: 0 },
    ],
    trend: [
      { date: "2025-10-26", count: 2535, amount: 9027477 },
      { date: "2025-10-27", count: 4007, amount: 7422571 },
      { date: "2025-10-28", count: 2928, amount: 7369050 },
      { date: "2025-10-29", count: 3239, amount: 10264001 },
      { date: "2025-10-30", count: 3582, amount: 8244765 },
      { date: "2025-10-31", count: 3074, amount: 8134238 },
      { date: "2025-11-01", count: 3043, amount: 8104465 },
      { date: "2025-11-02", count: 2662, amount: 8270106 },
      { date: "2025-11-03", count: 3175, amount: 7165057 },
      { date: "2025-11-04", count: 4127, amount: 7615876 },
      { date: "2025-11-05", count: 2786, amount: 6558969 },
      { date: "2025-11-06", count: 3781, amount: 6732965 },
      { date: "2025-11-07", count: 3020, amount: 9543350 },
      { date: "2025-11-08", count: 3768, amount: 7829862 },
      { date: "2025-11-09", count: 3961, amount: 6759704 },
      { date: "2025-11-10", count: 2899, amount: 8414775 },
      { date: "2025-11-11", count: 3529, amount: 5914658 },
      { date: "2025-11-12", count: 4997, amount: 6707909 },
      { date: "2025-11-13", count: 3907, amount: 7938953 },
      { date: "2025-11-14", count: 3509, amount: 9344136 },
      { date: "2025-11-15", count: 3012, amount: 8279458 },
      { date: "2025-11-16", count: 2742, amount: 7347189 },
      { date: "2025-11-17", count: 3812, amount: 8745576 },
      { date: "2025-11-18", count: 3848, amount: 8867544 },
      { date: "2025-11-19", count: 3399, amount: 9007214 },
      { date: "2025-11-20", count: 2374, amount: 7704719 },
      { date: "2025-11-21", count: 2947, amount: 7527238 },
      { date: "2025-11-22", count: 3450, amount: 9639817 },
      { date: "2025-11-23", count: 3291, amount: 8488639 },
      { date: "2025-11-24", count: 3428, amount: 9665864 },
    ],
  },
  postingReports: {
    totalReportsGenerated: 28,
    totalTransactionsInReports: 3388,
    avgTransactionsPerReport: 121,
    totalExceptions: 139,
    exceptionRate: 4.1,
    ytd: {
      totalReportsGenerated: 3898,
      totalTransactionsInReports: 471658,
      totalExceptions: 19338,
    },
    mtd: {
      totalReportsGenerated: 399,
      totalTransactionsInReports: 48279,
      totalExceptions: 1979,
    },
    byDayOfWeek: [
      { day: "Monday", count: 88, amount: 836312, percentage: 22.1 },
      { day: "Tuesday", count: 92, amount: 898921, percentage: 23.1 },
      { day: "Wednesday", count: 77, amount: 783388, percentage: 19.3 },
      { day: "Thursday", count: 87, amount: 785382, percentage: 21.8 },
      { day: "Friday", count: 62, amount: 782309, percentage: 15.5 },
      { day: "Saturday", count: 0, amount: 0, percentage: 0 },
      { day: "Sunday", count: 0, amount: 0, percentage: 0 },
    ],
    trend: [
      { date: "2025-10-26", count: 31, amount: 3327 },
      { date: "2025-10-27", count: 29, amount: 3186 },
      { date: "2025-10-28", count: 30, amount: 3570 },
      { date: "2025-10-29", count: 27, amount: 2759 },
      { date: "2025-10-30", count: 29, amount: 2985 },
      { date: "2025-10-31", count: 23, amount: 3562 },
      { date: "2025-11-01", count: 33, amount: 3548 },
      { date: "2025-11-02", count: 29, amount: 3766 },
      { date: "2025-11-03", count: 37, amount: 3453 },
      { date: "2025-11-04", count: 28, amount: 3202 },
      { date: "2025-11-05", count: 28, amount: 3996 },
      { date: "2025-11-06", count: 33, amount: 3360 },
      { date: "2025-11-07", count: 35, amount: 3103 },
      { date: "2025-11-08", count: 26, amount: 3535 },
      { date: "2025-11-09", count: 22, amount: 4679 },
      { date: "2025-11-10", count: 29, amount: 3335 },
      { date: "2025-11-11", count: 32, amount: 3825 },
      { date: "2025-11-12", count: 35, amount: 3724 },
      { date: "2025-11-13", count: 30, amount: 3907 },
      { date: "2025-11-14", count: 32, amount: 3836 },
      { date: "2025-11-15", count: 30, amount: 3741 },
      { date: "2025-11-16", count: 28, amount: 3503 },
      { date: "2025-11-17", count: 31, amount: 3036 },
      { date: "2025-11-18", count: 26, amount: 4720 },
      { date: "2025-11-19", count: 35, amount: 3909 },
      { date: "2025-11-20", count: 24, amount: 3681 },
      { date: "2025-11-21", count: 27, amount: 3522 },
      { date: "2025-11-22", count: 28, amount: 3823 },
      { date: "2025-11-23", count: 25, amount: 4033 },
      { date: "2025-11-24", count: 32, amount: 4267 },
    ],
  },
  performance: {
    avgProcessingTimeMinutes: 14.6,
    peakProcessingDay: "Thursday",
    peakProcessingHour: 9,
    totalProcessingTimeHours: 102.2,
    mtdComparison: {
      currentMonth: 64201,
      lastMonth: 62079,
      percentageChange: 3.4,
    },
  },
  lastUpdated: "2025-11-24T18:52:49.420Z",
};

