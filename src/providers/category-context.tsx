"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "./project-context";

// Define the Category type based on your schema
export interface Category {
  id: string;
  name: string;
  projects: Project[];
}

// Define the CategoryContextType
interface CategoryContextType {
  categories: Category[];
  setCategories: (categories: Category[] | ((prevCategories: Category[]) => Category[])) => void;
}

// Create the CategoryContext with an empty array for categories
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Create the CategoryProvider component
const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]); // Blank state

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Create the useCategory hook to access the CategoryContext
const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export { CategoryProvider, useCategory };
