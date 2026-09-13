export const site = {
  name: "Steven Maina",
  title: "Full-Stack Software Engineer",
  location: "Nairobi, Kenya",
  email: "maichstivo254@email.com",
  phone: "+254714725468",
  linkedin: "https://www.linkedin.com/in/maina-steven/",
  github: "https://github.com/stivo-m",
  summary:
    "Senior Software Engineer building mobile, web, backend, cloud, and AI-enabled systems across fintech, insurtech, logistics, field sales, and consumer platforms.",
};

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
    company: "Griffin Global Technologies",
    period: "Sep 2025 – Present",
    location: "GA, United States",
    bullets: [
      "Led 1 platform now in production as Lead Engineer, with a team of 6, working across React, .NET, PostgreSQL on Databricks, and AWS.",
      "Worked as a consultant for Amarok, a major US company specializing in physical perimeter security such as electric fences and surveillance.",
      "Built a risk assessment platform that combines crime statistics, alarm data, and law enforcement density into a composite risk score used by up to 2,000 daily users.",
      "Set up a serverless Gotenberg service to convert PPTX reports to PDF without losing visual fidelity.",
      "Restructured CI/CD pipelines to build and deploy only changed services, cutting deployment time and cost by about 50 percent.",
      "Designed background job processing with SQS queues and Terraform managed ECS tasks that scale independently.",
      "Used AWS API Gateway for WebSocket notifications instead of standing up a separate service, keeping infrastructure costs down.",
      "Built a route planning tool for sales agents, using materialized views to speed up complex queries by 60 percent.",
      "Streamed map data with NDJSON and a web worker to render 450,000 pins smoothly without triggering React state refreshes.",
      "Introduced an MCP layer scoped with OAuth to expose platform tools and data to LLMs, tying access to user roles and permissions.",
      "Mentored 1 intern and 2 engineers on the team, supporting their technical growth alongside day to day project work.",
    ],
  },
  {
    role: "Software Frontend Developer (Part-time)",
    company: "Fullbooker",
    period: "Mar 2025 – Aug 2025",
    location: "Kenya, Nairobi",
    bullets: [
      "Worked as a Senior Frontend Developer and sole consultant, building the entire web application for a marketplace for tickets and adventure activities in Kenya, using Next.js with a Python Django backend.",
      "Designed the merchant onboarding flow, helping the business sign its first 30 clients and run ticket sales for half of them.",
      "Built QR code scanning directly into the web app for faster ticket validation at events.",
      "Integrated MPESA payments with virtual wallets for merchants, giving customers instant payment prompts and helping drive about 1M in monthly recurring revenue.",
      "Built a post-purchase feature with a visual ticket renderer and PDF generator, giving users instant access to billing history and event tickets.",
      "Raised ticket validation efficiency by 30 percent through this automated ticket generation flow.",
    ],
  },
  {
    role: "Senior Lead Engineer",
    company: "Globout Solutions",
    period: "Sep 2024 – Mar 2025",
    location: "Berlin, Germany",
    bullets: [
      "Led a team of 4 developers as Senior Lead Engineer, reporting directly to the CEO, building a social network that let users share live location with friends to plan meetups around real business trips.",
      "Worked across Flutter, Node.js, Firebase, and the GCP stack, handling the backend and writing cloud functions to support core app behavior.",
      "Managed the GCP account, including budget tracking and spending allocation.",
      "Set up and maintained CI/CD workflows for the team.",
      "Built a Slack integration with a chatbot that helped onboard new users, driving about 170 new signups a month.",
      "Cut infrastructure costs by around $120 a month by revising CI/CD workflows and optimizing Firebase queries with added indexes and custom aggregation pipelines.",
      "Supported the platform at a scale of at least 700 concurrent users during normal operation.",
      "Mentored 2 interns on coding standards, testing, and general engineering practice.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Volane International",
    period: "May 2022 – Aug 2024",
    location: "Nairobi, Kenya",
    bullets: [
      "Led mobile, web, and backend development across platforms including Rubis (Kenya, Uganda), Puma (Zambia, South Africa, Tanzania), and Galana fleet management, coordinating with teams in Mauritius and India.",
      "Built a distributed LPG cylinder tracking platform for Puma with Flutter, Vue.js, and Node.js microservices, scaled to handle 10,000 cylinder cycles per hour per country.",
      "Introduced RFID based cylinder tracking that cut theft losses by 80 percent and counterfeit incidents by 70 percent.",
      "Chose Flutter over native Android and iOS builds to unify the mobile codebase across 8 divisions, including integration with Linux POS hardware.",
      "Managed and supported a USSD platform for Puma across three countries, built with Go and MongoDB.",
      "Rebuilt the Rubis mobile app in Flutter, carrying it from Figma design through development and launch, replacing the earlier native Java and Swift versions.",
      "Designed a device based authentication system for Rubis using RSA encryption and public/private key pairs, securing financial data without requiring user login.",
      "Developed an internal RAG based chat tool with Next.js, Pinecone, and Amazon Bedrock, giving internal teams natural language access to company documentation.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Savannah Informatics",
    period: "Jun 2020 – Mar 2022",
    location: "Nairobi, Kenya",
    bullets: [
      "Built a web marketplace with React and Next.js that let insurance companies digitize medical cover sales, generating over KES 500M in sales within the first three months of launch.",
      "Designed state machine based workflows to route clients to insurance products dynamically based on family size, age group, and provider criteria.",
      "Developed a Flutter companion app that tracked health insurance benefit usage by category and issued pre-authorization codes for clinic visits.",
      "Added dependent management to the mobile app, letting users maintain medical records for family members.",
      "Structured the backend data layer with PostgreSQL to support both the marketplace and the companion app.",
      "Set up Google Analytics and GTM tracking to measure campaign performance, contributing to roughly 350 new app activations from related marketing pushes.",
      "Worked as part of a six person engineering team on Be.Well and related products, reporting to the team lead.",
    ],
  },
  {
    role: "Independent Consultant",
    company: "Nairobi, Kenya",
    period: "Jan 2017 – June 2020",
    location: "",
    bullets: [
      "Built personal projects to practice software development skills, including a game built in Java.",
      "Partnered with a charity organization, My Passion My Commitment, to develop their website and a mobile application.",
      "Built a website for Africa Hope Center Children's Home.",
    ],
  },
];

export const skills = [
  "Java (Spring Boot)",
  "Go (Golang)",
  "C# (.NET)",
  "TypeScript",
  "JavaScript",
  "Python",
  "Dart",
  "C++",
  "Spring Boot",
  "REST APIs",
  "Microservices",
  "PostgreSQL",
  "AWS",
  "Terraform",
  "CI/CD",
  "GitHub Copilot",
  "Claude Code",
  "MCP",
  "AI-assisted development workflows",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Redux Toolkit",
  "TanStack Query",
  "Zustand",
  "Flutter",
  "React Native (Expo)",
  "iOS/Android native bridge development",
];

export const caseStudies = [
  { slug: "risk-assessment-engine", title: "Building a Multi-Factor Risk Scoring Engine in PostgreSQL", summary: "How 25+ stored functions, 8 proximity calculators, and Z-score normalization create defensible location risk scores.", tags: ["PostgreSQL", "Risk Scoring", "Geospatial", "Clean Architecture"] },
  { slug: "map-sales-workspace", title: "Streaming 50,000 Map Pins Without Blocking the UI", summary: "How NDJSON streaming, Web Workers, OpenLayers, and materialized views made high-volume territory maps usable.", tags: ["React", "OpenLayers", "Web Workers", "Performance"] },
  { slug: "realtime-notifications", title: "Real-Time Notifications Across a Microservices Pipeline", summary: "An end-to-end notification path from SQS worker completion to WebSocket push and React reconnection handling.", tags: ["SQS", "WebSockets", "Lambda", "DynamoDB"] },
  { slug: "three-axis-scope", title: "Three-Axis Scope for Sales Data Isolation", summary: "How territory, account-parent, and identity scope combine to give six sales roles the right data from one JWT.", tags: ["RBAC", "JWT", "Databricks", "Salesforce"] },
  { slug: "route-optimization", title: "Chunked Route Optimization Beyond API Limits", summary: "A nearest-neighbour and chunk-refine pipeline that lets reps plan up to 50-stop routes despite third-party limits.", tags: ["Mapbox", "Routing", "Algorithms", "Geospatial"] },
  { slug: "document-generation", title: "Serverless Document Generation at Scale", summary: "Generating branded PPTX reports, rendering charts, converting to PDF in Lambda, and delivering via S3 notifications.", tags: ["OpenXml", "Skia", "Gotenberg", "Lambda"] },
  { slug: "selective-cicd", title: "Selective CI/CD for a Multi-Service Platform", summary: "Path-filtered GitHub Actions pipelines that deploy only changed services across APIs, workers, Lambdas, and SPAs.", tags: ["GitHub Actions", "ECS", "Terraform", "DevOps"] },
  { slug: "same-origin-architecture", title: "Same-Origin Architecture with CloudFront and ALB", summary: "Serving SPA and API from one CloudFront distribution to eliminate CORS complexity and simplify authenticated requests.", tags: ["CloudFront", "ALB", "CORS", "Terraform"] },
];
