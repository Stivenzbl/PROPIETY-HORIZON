import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['warning', 'error'] });

export async function list(buildingId?: string, departmentId?: string) {
  const where = buildingId || departmentId
    ? {
        ...(buildingId && { buildingId }),
        ...(departmentId && { departmentId }),
      }
    : {};

  return prisma.payment.findMany({
    where,
    orderBy: { paymentDate: 'desc' },
  });
}

export async function getById(id: string) {
  return prisma.payment.findUnique({
    where: { id },
  });
}

export async function create(data: any) {
  return prisma.payment.create({
    data,
  });
}

export async function updateStatus(id: string, status: string) {
  return prisma.payment.update({
    where: { id },
    data: { status },
  });
}