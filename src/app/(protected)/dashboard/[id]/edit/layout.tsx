import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/apiRequest";
import { Dashboard } from "@/features/dashboard/types";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("accessToken")?.value;
  const cookieHeader = cookie ? `accessToken=${cookie}` : "";

  const { id } = params as { id: string };

  const dashboard = await apiRequest<Dashboard>(`/dashboards/${id}`, {
    method: "GET",
    cookieHeader,
  });

  if (!dashboard.createdByMe) {
    redirect(`/dashboard/${id}`);
  }

  return <>{children}</>;
}
