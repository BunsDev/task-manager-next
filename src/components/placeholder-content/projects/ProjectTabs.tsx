import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AllProjects from "./AllProjects"
import TeamProjects from "./TeamProject"
import { fetchTeamProject } from "@/actions/fetch-team-projects"
import { Card, CardContent } from "@/components/ui/card"

const ProjectTabs = async () => {
    const teamProjects = await fetchTeamProject()
    return (
        <Tabs defaultValue="userProject" className="mt-5">
            <TabsList>
                <TabsTrigger value="userProject">Your Project</TabsTrigger>
                <TabsTrigger value="team">Team Project</TabsTrigger>
            </TabsList>
            <TabsContent value="userProject">
                <AllProjects />
            </TabsContent>
            <TabsContent value="team">
                {teamProjects.length > 0 ? (
                    <TeamProjects project={teamProjects[0].project} />
                ) : (
                    <Card className="rounded-lg border-none mt-6">
                        <CardContent className="p-6">
                            No Team Project Available
                        </CardContent>
                    </Card>
                )}
            </TabsContent>
        </Tabs>
    )
}

export default ProjectTabs
