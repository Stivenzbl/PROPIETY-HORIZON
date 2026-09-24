import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['warning', 'error'] });

export async function list() {
  return prisma.property.findMany({
    include: {
      unit: true,
      department: true,
    },
  });
}

export async function getById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      unit: true,
      department: true,
    },
  });
}

export async function create(data: any) {
  return prisma.property.create({
    data,
  });
}