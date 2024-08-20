"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useProject } from "@/providers/project-context";
import { EditProject } from "./EditProject";
import { Trash } from "lucide-react";
import { deleteProject } from "@/actions/delete-project";
import Link from "next/link";
import ProjectProgress from "@/components/ProjectProgress";

export default function AllProjects() {
  const { projects, setProjects } = useProject();

  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        {projects?.length === 0 ? (
          <div>No Projects Available</div>
        ) : (
          <div className="grid gap-8 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects && projects.map((project) => (
              <Card key={project.id} className="h-fit w-full relative">
                <CardHeader>
                  <CardTitle className="flex gap-2  items-center">
                    <Button variant="outline" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="#" alt="Avatar" />
                        <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                      </Avatar>
                    </Button>
                    <Link href={`/projects/${project.id}`} className=" overflow-hidden line-clamp-1">
                      {project.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectProgress key={project.id} projectId={project.id} />
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <Badge key={category.id} variant="outline">{category.name}</Badge>
                  ))}
                </CardFooter>
                <div className="w-full flex justify-end p-2">
                  <EditProject projectId={project.id} />
                  <Button
                    onClick={async () => {
                      await deleteProject(project.id)
                      setProjects((prevProjects) => prevProjects.filter(pro => pro.id !== project.id));
                    }}
                    variant={"ghost"}>
                    <Trash className="text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
