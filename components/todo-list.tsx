'use client'

import { TodoCard } from '@/components/todo-card'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Todo {
  id: string
  title: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.id) {
      fetchTodos()
    }
  }, [session])

  const fetchTodos = async () => {
    const response = await fetch('/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  const handleToggle = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todos.find(todo => todo.id === id)?.completed })
    })
    if (response.ok) {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    if (response.ok) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}