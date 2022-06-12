import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if (req.method === 'POST') {
    const { name, order, total, date } = req.body
    await prisma.order.create({
      data: {
        name: name,
        order: order,
        total: total,
        date: date
      } 
    })

    res.json('saved')
  }
}
