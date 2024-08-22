import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AllProjects from "./AllProjects"
import TeamProjects from "./TeamProject"
import { fetchTeamProject } from "@/actions/fetch-team-projects"

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
                <TeamProjects project={teamProjects[0].project} />
            </TabsContent>
        </Tabs>
    )
}

export default ProjectTabs
