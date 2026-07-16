# Finly — PFM Dashboard (Week 1: Frontend Foundation & Auth)

Frontend for the Personal Finance Management Dashboard, built by Member 1 (Frontend)
for Week 1 of the team workplan: project setup, Tailwind config, folder structure,
Login UI, Register UI, and routing.

## Tech stack

- React 18 (Vite)
- React Router DOM v6
- Tailwind CSS
- React Icons
- Axios (wired up, not yet hitting a live backend)

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

Copy `.env.example` to `.env` and point `VITE_API_BASE_URL` at the backend once it's live.

## Folder structure

```
src/
  assets/              static images/icons
  components/
    Button/
    Input/
    Card/
    Logo/
    Loader/
    Navbar/
    Footer/
    ProtectedRoute/
    PageContainer/
  layouts/
    AuthLayout.jsx     split-screen shell for Login/Register
    MainLayout.jsx     navbar + footer shell for authenticated pages
  pages/
    Login/
    Register/
    Dashboard/         placeholder, dummy data
    NotFound/
  routes/
    AppRoutes.jsx       route table
  services/
    authService.js      mocked login/register/logout, ready to swap for real API calls
  utils/
    constants.js
  hooks/
    usePasswordStrength.js
  styles/
    index.css           Tailwind entry + base layer
```

## Routes

| Path         | Page                          |
|--------------|--------------------------------|
| `/`          | Login                         |
| `/register`  | Register                      |
| `/dashboard` | Dashboard (protected, dummy data) |
| `*`          | 404 Not Found                 |

`/dashboard` is wrapped in `ProtectedRoute`, which checks for a token in
`localStorage` (set by the mocked `authService`). Logging in or registering
sets the token; logging out (Navbar) clears it.

## Component notes

- **Button** — variants (`primary`, `secondary`, `ghost`, `danger`), sizes, built-in
  loading state with spinner, press/hover/focus animations.
- **Input** — labeled field with error/hint text, `aria-invalid` + `aria-describedby`
  wiring, optional trailing slot (used for the password show/hide toggle).
- **Card** — the base surface for auth panels and dashboard tiles (rounded-2xl, soft shadow).
- **Logo** — inline SVG mark + wordmark, no external asset.
- **Loader** — small spinner reused inside `Button` and can be dropped anywhere.
- **Navbar / Footer** — used by `MainLayout` for authenticated pages; Navbar collapses
  into a mobile menu below `sm`.
- **ProtectedRoute** — redirects to `/` when there's no auth token.
- **PageContainer** — consistent max-width/padding wrapper for page content.

## Future API integration points

All of these currently live in `src/services/authService.js` as mocked functions
with a comment showing the real `axios` call to swap in:

- `POST /auth/login` — replace the mock in `login()`
- `POST /auth/register` — replace the mock in `register()`
- `POST /auth/logout` — optional server-side invalidation in `logout()`
- Dashboard summary/transactions in `src/pages/Dashboard/Dashboard.jsx` are hardcoded
  arrays (`SUMMARY_CARDS`, `RECENT_TRANSACTIONS`) — swap for API responses in Week 3
  once Member 2's summary/income/expense APIs are ready.

`VITE_API_BASE_URL` (see `.env.example`) is already read by the `axios` instance
exported from `authService.js`, so no config changes should be needed beyond
pointing it at the real backend URL.

## Suggestions for improvement (next weeks)

- Add a global auth context (`React Context` or a small store) instead of reading
  `localStorage` directly in `ProtectedRoute`/`Navbar`, so token state updates
  propagate without a full navigation.
- Add real form validation library (e.g. `react-hook-form` + `zod`) once forms grow
  more complex (transaction filters, budget forms in Week 2–3).
- Add toast notifications for success/error feedback instead of inline banners only.
- Add a loading skeleton for Dashboard cards once real API calls introduce latency.
- Add unit tests (Vitest + React Testing Library) for form validation logic and
  `ProtectedRoute` behavior.
