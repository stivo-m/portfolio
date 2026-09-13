# Project Portfolio Brief — Steven Maina

**Period:** November 2025 – September 2026 (~10 months)
**Organization:** AMAROK LLC (perimeter security / surveillance)
**Role:** Full-Stack Software Engineer
**Aggregate Commits:** 932 across 3 application repositories + 21 infrastructure commits

---

## Table of Contents

1. [Project Summaries](#project-summaries)
2. [AmarokIntelligence — Risk Intelligence Platform (Backend)](#amarokintelligence--risk-intelligence-platform-backend)
3. [AmarokIntelligence UI](#amarokintelligence-ui)
4. [PackCentral — Field Sales Operations Platform](#packcentral--field-sales-operations-platform)
5. [Infrastructure as Code (Terraform)](#infrastructure-as-code-terraform)
6. [Contributions Summary](#contributions-summary)
7. [Impact at Scale (700–2,000 Daily Users)](#impact-at-scale-7002000-daily-users)
8. [Case Study Topics](#case-study-topics)

---

## Project Summaries

| Project | What It Is | Stack | My Commits | Period |
|---------|-----------|-------|------------|--------|
| **AmarokIntelligence** | Backend microservices for location-based risk scoring, report generation, and data ingestion | .NET 8, PostgreSQL, SQS, Lambda, Terraform | 351 / 1,965 total | Dec 2025 – Jul 2026 |
| **AmarokIntelligence UI** | React SPA for risk dashboards, assessments, customer management, and presentation generation | React 19, TypeScript, Vite, Google Maps, Zustand, Recharts | 409 / 2,472 total | Nov 2025 – Jul 2026 |
| **PackCentral** | Interactive map-based workspace for field-sales territory management, route planning, and account visualization | React 19, OpenLayers, .NET 8, Databricks, Mapbox | 172 / 368 total | Jul 2026 – Sep 2026 |
| **Infrastructure (Terraform)** | AWS IaC for both platforms: ECS Fargate clusters, SQS queues, Lambdas, CloudFront, ALB, DynamoDB, S3, Secrets Manager | Terraform, AWS | 21 commits | Dec 2025 – Sep 2026 |

---

## AmarokIntelligence — Risk Intelligence Platform (Backend)

### Problem

AMAROK sells physical perimeter security (electric fences, surveillance). Before a sale, reps need to demonstrate that a prospect's location is at elevated risk — backed by data, not intuition. The company had no centralized system to aggregate crime statistics, theft reports, consortium alarm data, law-enforcement density, and internal lead/opportunity proximity into a single, defensible risk score per site. Assessments were manual, inconsistent, and could not scale across 700–2,000 daily users.

### Solution

A multi-service platform (codename **PacksIQ / AIQ**) that ingests external and internal risk data, computes a composite risk score per location using 8 weighted proximity calculators, generates branded PPTX/PDF site reports, and delivers real-time notifications when background jobs complete.

### Architecture

```
Browser (React SPA)
  │
  ├─── Packs.Auth.Web ──────────── Auth, user CRUD, roles, invites, audit
  │       JWT (HMAC-SHA256) + HttpOnly refresh cookies
  │       Microsoft Entra ID / MSAL SSO
  │       Microsoft Graph API (directory lookup)
  │
  ├─── Packs.DataLoader.Web ────── CSV/Excel upload: crime, CoreLogic, FBI, CargoNet, locations
  │
  ├─── Packs.RiskAssessment.Web ── Risk scoring API, assessments, presentations, analytics
  │       │
  │       └──► Amazon SQS (6 FIFO queues) ──► Packs.WorkerService.Worker
  │                                              ├── RunAssessment (calls Packs.Processor)
  │                                              ├── GeneratePresentation (PPTX → Gotenberg Lambda → PDF)
  │                                              ├── RefreshCustomer
  │                                              ├── ProcessLocationUpload (S3 → geocode → deduplicate)
  │                                              ├── RerunRiskAssessment
  │                                              └── SendEmail (SES)
  │
  ├─── Packs.Processor ─────────── 8 sub-calculators:
  │       Fence/camera density, ISROSR, police ratio,
  │       law-enforcement proximity, theft reports (CargoNet),
  │       consortium alarms, CoreLogic indices, lead/opportunity proximity
  │       Z-score normalization, percentile classification
  │
  ├─── WebSocket Lambda (Python) ─ JWT-authenticated connect/disconnect
  │       DynamoDB connection tracking, CloudWatch EMF metrics
  │
  └─── Gotenberg Lambda (Docker) ─ PPTX/HTML → PDF conversion (1024 MB, VPC-attached)
```

**Shared libraries:**
- `Packs.Db` — EF Core DbContext, 60+ entities, 50+ migrations, 25+ PostgreSQL stored functions for IQ calculations
- `Packs.Common` — CLEF JSON structured logging (Serilog), correlation ID propagation, auth helpers

**Infrastructure (Terraform — `application_packs`):**
- ECS cluster with 3 API services + 6 worker services
- 6 SQS FIFO queues
- ALB with HTTPS listener and path-based routing
- CloudFront + S3 for SPA hosting (OAC mode)
- API Gateway WebSocket with `$connect`/`$disconnect` routes
- DynamoDB table (PAY_PER_REQUEST, userId GSI, TTL)
- EFS shared filesystem
- Gotenberg Docker Lambda (VPC-attached)
- KMS-encrypted S3 bucket for app artifacts
- Secrets Manager (consolidated: DB, JWT, Azure AD, mail, Google Maps, Databricks)
- Per-service IAM roles with least-privilege policies (SQS consumer/producer, S3 read/write, WebSocket notify, Gotenberg invoke, SES send)

### Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| PostgreSQL stored functions for IQ calculations (25+ SQL functions) | Performance-critical proximity math with no round-trips; `fn_calculate_packsiq_for_location` orchestrates all 8 calculators in a single DB call |
| SQS-based background processing with dynamic service dispatch | One worker service, multiple job types routed by message key; decouples long-running work (assessments, reports, emails) from request lifecycle |
| Observer pattern in worker (IServiceObserver) | WebSocket notifications, DB persistence, and logging are pluggable observers on the service execution pipeline — adding a new side-effect is one class |
| Gotenberg in a Docker Lambda (VPC-attached, 1024 MB) | Serverless PPTX → PDF conversion avoids running a persistent Gotenberg container; scales to zero between report generations |
| JWT with HttpOnly refresh cookies | Access + refresh token model; configurable cookie modes (`local_dev` / `cross_site`) for development vs. production |
| Shared Serilog logging package (CLEF JSON) | Structured JSON across all services with correlation IDs that propagate through SQS messages and WebSocket notifications |
| Terraform workspaces for environment isolation | Single IaC config with `vars/` per-environment module, three environments; ECS task definitions, IAM roles, SQS queues, and secrets parameterized per workspace |
| Selective CI/CD (dorny/paths-filter) | Only changed services deploy on merge — reduces pipeline time and blast radius across 9 ECS services |
| SMTP → Amazon SES migration | Reliability and deliverability for transactional emails (invites, deactivation notices) at scale |
| Shared EF Core DB library (Packs.Db) | Centralized entities, migrations, enum types, and stored function definitions across all services; no model drift |
| Z-score normalization for PacksIQ | Cross-location comparison on a common scale; percentile tiers give business-readable risk bands |
| Databricks-hosted Claude Sonnet for executive summaries | Worker services call a Databricks-hosted Claude Sonnet 4.5 model via OpenAI-compatible endpoint to generate risk analysis executive summaries |

### What I Built (Backend — 351 Commits)

**Foundation & Auth (Dec 2025 – Jan 2026)**
- Customer listing with server-side pagination, search (with SQL injection prevention for `%` and `_` wildcards), sorting, and assessment details
- Refresh token bug fix and token lifecycle management
- Customer relationship tables and overview API
- Assessment history endpoints
- Installed accounts popover data layer

**Risk Engine & Background Processing (Feb – Mar 2026)**
- Assessment listing, customer risk distribution, PacksIQ breakdown endpoints
- Location risk breakdown for assessment detail views
- Worker service refactoring: dynamic service factory dispatch by message key type, abstract SQS publisher with userId overload
- Customer refresh pipeline (SQS-driven background data refresh)
- Assessment rerun workflow end-to-end (setup worker, SQS integration, CI/CD)
- Presentation generation pipeline (PPTX via OpenXml/Skia charts → Gotenberg Lambda → PDF → S3)

**Real-Time WebSocket Notification System (Mar 2026)**
- Python WebSocket Lambda handlers (`connect_handler.py`, `disconnect_handler.py`) — JWT verification via stdlib only, DynamoDB connection tracking, Secrets Manager caching across warm invocations
- `WebSocketNotifier` — queries DynamoDB userId-index GSI, fans out `PostToConnection` calls, handles `GoneException` for stale connections
- `WebSocketNotificationObserver` — plugs into worker observer pipeline; notifies user when assessments/reports/uploads complete
- GitHub Actions workflow for Lambda deployment (path-filtered, per-environment)
- Unit tests: 13 tests covering guard clauses, GSI query correctness, fanout, stale connection cleanup, best-effort exception swallowing

**Data Pipeline & Location Intelligence (Apr – May 2026)**
- Manual location entry during assessment creation
- Assessment rerun with/without external priorities, metadata editing
- `DateTime` → `DateTimeOffset` migration (timezone-aware handling across the platform)
- Percentile evaluation fix
- Batch location upload worker: S3 upload → SQS processing → validation → geocoding → deduplication (by address, coordinates, and customerLocationId)
- Upload format simplification (reduced to 6-column canonical format)

**Observability & Email (May 2026)**
- Shared Serilog logging package (`Packs.Common/Logging`) — CLEF JSON structured logging, correlation ID enrichers, deployed across all services
- Correlation ID propagation through SQS messages and WebSocket notifications
- Email worker service — SQS-driven email sending with strategy pattern (invites, deactivation)
- User invite flow (DB migrations, acceptance flow, SMTP → SES migration)
- CI/CD pipelines for email worker across all 3 environments

**Shared DB & Reports (May – Jun 2026)**
- `Packs.Db` shared database library — migrated all services to a single centralized EF Core DbContext
- Centralized PostgreSQL enum types as C# enums with `PostgresEnumConfiguration` wiring
- Z-score introduction in PacksIQ analysis
- Site report presentation tables and endpoints
- Excel download for location analysis (ClosedXML)
- Docker image font configuration for presentation rendering

**Advanced Features & Platform (Jun – Jul 2026)**
- Selective CI/CD (deploy only affected services via path-filtering)
- CircleCI configuration alongside GitHub Actions
- User management: AmarokRole filter, selling status filter, Microsoft Graph directory integration
- Presentation endpoints with details, template updates (CargoNet overlays, marker icons, radius layers)
- Skia-based chart rendering for PPTX presentations
- MCP proof-of-concept (exposing Auth + RiskAssessment services as Model Context Protocol tools for AI assistant integration)
- Data freshness tracking

---

## AmarokIntelligence UI

### Problem

The risk intelligence platform needed a front-end that could present complex risk data (multi-factor scores, geographic distributions, temporal trends) to non-technical sales users in a way that was immediately actionable — while also supporting power-user workflows like assessment configuration, batch location uploads, and report customization.

### Solution

A React SPA with wizard-driven assessment workflows, interactive Google Maps with clustered markers and risk overlays, real-time WebSocket notifications for background job status, and in-app PDF viewing and download for generated reports.

### Architecture

```
React 19 + TypeScript 5 + Vite
├── Auth ── MSAL (Azure AD SSO) + Zustand auth store + token refresh hook
├── State ── Zustand (auth, assessment wizard, presentation wizard, customer,
│            assessment details, presentation details, table config, toast, inactivity)
├── Server State ── TanStack React Query (cache/retry/stale/dedupe)
├── UI ── Radix UI primitives + shadcn component pattern + Tailwind CSS
├── Maps ── Google Maps (@react-google-maps/api) + MarkerClusterer
├── Charts ── Recharts (risk distributions, score breakdowns)
├── Tables ── react-data-grid (resizable columns, persistent widths)
├── Forms ── react-hook-form + Zod validation
├── DnD ── dnd-kit (sortable location lists)
├── Real-time ── WebSocket hook with JWT auth + exponential backoff reconnection
├── Docs ── react-pdf (in-app PDF viewing)
└── CI/CD ── GitHub Actions + CircleCI → S3 + CloudFront (OAC)
```

### Key Pages & Features

| Page | Capabilities |
|------|-------------|
| **Dashboard** | Overview metrics, navigation hub |
| **Customers** | Paginated table with search, filter popover, customer detail drill-down with error states, installed accounts popover, refresh flash notifications via WebSocket |
| **Assessments** | Multi-step wizard (basic info → location selection with interactive map → priority sliders → run), rerun with metadata editing, risk distribution charts, location risk breakdowns, edit workflow with back-button navigation |
| **Presentations** | Wizard (basic info → additional slides), presentation detail view with embedded PDF viewer, download, risk contributor formatting, high-risk contributor map display |
| **Users** | Management table with AmarokRole and selling-status multi-select filters, edit dialog, invite dialog with Microsoft Graph directory auto-complete, activate/deactivate |
| **Settings** | Application configuration |
| **Invites** | Accept-invite flow with forced re-login |

### What I Built (UI — 409 Commits)

**Core Infrastructure**
- CI/CD workflows: build and test quality gates on PRs to development/staging/main, scoped environment variables, secrets management (migrated from GHA variables to secrets), S3 + CloudFront deployment
- WebSocket hook (`use-report-notifications`) with JWT authentication, exponential backoff reconnection (1s → 2s → ... → 30s cap), stale closure prevention via refs
- Request ID injection on all API requests (correlation ID propagation to backend)
- Inactivity timer and session expiration dialog
- MSAL provider setup and auth callback handling
- Token refresh hook

**Customer Module**
- Customer listing with server-side pagination, search, sorting
- Customer detail page with comprehensive error states
- Installed accounts hoverable popover
- Customer refresh flash notifications (WebSocket-driven real-time updates)
- Customer header refresh logic

**Assessment Module**
- Multi-step assessment wizard (basic info → location map panel with Google Maps → priority configuration → execution)
- Assessment edit workflow with back-button navigation fix
- Assessment rerun popover with data inconsistency handling when location count changes
- Priority sliders with dynamic text updates and reset functionality
- Location map panel synchronized with locations panel via shared state and search
- Location selection panel with map interaction
- Query key invalidation on assessment click for data freshness
- Assessment stats card updates
- Default assessment name to "PACKS IQ" standardization

**Location Upload System**
- Shared location upload dialog (reusable across assessment and customer contexts)
- Real-time notifications when locations finish processing (WebSocket)
- Error dialogs with clickable hyperlinks to problem rows
- Duplicate grouping and display in error dialogs
- Location autocomplete with Google geocoding (`use-geocode`, `use-address-autocomplete`)
- State picker dropdown with auto-sizing multi-select
- Location form with address validators
- Upload template management

**Presentation Module**
- Presentation wizard layout (basic info → additional slides)
- Presentation detail view with embedded PDF viewer (react-pdf) and toolbar
- Presentation list with creation triggers and empty state handling
- Risk contributor formatting
- High-risk contributor display on map
- Presentation details store management

**User Management**
- User management table with pagination, search, sorting
- AmarokRole multi-select filter and selling-status filter
- Edit user dialog
- User invite dialog with Microsoft Graph directory suggestions for auto-complete
- Activate/deactivate flows with shared confirmation dialog
- Role-based visibility controls
- Sorting behavior fixes for AmarokRole and Role columns

**Shared Components & Patterns**
- Data grid with column resizing and persistent column widths (Zustand store)
- Autocomplete component with dynamic dropdown behavior
- Table column width persistence store
- App-level search component
- Step breadcrumbs for multi-step wizards
- Excel download for location analysis
- Angled popover, truncated tooltip text, content cards, status badges
- Loader modal, internal-use pill, value slider
- Wizard layout (header + footer + content)
- Dashboard layout with sidebar navigation
- App breadcrumbs for hierarchical navigation

---

## PackCentral — Field Sales Operations Platform

### Problem

AMAROK's 700–2,000 field sales users — reps, Named Account Directors (NADs), managers, Enterprise Development Directors (EDDs), and VPs — had no single tool to visualize their territories, prospect/customer sites, and route plans on a map. Territory assignment, account scoping, and route optimization were fragmented across Salesforce reports and manual processes. With tens of thousands of account pins to display, any browser-based solution had to handle massive data volumes without locking the UI.

### Solution

An interactive map-based workspace (codename **PackCentral**) that streams 50,000+ account pins via NDJSON over a Web Worker, renders them as OpenLayers clusters with heat maps and lasso selection, and integrates a route builder backed by a server-proxied Mapbox Optimization API — all scoped per user's territory, account-parent, and identity along three independent axes.

### Architecture

```
Browser (React 19 + OpenLayers 10)
  │
  ├─── Caddy Gateway
  │     ├── /api/auth → auth-api (.NET 8, port 5001)
  │     │     └── MSAL / Entra ID SSO, JWT, refresh tokens
  │     │
  │     └── /api/map → map-api (.NET 8, port 5002)
  │           ├── Account Pins (streaming NDJSON via Web Worker)
  │           ├── Territories / Scope / Onboarding
  │           ├── Site Detail + Activity (Salesforce events/tasks)
  │           ├── Route Builder (draft/saved/optimize)
  │           ├── Filters / Settings / Search
  │           ├── Feedback / Duplicate Report
  │           └── Mapbox Optimization Proxy
  │
  └─── S3 + CloudFront (SPA hosting via CloudFront Function SPA rewrite)

Database: Databricks (Postgres wire via EF Core + Npgsql)
  ├── AccountPinProjection (materialized view — pre-joined 7+ tables)
  ├── Silver layer views (sales territories, users, accounts, opportunities, EGD status)
  ├── RouteDraft, SavedRoute
  └── 26+ entities, 15 migrations
```

**Infrastructure (Terraform — `application_packcentral_v2`):**
- Per-environment directories (development/, staging/, production/, beta/) each calling shared `app/` module
- ECS cluster with 2 API services (auth + map)
- ALB with HTTP-only listener (CloudFront terminates TLS)
- CloudFront distribution serving both SPA and API from the same domain — `/api/*` → ALB origin, everything else → S3 origin with SPA rewrite. This eliminates CORS entirely
- CloudFront Function (`spa-rewrite`, cloudfront-js-2.0) rewrites extensionless client routes to `/index.html` for React Router deep-link support; passes through API paths and real assets
- S3 bucket with OAC for SPA hosting
- Secrets Manager (Azure AD config, JWT secret, DB connection string, Mapbox access token)
- Per-service IAM roles with least-privilege policies
- Migrated from v1 (single EC2 with Docker Compose) to v2 (ECS Fargate — proper scaling, no instance management)

**Backend pattern:** Clean Architecture per service (Core → UseCases → Infrastructure → Web), FastEndpoints, MediatR (CQRS-lite).

### Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Web Worker for NDJSON pin streaming | Offloads parsing of 50K+ pins from the main thread; batch-emits to UI via pub/sub to prevent frame drops |
| Materialized view for map pins (`AccountPinProjection`) | Single pre-joined query surface (accounts + territories + EGD + opportunities + contacts + owners + scores) — eliminates N+1 joins at request time |
| Backend-proxied Mapbox Optimization API | Keeps Mapbox access token server-side; enables chunked optimization for routes beyond the 12-waypoint API limit |
| Nearest-neighbour + chunk-refine for long routes | Coarse ordering via nearest-neighbour → chunk into 12-stop windows → Mapbox refine each chunk → Directions API for final geometry; solves 12-waypoint limit for up to 50 stops |
| Three-axis scope model | Territory scope (directors → their territories), account-parent scope (NADs → named parent accounts), NADM identity scope (resolved from JWT via silver layer with manager roll-up SQL) — each axis is independent |
| OpenLayers over Leaflet | Migration for rendering performance at scale (50K+ features) and richer interaction primitives (vector tiles, WebGL rendering) |
| CloudFront same-origin pattern | SPA + API served from one CloudFront distribution with CloudFront Function SPA rewrite — eliminates CORS, simplifies auth cookies, single domain for the user |
| EC2 → ECS Fargate migration (v1 → v2) | PackCentral v1 ran on a single EC2 with Docker Compose; v2 moves to containerized ECS Fargate with per-environment isolation, autoscaling, and no instance management |
| Zustand persist with partialize | Ephemeral UI state (selections, hover) separated from persisted preferences (filters, settings); avoids stale persisted state on code changes |
| Partial indexes on materialized view | Performance tuning for filtered queries (e.g., only EGD-active sites, only sites with open opportunities) |

### What I Built (PackCentral — 172 Commits, Jul – Sep 2026)

**Architecture & Infrastructure**
- Initial project scaffolding (microservices structure: auth-api + map-api)
- Caddy gateway configuration
- Docker Compose orchestration
- Dev container setup
- CI/CD pipeline: PR checks (lint, build, test, typecheck), 3-environment deployment (dev/staging/prod) via GitHub Actions → ECR → ECS Fargate
- Frontend deployment: S3 sync with immutable cache headers + CloudFront invalidation
- EF Core DB library setup with all 15 migrations
- Terraform: all 3 PackCentral environments (ECS task definitions for auth + map, secrets, env vars, outputs), OIDC role for GitHub Actions → AWS trust, Mapbox token secret injection

**Auth System**
- MSAL / Entra ID login flow
- JWT token management with refresh token lifecycle
- ActiveUser middleware
- `IdentityScopeResolver`: fallback chain (headers → JWT → silver layer lookup)

**Map System (Full Ownership)**
- OpenLayers integration (migrated from Leaflet)
- Web Worker + NDJSON streaming pipeline (`map-pins.worker.ts` + `map-pins-stream.ts`)
- Cluster layer with dynamic break-zoom
- Heat map layer (volume/recency modes with configurable time windows: 7d/14d/30d/quarter/half/year)
- Selection layer (lasso and radius selection tools)
- Route geometry layer
- Satellite/street basemap toggle
- Customer label overlays
- Three-axis scope model implementation (territory, account-parent, NADM identity)
- `AccountPinProjection` materialized view with partial indexes

**Route Builder (Full Ownership)**
- Backend CRUD endpoints for route drafts and saved routes
- Mapbox Optimization proxy with chunked optimization for >12 waypoints
- Route panel UI (15+ sub-components): start/end/middle stop management with auto-promotion from pool
- Drag-and-drop stop reordering (dnd-kit)
- Appointment/dwell-time anchors per stop
- Draft auto-save with server sync
- Saved routes with server sync
- Cross-platform navigation handoff (Google Maps / Apple Maps / Waze)
- Route email sharing

**Onboarding System**
- Role-based onboarding views for 6 sales roles (director, rep, NAD, NADM, EDD, VP)
- Territory selection flow (director/rep)
- Account book confirmation flow (NAD/NADM)
- EDD/VP onboarding with instant-check state and deduplicated report confirmation
- Per-role scope strategy

**Filtering & Preferences**
- TriState filter system (Any/Only/Exclude) for: EGD products, open opportunities, SMQL, DNC
- Multi-select filters: relationship type, site status
- Range filters: score min/max, RMR minimum, recency days
- Server-side `FilterEvaluator` with persisted user preferences
- 16+ user preferences: opportunity view style, SF link placement, week start, author display, locate color, dwell/meeting defaults, hand bias, navigation provider, motion reduction, customer labels, flag contacts

**UI Features**
- Site detail panel: hero section, activity timeline, pipeline carousel/band/meter views, drill navigation (account → sub-accounts), score gauge, occupancy badge, recency chips, contact details with Salesforce links
- List panel with occupancy indicators and score gauges
- Command palette / global search (local pin search + geocoding place search)
- Map legend with filter sync
- Feedback dialog with mailto flow
- Scope override banner
- Dark/light theme system
- Mobile responsive bottom sheet

---

## Infrastructure as Code (Terraform)

### Repository Structure

All Terraform lives in the `InternalAWSInfrastructure` monorepo with 30+ reusable modules:

```
InternalAWSInfrastructure/
├── modules/
│   ├── ecs_cluster, ecs_api_service, ecs_worker_service
│   ├── ecs_task_role, ecs_task_security_group
│   ├── alb, sqs_queue, ecr_repository
│   ├── app_secret, iam_policy_attachment
│   └── cloudfront_asset_hosting/*
│
├── application_packs/          ← AmarokIntelligence IaC
│   ├── main.tf                 (workspace-based: dev/staging/prod)
│   └── vars/                   (per-environment config module)
│
├── application_packcentral/    ← PackCentral v1 (legacy EC2)
│   └── modules/packcentral/
│
└── application_packcentral_v2/ ← PackCentral v2 (ECS Fargate)
    ├── app/                    (shared module)
    ├── development/
    ├── staging/
    ├── production/
    └── beta/
```

### My IaC Contributions (21 Commits)

**PackCentral v2:**
- Set up all 3 PackCentral environments (development/staging/production) — ECS task definitions for auth + map services, secrets configuration, environment variables, outputs
- Maps service ECS task definition across all 3 environments
- OIDC role for PackCentral_main GitHub Actions → AWS trust (full federated identity setup)
- Consolidated federated GitHub principal (replaced 2 files with 1)
- Mapbox access token secret injection across all environments

**AmarokIntelligence:**
- Environment variable passthrough to ECS API tasks
- Queue URL injection: dataloader service (location uploads), auth API (email queue)
- Email worker service frontend URL configuration
- Azure Client Secret and AppGroupID from Secrets Manager
- Assessment rerun default model configuration

### Architecture Decisions (IaC)

| Decision | Rationale |
|----------|-----------|
| Workspace-based environments (application_packs) | Single config, `vars/` per environment — fast iteration |
| Per-directory environments (packcentral_v2) | Clearer state isolation between dev/staging/prod/beta |
| S3 remote state with encryption | Shared state bucket with per-app keys; encrypted at rest |
| Shared module library (30+ modules) | Consistent resource provisioning across both platforms |
| CloudFront → ALB same-origin pattern | Eliminates CORS by serving SPA + API from one distribution; CloudFront Function handles SPA deep-links |
| EC2 → ECS Fargate migration | PackCentral v1 ran on a single EC2; v2 provides autoscaling, no instance management, per-environment isolation |
| Centralized Secrets Manager | One secret per application with all config keys; individual references in ECS container definitions |
| Least-privilege IAM per service | Per-service ECS task execution roles with inline policies scoped to exactly the resources needed |

---

## Contributions Summary

### By Category

| Category | What I Did |
|----------|-----------|
| **System Design** | Designed microservices architecture for AmarokIntelligence (5 services + 2 Lambdas + shared DB library). Designed PackCentral microservices (2 services + gateway). Defined Clean Architecture boundaries, CQRS patterns, and observer pipeline. |
| **Full-Stack Features** | Built end-to-end: risk assessment workflow, presentation generation pipeline, batch location upload with geocoding/dedup, user management with invite flow, route builder with chunked optimization, map rendering with 50K+ pin streaming, real-time WebSocket notifications, wizard-driven UIs. |
| **Data Engineering** | 60+ entities and 50+ migrations (AmarokIntelligence), 26+ entities and 15 migrations (PackCentral). Materialized views with partial indexes. 25+ PostgreSQL stored functions. Silver layer integration with Databricks. DateTime → DateTimeOffset migration. |
| **DevOps & Infrastructure** | Terraform-managed AWS infrastructure: ECS Fargate clusters, SQS FIFO queues, S3, SES, CloudFront, ALB, API Gateway WebSocket, DynamoDB, Secrets Manager, Lambda, EFS. GitHub Actions + CircleCI CI/CD with selective per-service deployment. Docker multi-stage builds. EC2 → ECS Fargate migration. OIDC-based deployment auth. |
| **Observability** | Shared structured logging package (Serilog CLEF JSON) across all services. Correlation ID propagation from React client → API → SQS → worker → WebSocket. CloudWatch EMF metrics on Lambda. Request ID injection on all frontend API calls. |
| **Quality** | Unit and integration tests across all services (516+ passing in AmarokIntelligence). Quality gates (lint, build, test, typecheck) enforced on all PRs across all repositories. Jest test suites for frontend. |

### By the Numbers

| Metric | Value |
|--------|-------|
| Total commits across all repos | 953 (932 application + 21 infrastructure) |
| Backend services designed and built | 7 deployable units + 2 Lambda functions |
| Frontend applications | 2 SPAs (AmarokIntelligence UI + PackCentral) |
| Database entities | 86+ |
| Database migrations | 65+ |
| PostgreSQL stored functions | 25+ |
| API endpoints | 70+ |
| React components/pages | 150+ |
| Zustand stores | 14+ |
| SQS queues | 6 FIFO queues |
| CI/CD pipelines | 6+ (per-service, per-environment, selective) |
| Environments managed | 3–4 per platform (development, staging, production, beta) |
| AWS services used | 15+ (ECS, ECR, SQS, S3, CloudFront, ALB, API Gateway, DynamoDB, Lambda, EFS, SES, Secrets Manager, IAM, CloudWatch, KMS) |
| Terraform modules | 30+ reusable modules |
| Duration | ~10 months |

---

## Impact at Scale (700–2,000 Daily Users)

### Performance
- **50K+ map pins rendered without UI jank** — Web Worker parses NDJSON off the main thread and batch-emits to OpenLayers, keeping the frame budget under 16ms. Without this, the browser would freeze for seconds on every data load for every user, every session.
- **Materialized view eliminates N+1 joins** — `AccountPinProjection` pre-joins 7+ tables into a single query surface. At 700–2,000 concurrent users requesting pins, this turns what would be thousands of multi-table joins per second into a single indexed read per request.
- **Chunked route optimization** — The nearest-neighbour + chunk-refine algorithm lets users plan routes with up to 50 stops where the Mapbox API limits requests to 12. Without it, reps would need to manually split routes or plan shorter trips.
- **PostgreSQL stored functions for risk calculations** — All 8 proximity calculators execute in a single DB call per location, avoiding application-layer round-trips. At batch scale (hundreds of locations per assessment), this reduces assessment time from minutes to seconds.
- **Selective CI/CD** — Only deploys changed services. With 9 ECS services in AmarokIntelligence alone, this cuts average deploy time and reduces regression risk in unrelated services.
- **CloudFront same-origin pattern** — Eliminates CORS preflight requests on every API call, reducing latency by one round-trip for authenticated requests.

### Reliability
- **WebSocket with exponential backoff** — Automatic reconnection (1s → 30s cap) ensures real-time notifications survive network blips. Without it, users would need to manually refresh to see if their assessment, report, or location upload completed.
- **Observer pattern for side-effects** — Adding a new notification channel or audit trail is a single class implementing `IServiceObserver` — no changes to the core worker pipeline. This kept the system extensible without regression risk.
- **Correlation IDs end-to-end** — When a user reports an issue, the request ID propagated from the React client through the API, into SQS, through the worker, and into the WebSocket notification enables tracing the full request lifecycle in CloudWatch logs.
- **Session expiration and inactivity handling** — Prevents partially-authenticated UI state that could lead to data inconsistencies or confusing error states for users who leave their browser open.
- **SQS FIFO queues for background work** — Guaranteed ordering and exactly-once processing for critical workflows (risk assessments, presentations, emails). Failed messages go to dead-letter queues, not silent drops.
- **Terraform-managed infrastructure** — All AWS resources are codified, versioned, and reproducible. No manual console changes that could drift between environments.

### Business Impact
- **Eliminated manual risk assessments** — What previously took hours of manual data gathering and spreadsheet work is now a wizard-driven workflow that produces a branded PDF report in minutes.
- **Enabled data-driven sales conversations** — Reps can show prospects a defensible, multi-factor risk score backed by FBI crime data, CargoNet theft reports, and CoreLogic indices — not intuition.
- **Centralized territory and route planning** — Instead of juggling Salesforce reports, Google Maps, and spreadsheets, the entire field-sales workflow lives in one map-based workspace.
- **Role-based scoping at every level** — From individual rep territories to VP-level rolled-up views, each user sees exactly the data relevant to their scope, reducing noise and improving decision quality.
- **Batch location processing** — Customers with hundreds of locations can upload a single spreadsheet; the system geocodes, deduplicates, and processes them asynchronously with real-time progress notifications.
- **Cross-platform route handoff** — Reps optimize their route in PackCentral, then tap to open it in Google Maps, Apple Maps, or Waze for turn-by-turn navigation — bridging planning and execution.

---

## Case Study Topics

### 1. Streaming 50,000 Map Pins to the Browser Without Blocking the UI
**Angle:** How NDJSON streaming + Web Workers + OpenLayers clustering solved the problem of rendering tens of thousands of geospatial features in a React SPA without frame drops.
**Covers:** Web Worker architecture, NDJSON parsing, pub/sub batch emission, OpenLayers cluster layer with dynamic break-zoom, materialized views for the data surface, performance comparison before/after.
**Keywords:** Web Workers, NDJSON, geospatial rendering, OpenLayers, React performance, materialized views.

### 2. Building a Multi-Factor Risk Scoring Engine in PostgreSQL
**Angle:** How 25+ stored functions, 8 proximity-based calculators, and Z-score normalization produce a composite risk score per location — and why the calculation lives in the database, not the application.
**Covers:** Calculator design (fence density, crime indices, theft reports, consortium alarms, law-enforcement proximity), weighted priority aggregation (Amarok/external/customer), Z-score normalization, percentile classification, performance at scale.
**Keywords:** PostgreSQL, stored functions, risk scoring, Z-score, geospatial analytics, proximity analysis.

### 3. Real-Time Notifications Across a Microservices Pipeline
**Angle:** End-to-end trace of a notification from SQS worker completion through DynamoDB connection lookup to WebSocket push to React hook — and the observer pattern that makes it extensible.
**Covers:** SQS message flow, worker observer pattern (`IServiceObserver`), Python Lambda JWT auth with stdlib, DynamoDB GSI for connection lookup, API Gateway WebSocket management, React hook with exponential backoff, correlation ID propagation.
**Keywords:** WebSocket, SQS, observer pattern, real-time, microservices, AWS Lambda, DynamoDB.

### 4. Three-Axis Scope: Role-Based Data Isolation for a Sales Organization
**Angle:** How territory scope, account-parent scope, and NADM identity scope combine to give 6 different sales roles exactly the data they need — resolved from a single JWT.
**Covers:** IdentityScopeResolver fallback chain, silver layer SQL for manager roll-up, role-based onboarding flows, scope override mechanics, materialized view filtering.
**Keywords:** RBAC, multi-tenant, scope isolation, JWT, sales territory management, Salesforce integration.

### 5. Chunked Route Optimization: Beating API Waypoint Limits
**Angle:** When the Mapbox Optimization API limits you to 12 waypoints but your users need 50-stop routes — a nearest-neighbour + chunk-refine + Directions API pipeline that produces optimized routes transparently.
**Covers:** Nearest-neighbour coarse ordering, sliding-window chunking, Mapbox Optimization per chunk, Directions API for final geometry, server-side proxy to protect API tokens, drag-and-drop reordering, cross-platform navigation handoff.
**Keywords:** Route optimization, Mapbox, TSP approximation, geospatial, API constraints, chunked processing.

### 6. Serverless Document Generation: PPTX to PDF at Scale
**Angle:** Generating branded risk-report presentations with dynamic charts and maps, converting them to PDF via a Gotenberg sidecar in a Docker Lambda, and delivering them through S3 with real-time WebSocket notifications.
**Covers:** OpenXml PPTX generation, Skia-based chart rendering, Gotenberg Lambda (VPC-attached Docker container), S3 storage, SQS-triggered worker pipeline, real-time delivery notification, font configuration in Docker.
**Keywords:** Document generation, serverless, Lambda, Gotenberg, OpenXml, Skia, PPTX, PDF.

### 7. Selective CI/CD for a Multi-Service Monorepo
**Angle:** How path-filtered GitHub Actions pipelines ensure only the changed service deploys — reducing pipeline time, blast radius, and AWS costs across 9 backend services, 2 Lambdas, and 2 React frontends.
**Covers:** dorny/paths-filter configuration, per-service Docker builds, ECR push, ECS task definition rendering, 3-environment promotion (dev → staging → prod), OIDC-based AWS auth, S3 + CloudFront frontend deployment with cache invalidation, CircleCI parallel configuration.
**Keywords:** CI/CD, GitHub Actions, monorepo, selective deployment, ECS Fargate, ECR, CloudFront.

### 8. Same-Origin Architecture: Eliminating CORS with CloudFront + ALB
**Angle:** How serving a React SPA and its API from a single CloudFront distribution — with a CloudFront Function for SPA deep-link rewrites and an ALB origin for API paths — eliminates CORS complexity, reduces latency, and simplifies auth.
**Covers:** CloudFront multi-origin setup, CloudFront Function (`cloudfront-js-2.0`) for SPA routing without clobbering API status codes, ALB HTTP-only origin (CloudFront terminates TLS), OAC for S3, cache policies for immutable assets vs. dynamic API responses, Terraform module design.
**Keywords:** CloudFront, CORS, SPA deployment, ALB, same-origin, Terraform, AWS.

### 9. From Zero to Production: Building Two Enterprise Platforms in 10 Months
**Angle:** A retrospective on building two interconnected platforms (risk intelligence + field-sales operations) from empty repositories to production serving 700–2,000 daily users — the architectural bets, the things that worked, and what to do differently.
**Covers:** Technology selection (why .NET 8, why React 19, why OpenLayers over Leaflet, why PostgreSQL stored functions over application-layer calculations), microservices boundaries, shared DB library trade-offs, Terraform IaC, team coordination across 10+ contributors, migration paths (Leaflet → OpenLayers, SMTP → SES, DateTime → DateTimeOffset, EC2 → ECS Fargate).
**Keywords:** SaaS, greenfield, enterprise, architecture, .NET, React, AWS, Terraform, microservices.
