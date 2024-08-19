import path from "path"
import { z } from "zod"
import { promises as fs } from "fs"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { Card, CardContent } from "../ui/card"
import { taskSchema } from "./data/schema"
import { AddTask } from "../placeholder-content/tasks/AddTask"
import { fetchTasks } from "@/actions/fetch-tasks"



// // Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "src/components/tasks/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

export default async function TaskPage({ currentProjectId }: { currentProjectId: string }) {
  const tasks = await fetchTasks(currentProjectId)
  console.log(tasks)
  return (
    <CardContent className="p-6">
      <Card className=" rounded-lg border-none mt-6">
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <AddTask projectId={currentProjectId} />
            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
    </CardContent>
    </Card >
  )
}
