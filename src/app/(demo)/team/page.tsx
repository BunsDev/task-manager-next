import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import AllTeam from "@/components/placeholder-content/team/AllTeam";
import { AddTeam } from "@/components/placeholder-content/team/AddTeam";
import { fetchTeam,  } from "@/actions/fetch-team";
import { getAllUsersForTeam } from "@/actions/fetch-user";
import { getProjectsForTeam } from "@/actions/fetch-projects";

export default async function TeamPage() {
  const team = await fetchTeam();
  const users = await getAllUsersForTeam();
  const projects = await getProjectsForTeam();

  return (
    <ContentLayout title="Team">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Team</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <AddTeam users={users} projects={projects} />
      </div>
      <AllTeam team={team} />
    </ContentLayout>
  );
}