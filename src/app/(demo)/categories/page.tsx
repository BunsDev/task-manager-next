'use client'

import Link from "next/link";
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
import { CategoryProvider } from "@/providers/category-context";
import { ProjectProvider } from "@/providers/project-context";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const { status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Client-side authentication check
    if (status === "unauthenticated") {
      router.push("/login");
    }
    
    // Client-side data fetching replacement
    async function fetchData() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
            <AddCategory categories={categories}/>
          </div>
          <AllCategory />
        </ContentLayout>
      </ProjectProvider>
    </CategoryProvider>
  );
}
