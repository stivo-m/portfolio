export const site = {
  name: "Steven Maina",
  title: "Full-Stack Software Engineer",
  location: "Nairobi, Kenya",
  email: "maichstivo254@email.com",
  phone: "+254714725468",
  linkedin: "https://www.linkedin.com/in/maina-steven/",
  summary:
    "Senior Software Engineer with 6+ years building mobile, web, backend, cloud, and AI-enabled systems across fintech, insurtech, logistics, field sales, and consumer platforms.",
};

export const stats = [
  { value: "2,000", label: "daily users served" },
  { value: "953", label: "commits across 4 repos" },
  { value: "50K+", label: "map pins streamed smoothly" },
  { value: "80%", label: "theft loss reduction via RFID" },
];

export const highlights = [
  {
    title: "Enterprise platforms from zero to production",
    description:
      "Built risk intelligence and field-sales platforms spanning React, .NET 8, PostgreSQL, Databricks, Terraform, and AWS.",
  },
  {
    title: "Performance work that changes user behavior",
    description:
      "Moved heavy geospatial rendering off the main thread with NDJSON streaming and Web Workers so reps can work with full territories smoothly.",
  },
  {
    title: "Full-stack ownership, not just delivery",
    description:
      "Comfortable owning product architecture, CI/CD, infrastructure, observability, data models, and polished user-facing interfaces.",
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Griffin Global Technologies / AMAROK",
    period: "Sep 2025 – Present",
    location: "GA, United States",
    summary:
      "Lead engineer on production risk intelligence and sales operations platforms serving up to 2,000 daily users.",
    bullets: [
      "Built a risk assessment platform combining crime statistics, alarm data, law-enforcement density, and internal sales signals into composite site scores.",
      "Designed SQS-backed background processing, Terraform-managed ECS tasks, WebSocket notifications, and serverless PPTX-to-PDF generation.",
      "Streamed large map datasets with NDJSON and Web Workers, rendered geospatial pins smoothly, and cut complex query times with materialized views.",
      "Restructured selective CI/CD pipelines to build and deploy only changed services, reducing deployment time and cost by roughly 50%.",
    ],
  },
  {
    role: "Senior Frontend Developer",
    company: "Fullbooker",
    period: "Mar 2025 – Aug 2025",
    location: "Nairobi, Kenya",
    summary:
      "Sole consultant building a Next.js marketplace for tickets and adventure activities with a Django backend.",
    bullets: [
      "Designed merchant onboarding, helping the business sign its first 30 clients.",
      "Integrated M-Pesa payments, merchant wallets, QR ticket validation, visual ticket rendering, and PDF generation.",
      "Helped drive about 1M in monthly recurring revenue and improved ticket validation efficiency by 30%.",
    ],
  },
  {
    role: "Senior Lead Engineer",
    company: "Globout Solutions",
    period: "Sep 2024 – Mar 2025",
    location: "Berlin, Germany",
    summary:
      "Led a team of 4 building a privacy-first social location platform across Flutter, Node.js, Firebase, and GCP.",
    bullets: [
      "Reported directly to the CEO while managing backend services, cloud functions, budget tracking, and CI/CD.",
      "Built a Slack onboarding chatbot that drove roughly 170 new signups per month.",
      "Reduced infrastructure spend by optimizing CI/CD workflows and Firebase query patterns.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Volane International",
    period: "May 2022 – Aug 2024",
    location: "Nairobi, Kenya",
    summary:
      "Led mobile, web, backend, and hardware-integrated platforms for Rubis, Puma, and Galana fleet systems.",
    bullets: [
      "Built a distributed LPG cylinder tracking platform using Flutter, Vue.js, Node.js microservices, RFID, and USSD.",
      "Cut theft losses by 80% and counterfeit incidents by 70% through RFID-based cylinder tracking.",
      "Rebuilt the Rubis mobile app in Flutter and designed RSA-based device authentication for financial app data.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Savannah Informatics",
    period: "Jun 2020 – Mar 2022",
    location: "Nairobi, Kenya",
    summary:
      "Built insurance marketplace and companion mobile products across React, Next.js, Flutter, and PostgreSQL.",
    bullets: [
      "Built a medical insurance marketplace that generated over KES 500M in sales within its first three months.",
      "Designed state-machine workflows that routed clients to products dynamically by family size, age group, and provider criteria.",
      "Developed a Flutter app for benefit tracking, pre-authorization codes, dependent management, and medical records.",
    ],
  },
  {
    role: "Independent Consultant",
    company: "Self-employed",
    period: "Jan 2017 – Jun 2020",
    location: "Nairobi, Kenya",
    summary:
      "Built websites, mobile apps, and early software projects for community organizations and independent practice.",
    bullets: [
      "Built personal software projects including a Java game.",
      "Delivered web and mobile work for My Passion My Commitment and Africa Hope Center Children's Home.",
    ],
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  ".NET",
  "C#",
  "Go",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "AWS",
  "Terraform",
  "Databricks",
  "Firebase",
  "MCP",
  "AI-assisted development",
];

export const caseStudies = [
  {
    slug: "risk-assessment-engine",
    title: "Building a Multi-Factor Risk Scoring Engine in PostgreSQL",
    summary:
      "How 25+ stored functions, 8 proximity calculators, and Z-score normalization create defensible location risk scores.",
    tags: ["PostgreSQL", "Risk Scoring", "Geospatial", "Clean Architecture"],
  },
  {
    slug: "map-sales-workspace",
    title: "Streaming 50,000 Map Pins Without Blocking the UI",
    summary:
      "How NDJSON streaming, Web Workers, OpenLayers, and materialized views made high-volume territory maps usable.",
    tags: ["React", "OpenLayers", "Web Workers", "Performance"],
  },
  {
    slug: "realtime-notifications",
    title: "Real-Time Notifications Across a Microservices Pipeline",
    summary:
      "An end-to-end notification path from SQS worker completion to WebSocket push and React reconnection handling.",
    tags: ["SQS", "WebSockets", "Lambda", "DynamoDB"],
  },
  {
    slug: "three-axis-scope",
    title: "Three-Axis Scope for Sales Data Isolation",
    summary:
      "How territory, account-parent, and identity scope combine to give six sales roles the right data from one JWT.",
    tags: ["RBAC", "JWT", "Databricks", "Salesforce"],
  },
  {
    slug: "route-optimization",
    title: "Chunked Route Optimization Beyond API Limits",
    summary:
      "A nearest-neighbour and chunk-refine pipeline that lets reps plan up to 50-stop routes despite third-party limits.",
    tags: ["Mapbox", "Routing", "Algorithms", "Geospatial"],
  },
  {
    slug: "document-generation",
    title: "Serverless Document Generation at Scale",
    summary:
      "Generating branded PPTX reports, rendering charts, converting to PDF in Lambda, and delivering via S3 notifications.",
    tags: ["OpenXml", "Skia", "Gotenberg", "Lambda"],
  },
  {
    slug: "selective-cicd",
    title: "Selective CI/CD for a Multi-Service Platform",
    summary:
      "Path-filtered GitHub Actions pipelines that deploy only changed services across APIs, workers, Lambdas, and SPAs.",
    tags: ["GitHub Actions", "ECS", "Terraform", "DevOps"],
  },
  {
    slug: "same-origin-architecture",
    title: "Same-Origin Architecture with CloudFront and ALB",
    summary:
      "Serving SPA and API from one CloudFront distribution to eliminate CORS complexity and simplify authenticated requests.",
    tags: ["CloudFront", "ALB", "CORS", "Terraform"],
  },
];
