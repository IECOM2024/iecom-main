import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
  })).mutation(async ({input}) => {
    
    // TODO: Kasih reCHAPTCHA
    const {email, password, name} = input;

    if (!name) throw new TRPCError({code: "BAD_REQUEST", message:"Name is required"});
    if (!email) throw new TRPCError({code: "BAD_REQUEST", message:"Email is required"});
    if (!password) throw new TRPCError({code: "BAD_REQUEST",message:"Password is required"});

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user) throw new TRPCError({code: "BAD_REQUEST", message:"Email already exist"});

    const hashPassword = await bcrypt.hash(password,8) 

    await prisma.user.create({
        data: {
            email,
            hashPassword,
        }
    })
  })
});
