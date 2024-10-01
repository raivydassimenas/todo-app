import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    select: { id: true, title: true, completed: true }
  })

  res.status(200).json(todos)
}