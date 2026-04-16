import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { NotFound } from "./pages/NotFound";

// Lazy-loaded pages
const HomePage = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.HomePage })),
);
const WriteupPage = lazy(() =>
  import("./pages/WriteupView").then((m) => ({ default: m.WriteupPage })),
);
const AdminLoginPage = lazy(() =>
  import("./pages/AdminLogin").then((m) => ({ default: m.AdminLoginPage })),
);
const AdminDashboardPage = lazy(() =>
  import("./pages/AdminDashboard").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const NewWriteupPage = lazy(() =>
  import("./pages/WriteupEditor").then((m) => ({ default: m.NewWriteupPage })),
);
const EditWriteupPage = lazy(() =>
  import("./pages/WriteupEditor").then((m) => ({ default: m.EditWriteupPage })),
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground animate-pulse">
        <span
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  ),
  notFoundComponent: () => <NotFound />,
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const writeupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/writeup/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WriteupPage />
    </Suspense>
  ),
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLoginPage />
    </Suspense>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const newWriteupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/writeup/new",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NewWriteupPage />
    </Suspense>
  ),
});

const editWriteupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/writeup/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EditWriteupPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  writeupRoute,
  adminLoginRoute,
  adminDashboardRoute,
  newWriteupRoute,
  editWriteupRoute,
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
