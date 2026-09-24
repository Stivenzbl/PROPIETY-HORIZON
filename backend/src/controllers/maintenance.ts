import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['warning', 'error'] });

export async function list() {
  return prisma.maintenanceRequest.findMany({
    include: {
      requester: true,
      technician: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getById(id: string) {
  return prisma.maintenanceRequest.findUnique({
    where: { id },
    include: {
      requester: true,
      technician: true,
    },
  });
}

export async function create(data: any) {
  return prisma.maintenanceRequest.create({
    data,
  });
}

export async function updateStatus(id: string, status: string) {
  return prisma.maintenanceRequest.update({
    where: { id },
    data: { status },
  });
}