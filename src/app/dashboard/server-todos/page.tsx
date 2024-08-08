export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
  title: "Server action de Todos",
  description: "SEO title",
};

export default async function ServerTodoPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  console.log('contruido');
  
 
  return (
    <div>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
