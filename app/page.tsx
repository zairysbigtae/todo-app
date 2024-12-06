import Link from "next/link";
import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

function getTodos() {
  return prisma.todo.findMany()
}

async function deleteTodos() {
  "use server";
  await prisma.todo.deleteMany({});
  redirect("/");
}

async function deleteCompleted() {
  "use server";
  await prisma.todo.deleteMany({
    where: {
      complete: true
    }
  });
  redirect("/");
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({
    where: { id },
    data: { complete }
  })
}

export default async function Home() {
  // await prisma.todo.create({data: { title: "testaa", complete: false }})
  const todos = await getTodos();

  return (
  <>
    <header className="flex flex-col sm:flex-row justify-between mb-4 items-center">
      <h1 className="text-2xl">Todos</h1>
      <div className="flex gap-1">
        <Link 
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new">New</Link>

        <form action={deleteTodos}>
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >Delete All</button>
        </form>


        <form action={deleteCompleted}>
          <button
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >Delete Checked</button>
        </form>
      </div>
    </header>
    <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        ))}
    </ul>
  </>
  );
}
