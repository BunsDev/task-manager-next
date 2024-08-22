import Link from "next/link";
import { fetchProject } from "@/actions/fetch-projects";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AddProject } from "@/components/placeholder-content/projects/AddProject";
import AllProjects from "@/components/placeholder-content/projects/AllProjects";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ProjectProvider } from "@/providers/project-context";
import ProjectTabs from "@/components/placeholder-content/projects/ProjectTabs";





export default async function PostsPage() {
  const projects = await fetchProject();

  return (
    <ProjectProvider>
      <ContentLayout title="All Projects">
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
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <AddProject projects={projects} />
        </div>
        <ProjectTabs />
        {/* <AllProjects /> */}
      </ContentLayout>
    </ProjectProvider>
  );
}
