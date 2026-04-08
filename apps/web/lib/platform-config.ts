export type PlatformRole = "admin" | "client" | "team" | "freelancer" | "partner";

export interface PlatformMetric {
  label: string;
  value: string;
  detail: string;
}

export interface PlatformCapability {
  title: string;
  summary: string;
  highlights: string[];
}

export interface PlatformModule {
  slug: string;
  title: string;
  audience: PlatformRole[];
  summary: string;
  capabilities: PlatformCapability[];
}

export interface PlatformPhase {
  name: string;
  timeline: string;
  outcome: string;
  milestones: string[];
}

export interface PlatformIntegration {
  category: string;
  providers: string[];
}

export const platformMetrics: PlatformMetric[] = [
  {
    label: "Core domains",
    value: "20",
    detail: "Structured across sales, delivery, support, finance, CMS, and operations.",
  },
  {
    label: "Primary roles",
    value: "5",
    detail: "Admin, client, team member, freelancer, and agency partner with scoped access.",
  },
  {
    label: "Delivery phases",
    value: "6",
    detail: "A roadmap from architecture foundation through launch hardening.",
  },
];

export const platformModules: PlatformModule[] = [
  {
    slug: "user-management",
    title: "User management and authentication",
    audience: ["admin", "client", "team", "freelancer", "partner"],
    summary: "Secure multi-role authentication with lifecycle controls, verification, and auditability.",
    capabilities: [
      {
        title: "Identity and access",
        summary: "Support OAuth, JWT refresh tokens, magic links, and MFA without weakening RBAC.",
        highlights: ["Multi-role auth", "Role and permission matrix", "Session and device tracking"],
      },
      {
        title: "Account trust",
        summary: "Harden signup and recovery flows around verification, secure reset, and audit logs.",
        highlights: ["Email and SMS verification", "Password reset tokens", "Activity history"],
      },
    ],
  },
  {
    slug: "service-catalog",
    title: "Service catalog and proposals",
    audience: ["admin", "client", "team"],
    summary: "Sell services through rich catalogs, tailored pricing, quote generation, and approval flows.",
    capabilities: [
      {
        title: "Commercial modeling",
        summary: "Represent fixed, hourly, package, and subscription pricing with optional add-ons.",
        highlights: ["Service packages", "Comparison tools", "Recommendations engine"],
      },
      {
        title: "Proposal workflow",
        summary: "Convert discovery into quotes, approvals, and invoice-ready records.",
        highlights: ["Quote builder", "Versioning", "PDF and e-signature support"],
      },
    ],
  },
  {
    slug: "delivery-operations",
    title: "Projects, tickets, and collaboration",
    audience: ["admin", "client", "team", "freelancer", "partner"],
    summary: "Run delivery operations from intake to handoff with visibility for clients and internal teams.",
    capabilities: [
      {
        title: "Project execution",
        summary: "Track milestones, tasks, files, approvals, budgets, and delivery status in one workspace.",
        highlights: ["Kanban and calendar views", "Milestones and Gantt timelines", "File management"],
      },
      {
        title: "Support and teamwork",
        summary: "Combine ticketing, chat, assignments, SLA management, and internal notes.",
        highlights: ["Ticket routing", "Team chat", "Comment and mention system"],
      },
    ],
  },
  {
    slug: "communications",
    title: "Communications and notifications",
    audience: ["admin", "client", "team"],
    summary: "Unify email, SMS, WhatsApp, and in-app messaging across client journeys and operations.",
    capabilities: [
      {
        title: "Unified inbox",
        summary: "Route messages into shared conversations with client context and delivery tracking.",
        highlights: ["Email and WhatsApp", "Read receipts", "File attachments"],
      },
      {
        title: "Notification engine",
        summary: "Trigger user-preference-aware notifications through queued multi-channel delivery.",
        highlights: ["Priority-based dispatch", "Scheduled digests", "History and preferences"],
      },
    ],
  },
  {
    slug: "finance-analytics",
    title: "Finance, analytics, and admin",
    audience: ["admin", "client", "team"],
    summary: "Manage invoices, payments, reporting, and platform operations with security and compliance in mind.",
    capabilities: [
      {
        title: "Finance operations",
        summary: "Handle invoices, subscriptions, payment plans, disputes, and accounting integrations.",
        highlights: ["Stripe-first billing", "Webhook-driven payment state", "Multi-currency support"],
      },
      {
        title: "Operational intelligence",
        summary: "Provide dashboards for revenue, service performance, support SLAs, and team throughput.",
        highlights: ["Executive KPIs", "Custom exports", "Admin health monitoring"],
      },
    ],
  },
];

export const platformPhases: PlatformPhase[] = [
  {
    name: "Phase 1",
    timeline: "Weeks 1-4",
    outcome: "Foundation and governance",
    milestones: [
      "Next.js shell, auth contract, and design system alignment",
      "Database and service boundary design",
      "Admin workspace skeleton and environment setup",
    ],
  },
  {
    name: "Phase 2",
    timeline: "Weeks 5-8",
    outcome: "Commercial core",
    milestones: [
      "Service catalog and public service pages",
      "Booking workflows and client portal entry points",
      "CRM essentials and payment initiation",
    ],
  },
  {
    name: "Phase 3",
    timeline: "Weeks 9-12",
    outcome: "Delivery operations",
    milestones: [
      "Project management and task views",
      "Messaging, file handling, and ticketing",
      "Operational notifications and assignments",
    ],
  },
  {
    name: "Phase 4",
    timeline: "Weeks 13-16",
    outcome: "Finance and intelligence",
    milestones: ["Quotes and proposals", "Invoice automation and accounting hooks", "Analytics dashboards and scheduled reporting"],
  },
  {
    name: "Phase 5",
    timeline: "Weeks 17-20",
    outcome: "Mobile and advanced automation",
    milestones: [
      "React Native client and team mobile experiences",
      "Workflow automation, AI support, and optimization",
      "Advanced integrations and sync services",
    ],
  },
  {
    name: "Phase 6",
    timeline: "Weeks 21-24",
    outcome: "Launch readiness",
    milestones: [
      "Security, performance, and resilience testing",
      "Operational runbooks and documentation",
      "Deployment, training, and go-live verification",
    ],
  },
];

export const platformIntegrations: PlatformIntegration[] = [
  { category: "Payments", providers: ["Stripe", "PayPal", "Square", "Razorpay"] },
  { category: "Communication", providers: ["SendGrid", "AWS SES", "Twilio", "WhatsApp Business API"] },
  { category: "Calendar and video", providers: ["Google Calendar", "Outlook", "Zoom", "Google Meet"] },
  { category: "Productivity", providers: ["GitHub", "GitLab", "Jira", "Slack"] },
  { category: "Accounting and CRM", providers: ["QuickBooks", "Xero", "Salesforce", "HubSpot"] },
];

export const implementationStandards = [
  "TypeScript strict mode with no implicit any and explicit error handling.",
  "Zod validation on every API input before business logic executes.",
  "Environment-driven secrets and structured logging for all production services.",
  "UTC-first dates, Decimal-first money handling, and pagination on every list endpoint.",
  "Activity logging for state-changing admin operations and validated file uploads before storage.",
];
