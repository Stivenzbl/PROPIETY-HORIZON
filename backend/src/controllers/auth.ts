import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['warning', 'error'] });

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

export async function register({ name, email, password }: { name: string; email: string; password: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password, // In production, hash the password
      role: 'RESIDENT',
      isActive: true,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (user.password !== password) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('Account is disabled');
  }

  // Generate JWT token (placeholder)
  const token = `jwt-${user.id}-${Date.now()}`;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}