"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { Trash } from "lucide-react";
import { EditProject } from "./EditProject";
import { deleteProject } from "@/actions/delete-project";
import ProjectProgress from "@/components/ProjectProgress";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";


type Category = {
  id: string;
  name: string;
  ownerId: string;
};

type Project = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  categories: Category[];
};


export default function TeamProjects({ project }: { project: Project }) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        {!project ? (
          <Card>
            <CardContent>
              No Project Available
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card key={project.id} className="h-fit w-full relative">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <Button variant="outline" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="#" alt={project.name || "Avatar"} />
                      <AvatarFallback className="bg-transparent">
                        {project.name ? project.name.charAt(0) : "P"}
                      </AvatarFallback>
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
                {project.categories.map((category: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                  <Badge key={category.id} variant="outline">
                    {category.name}
                  </Badge>
                ))}
              </CardFooter>
              <div className="w-full flex justify-end p-2">
                <EditProject projectId={project.id} />
                <Button
                  onClick={async () => {
                    await deleteProject(project.id);
                    // Here you would remove the project from the state
                  }}
                  variant={"ghost"}
                >
                  <Trash className="text-red-500" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
