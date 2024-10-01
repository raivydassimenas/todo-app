import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  if (req.method === 'PATCH') {
    const { completed } = req.body
    const todo = await prisma.todo.update({
      where: { id: String(id) },
      data: { completed }
    })
    res.status(200).json(todo)
  } else if (req.method === 'DELETE') {
    await prisma.todo.delete({ where: { id: String(id) } })
    res.status(204).end()
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}