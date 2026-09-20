import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tyres")({
  component: TyresLayout,
});

function TyresLayout() {
  return <Outlet />;
}