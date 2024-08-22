"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TeamActionDropDown from "./ActionDropDown";
import { Role } from "@prisma/client";


type TeamMember = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
  };
  project: {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
  };
  id: string;
  userId: string;
  projectId: string;
  role: Role;
  createdBy: string;
};
const AllTeam = ({ team }: { team: TeamMember[]}) => {
  return (
    <Card className="rounded-lg border-none relative mt-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          {team.map((teamMember) => (
            <Card key={teamMember.id} className="h-fit w-full relative">
              <TeamActionDropDown teamMemberId={teamMember.id} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage
                        src={teamMember.user.image || ""}
                        alt={teamMember.user.name || "" }
                      />
                      <AvatarFallback>
                        {teamMember.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {teamMember.user.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Project: {teamMember.project.name}</p>
                <p>Role: {teamMember.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllTeam;