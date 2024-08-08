'use client'

import { startTransition, useOptimistic } from 'react'
import { Todo } from '@prisma/client'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete:boolean) => Promise<Todo|void> 
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [todoOptimisctic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => {
      return {
        ...state,
        complete: newCompleteValue
      }
    }
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimisctic.complete));
      await toggleTodo(todoOptimisctic.id, !todoOptimisctic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimisctic.complete));
    }
  }

  return (
    <div
      className={
        todoOptimisctic?.complete ? styles.todoDone : styles.todoPending
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={() =>
          //   toggleTodo(todoOptimisctic.id, !todoOptimisctic.complete)
          // }
          onClick={onToggleTodo}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover: bg-opacity-60
          bg-blue-100  
          ${todo?.complete ? "bg-blue-50" : "bg-red-50"}
        `}
        >
          {todoOptimisctic?.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
          <div className="text-center sm:text-left">
            {todoOptimisctic?.description}
          </div>
        </div>
      </div>
    </div>
  );
};
