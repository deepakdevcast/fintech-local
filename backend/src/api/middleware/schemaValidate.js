import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerBodySchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(16),
})

export const transactionBodySchema = z.object({
  receiver_id: z.string(),
  sender_id: z.string(),
  amount: z.number().min(1),
})
