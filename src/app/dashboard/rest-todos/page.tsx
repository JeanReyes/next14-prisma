import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO title'
}

export default async function HomeRestTodo() {

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}})

  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo/>
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}