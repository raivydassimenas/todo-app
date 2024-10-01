"use client";

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"

interface TodoCardProps {
  id: string
  title: string
  completed: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoCard({ id, title, completed, onToggle, onDelete }: TodoCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Checkbox
          id={`todo-${id}`}
          checked={completed}
          onCheckedChange={() => onToggle(id)}
        />
        <label
          htmlFor={`todo-${id}`}
          className={`flex-grow text-lg font-medium ${completed ? 'line-through text-gray-500' : ''}`}
        >
          {title}
        </label>
      </CardHeader>
      <CardContent>
        {/* Add additional content here if needed */}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
