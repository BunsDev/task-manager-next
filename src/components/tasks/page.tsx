import { DataTable } from "./components/data-table"
import { Card, CardContent } from "../ui/card"
import { AddTask } from "../placeholder-content/tasks/AddTask"
import { fetchTasks } from "@/actions/fetch-tasks"
import { columns } from "./components/columns"
import { fetchProjectName, getProjectProgress } from "@/actions/fetch-projects"

export default async function TaskPage({ currentProjectId }: { currentProjectId: string }) {
  const tasks = await fetchTasks(currentProjectId)
  const projectName = await fetchProjectName(currentProjectId)
  const tasksProgress = await getProjectProgress(currentProjectId)


  if (!tasks || tasks.length === 0) {
    return (
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="h-full  flex-1 justify-between items-center space-y-8 p-4 flex">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{projectName}</h2>
              <p className="text-muted-foreground">No tasks available for this project.</p>
            </div>
            <div style={{ marginTop: "0" }}>
              <AddTask projectId={currentProjectId} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <CardContent className="p-6">
      <Card className="rounded-lg border-none mt-6">
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{projectName}</h2>
              <div className="text-muted-foreground flex gap-4 mt-3">
                Tasks:
                <div className="flex text-gray-500">
                  <p>{tasksProgress.completed}</p>/
                  <p>{tasksProgress.total}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AddTask projectId={currentProjectId} />
            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Card>
    </CardContent>
  )
}