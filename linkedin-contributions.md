# Contributions Summary

**Full-Stack Software Engineer | Nov 2025 to Sep 2026**

Built two enterprise platforms from scratch for a national perimeter security company, serving 2,000 daily active users (65%+ adoption across the sales organization). Responsible for system design, full-stack feature delivery, data engineering, cloud infrastructure, and CI/CD across .NET 8 microservices, React 19 SPAs, PostgreSQL, and AWS.

## System Design and Architecture

- Architected a location-based risk intelligence platform as 5 .NET 8 microservices with a shared EF Core database library, 2 serverless functions, and a React SPA, resulting in a modular system that independently deploys and scales for 2,000 daily active users across a national sales organization

- Designed an interactive map-based field sales workspace using React 19 and OpenLayers, streaming 50,000+ geospatial pins to the browser via NDJSON over Web Workers, resulting in sub-16ms frame budgets and zero UI thread blocking, enabling reps to load their full territory in under 2 seconds instead of waiting through multi-second freezes

- Defined Clean Architecture boundaries across 7 backend services with CQRS, FastEndpoints, and MediatR, resulting in independent deployability and near-zero cross-service coupling, allowing the team to ship features to individual services without risking regressions across the platform

## Full-Stack Feature Delivery

- Built a multi-factor risk scoring engine using 25+ PostgreSQL stored functions and 8 proximity-based calculators (crime indices, theft reports, law enforcement density, consortium alarm data), resulting in reduction of assessment turnaround from 2 to 3 hours of manual data gathering to under 5 minutes per site, recovering an estimated 4,000+ hours/week of field-rep time across 2,000 users

- Developed a route optimization system using a nearest-neighbour and chunk-refine pipeline with a server-proxied mapping API, resulting in optimized routes of up to 50 stops (previously capped at 12 by the third-party API), directly expanding the number of field visits a rep can plan per day and enabling cross-platform handoff to Google Maps, Apple Maps, and Waze

- Implemented a real-time notification pipeline spanning SQS message queues, Python Lambda handlers with JWT authentication, DynamoDB connection tracking, and a React WebSocket hook with exponential backoff reconnection, resulting in instant job-completion alerts that eliminated the manual refresh-and-wait cycle for 2,000 users running background operations like assessments, reports, and location uploads

- Created a serverless document generation pipeline using OpenXml for PPTX creation, Skia for dynamic chart rendering, and a Gotenberg sidecar in a Docker Lambda for PDF conversion, resulting in on-demand branded risk reports that sales reps use directly in prospect meetings, replacing manually assembled slide decks

- Built wizard-driven assessment workflows with interactive Google Maps, batch location upload with geocoding and deduplication, and a user management system with Microsoft Graph directory integration, resulting in self-service location processing that handles hundreds of sites per upload where the previous workflow required one-at-a-time manual entry

- Developed a three-axis data scoping model (territory, account hierarchy, identity) resolved from a single JWT via silver-layer SQL with manager roll-up, resulting in standardized data isolation for 6 distinct sales roles, ensuring each of the 2,000 daily users sees exactly the accounts and territories relevant to their role without manual filtering

## Data Engineering

- Designed 86+ database entities across 65+ EF Core migrations including materialized views with partial indexes that pre-join 7+ tables into a single query surface, resulting in elimination of N+1 joins and single-read pin loading that supports 2,000 concurrent map sessions without query bottlenecks

- Authored 25+ PostgreSQL stored functions orchestrating Z-score normalization and percentile classification across 8 risk dimensions, resulting in standardized, defensible risk scores that replaced subjective rep-by-rep assessments across the entire 2,000-person sales organization

- Executed a platform-wide DateTime to DateTimeOffset migration across all services and database schemas, resulting in consistent timezone-aware data handling and elimination of a class of temporal bugs affecting users across multiple US time zones

## DevOps and Cloud Infrastructure

- Provisioned AWS infrastructure via Terraform (ECS Fargate, SQS FIFO, S3, CloudFront, ALB, API Gateway WebSocket, DynamoDB, Lambda, SES, Secrets Manager) with 30+ reusable modules across 3 to 4 environments per platform, resulting in fully codified, reproducible infrastructure with zero console drift and consistent parity between development, staging, and production

- Established selective CI/CD using path-filtered GitHub Actions that deploy only changed services across 9 ECS containers, 2 Lambda functions, and 2 frontend SPAs, resulting in reduced deployment time and smaller blast radius per merge, enabling the team to ship multiple times per day with confidence

- Migrated platform infrastructure from a single EC2 instance running Docker Compose to ECS Fargate with per-environment isolation, resulting in autoscaling that handles the 700 to 2,000 DAU range without manual capacity planning and zero instance management overhead

- Designed a same-origin CloudFront architecture serving both the SPA and API from a single distribution with a CloudFront Function for deep-link rewrites, resulting in elimination of CORS preflight overhead and one fewer network round-trip per authenticated request across millions of daily API calls

## Observability and Quality

- Built a shared structured logging package (Serilog, CLEF JSON) deployed across all backend services with correlation ID propagation from browser through API, SQS, worker, and WebSocket layers, resulting in full request lifecycle tracing that reduced mean time to diagnose production issues from hours of log searching to minutes of correlated trace lookup

- Established quality gates enforcing lint, build, test, and typecheck on all pull requests across all repositories, resulting in 516+ passing tests in the risk platform and consistent code quality across a 10+ person team, preventing regressions from reaching the 2,000 daily users

## Key Metrics

- 2,000 daily active users served (65%+ adoption across the sales organization)
- An estimated 4,000+ hours/week of field-rep time recovered through automation
- 953 commits across 4 repositories over 10 months
- 9 backend services and 2 Lambda functions designed and shipped
- 2 React SPAs built from scratch
- 86+ database entities, 65+ migrations, 25+ stored functions
- 70+ API endpoints
- 15+ AWS services provisioned via Terraform
- 3 to 4 environments per platform (development, staging, production, beta)
