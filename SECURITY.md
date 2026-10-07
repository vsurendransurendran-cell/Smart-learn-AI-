# SMARTLEARN - PRODUCTION SECURITY BASELINE & ARCHITECTURE

## 1. Executive Summary

SmartLearn AI is an AI-powered personalized learning platform integrating adaptive computer science curricula, voice-enabled AI tutors, and real-time tech opportunities. This document establishes the comprehensive, production-ready security baseline implemented across the frontend (React), backend (Node.js/Express), database (MySQL with prepared statements), authentication layer (Bcrypt + JWT), and Google Gemini AI services.

---

## 2. Secrets & Environment Variables Management

- **Zero Hardcoded Secrets**: No API keys, passwords, database credentials, or sensitive secrets are stored in the client-side code, git repository, or hardcoded strings.
- **Server-Side Only**: All API secrets (including `GEMINI_API_KEY`, `JWT_SECRET`, and `DB_PASSWORD`) reside strictly on the server and are accessible only via `process.env`.
- **Git Protection**: `.env`, `.env.local`, and related production environment files are explicitly excluded via `.gitignore`.
- **Environment Template**: `.env.example` documents all required and optional environment keys with safe placeholder values:
  - `GEMINI_API_KEY`: Server-side Gemini API key.
  - `JWT_SECRET`: High-entropy 256-bit secret key for signing JSON Web Tokens.
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `DB_SSL`: MySQL credentials.
  - `FRONTEND_URL`: Allowed origins for production Cross-Origin Resource Sharing (CORS).
  - `RAPIDAPI_KEY`, `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `YOUTUBE_API_KEY`, `LUMA_API_KEY`: Optional third-party integration keys.

---

## 3. Google Gemini AI API Security

- **Centralized Proxy Architecture**: The client-side React code **never** contacts the Gemini API directly. All AI queries, multimodal file analyses, live voice dialogues, and speech transcriptions route exclusively through `/api/ai/*` backend endpoints.
- **Quota & Rate-Limiting Protection**: All AI endpoints are protected by `aiLimiter` (35 requests/minute per IP) to mitigate denial-of-wallet and quota exhaustion attacks.
- **Payload Validation**: Inputs are validated and constrained using Zod schemas:
  - Text prompts: max 2,000 to 4,000 characters.
  - Chat history: max 50 turns.
  - File attachments: strictly enforced 15MB payload size caps with allowed MIME types (`image/*`, text/plain).
- **Graceful Fallback / Non-Leaking Failure Modes**: If the Gemini API key is missing or external quotas are reached, the system falls back to an offline pedagogical reasoning engine without disclosing internal stack traces, API response bodies, or endpoint configurations.

---

## 4. Authentication & Credential Protection

- **Password Hashing**: Passwords are never stored in plaintext. They are salted and hashed using `bcryptjs` with 10 salt rounds before database persistence.
- **Stateless Tokens (JWT)**: Authentication utilizes industry-standard JSON Web Tokens (`HS256` algorithm) with a 7-day expiration time. Tokens include minimal claims (`id`, `email`, `name`, `role`).
- **Cryptographic OTP Generation**:
  - Verification codes are generated using Node.js cryptographically secure pseudo-random number generator (`crypto.randomInt(100000, 1000000)`).
  - Codes are stored as SHA-256 hashes with a 5-minute time-to-live (TTL).
  - Strict 30-second cooldown per mobile number prevents SMS/OTP spamming.
- **No Password Leaks in Responses**: All user models omit `password_hash` prior to returning user data across `/api/auth/*` and `/api/students/*`.
- **Demo Accounts Removed**: Legacy hardcoded 1-click profiles and bypass passwords have been completely purged from the authentication system. Users now register and sign in through authentic bcrypt and JWT validation flows.

---

## 5. Authorization & IDOR Prevention

- **Token Verification (`authenticateUser`)**: Validates the Bearer token in the `Authorization` header.
- **Resource Ownership Enforcement (`authorizeResourceOwner`)**:
  - Middleware checks that `req.user.id === req.params.id`.
  - Non-admin users are strictly forbidden (`403 Forbidden`) from reading or mutating other students' profiles, assessments, learning paths, or progress logs.

---

## 6. Input Validation & Sanitization (Zod)

Every incoming HTTP request body and query parameter is validated against strict Zod schemas before reaching business logic:
- `registerSchema`: Requires valid email format, minimum 8-character password with letters and digits, and sanitized name strings.
- `loginSchema`: Validates identifier and password length.
- `sendOtpSchema` & `verifyOtpSchema`: Enforces 10-digit sanitized phone numbers and exactly 6-digit numeric OTP codes.
- `assessmentSubmitSchema`: Validates question lists, question options, and student answer maps.
- `libraryReadPageSchema`: Asserts valid positive page numbers and book identifiers.

---

## 7. SQL Injection Protection & Database Security (MySQL)

- **Prepared Statements / Parameterized Queries**: All database operations (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) utilize parameter substitution (`?`) via `mysql2/promise` (`db.execute(sql, [params])`).
- **Zero String Concatenation**: Query strings are never concatenated with user-provided input.
- **Dedicated Connection Pool**: `mysql.createPool` configures connection limits, connection timeouts, and optional SSL encryption (`rejectUnauthorized: true`).
- **Resilient Fallback Repository**: If MySQL environment variables are unconfigured in preview containers, a thread-safe repository provides equivalent data storage without breaking existing user flows.
- **Schema**: Production schema is documented and initialized in `src/server/schema.sql` featuring foreign key constraints with cascading deletes and indexing on lookup columns (`email`, `user_id`).

---

## 8. Rate Limiting Strategy

Configured via `express-rate-limit`:
| Limiter | Endpoint Scope | Window | Max Requests | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `globalLimiter` | `/api/*` | 15 minutes | 400 | Mitigates brute-force scraping and DoS |
| `authLimiter` | `/api/auth/*` | 15 minutes | 20 | Defends against credential stuffing and brute-force logins |
| `aiLimiter` | `/api/ai/*` | 1 minute | 35 | Protects Gemini API rate limits and financial quotas |
| `assessmentLimiter` | `/api/assessments/submit` | 15 minutes | 60 | Prevents XP/progress inflation spam |

---

## 9. HTTP Security Headers & CORS

- **Helmet**:
  - `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing.
  - `Referrer-Policy: strict-origin-when-cross-origin`: Controls referrer data leakage.
  - Frameguard configured to allow preview iframe integration while blocking unauthorized origins in production.
- **CORS**:
  - Configured with explicit `methods` (`GET, POST, PUT, DELETE, OPTIONS`) and `allowedHeaders`.
  - Restricted to matching `FRONTEND_URL` in production environments.

---

## 10. Information Disclosure & Centralized Error Handling

- Central Express error handler traps all unhandled exceptions:
  - In production (`NODE_ENV === 'production'`), returns a sanitized message: `An unexpected error occurred. Please try again later.`
  - Stack traces, database connection strings, file paths, and external API error messages are never sent to clients.

---

## 11. Vercel & Cloud Deployment Configuration

- `vercel.json` provides API rewrite routes to `/server.ts` alongside client SPA rewrites to `/index.html`.
- Production security headers are attached to all static and dynamic responses.

---

## 12. Reporting Security Vulnerabilities

If you discover a security vulnerability within SmartLearn AI, please report it privately:
- **Email**: `security@smartlearn.ai`
- **Response SLA**: Within 48 business hours with an assessment and remediation plan.
- Please do not disclose vulnerabilities publicly until a patch has been released.
