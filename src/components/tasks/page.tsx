import { DataTable } from "./components/data-table"
import { Card, CardContent } from "../ui/card"
import { AddTask } from "../placeholder-content/tasks/AddTask"
import { fetchTasks } from "@/actions/fetch-tasks"
import { columns } from "./components/columns"

export default async function TaskPage({ currentProjectId }: { currentProjectId: string }) {
  const tasks = await fetchTasks(currentProjectId)

  if (!tasks || tasks.length === 0) {
    return (
      <CardContent className="p-6">
        <Card className="rounded-lg border-none mt-6">
          <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">No tasks available for this project.</p>
            </div>
          </div>
        </Card>
      </CardContent>
    )
  }

  return (
    <CardContent className="p-6">
      <Card className="rounded-lg border-none mt-6">
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here's a list of your tasks for this month!
              </p>
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