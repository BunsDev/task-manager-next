import Link from "next/link";
import { fetchCategory } from "@/actions/fetch-category";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AddCategory } from "@/components/placeholder-content/category/AddCategory";
import AllCategory from "@/components/placeholder-content/category/AllCategory";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Category, CategoryProvider } from "@/providers/category-context";
import { ProjectProvider } from "@/providers/project-context";


export default async function CategoriesPage() {
  const data= await fetchCategory()
  console.log(data)
  return (
    <CategoryProvider>
      <ProjectProvider>
        <ContentLayout title="Categories">
          <div className=" flex justify-between items-center">
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
                  <BreadcrumbPage>Categories</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <AddCategory categoreis={data}/>
          </div>
          <AllCategory  />
        </ContentLayout>
      </ProjectProvider>
    </CategoryProvider>
  );
}
