import { Dashboard } from "@/features/dashboard/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { id } = params as { id: string };

  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboards/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/mydashboard");
  }

  const dashboard: Dashboard = await res.json();

  if (!dashboard.createdByMe) {
    redirect(`/dashboard/${id}`);
  }

  return <>{children}</>;
}
