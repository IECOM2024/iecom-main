import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Session } from "next-auth";

export const checkRefferal = async (ctx: {
    session: Session | null;
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}, refferalId: string) => {
    const availableRefferal = await ctx.prisma.referral.findUnique({
        where: {
            id: refferalId
        }
    })

    if (!availableRefferal) {
        return null
    }

    if (availableRefferal.currentUsed >= availableRefferal.maxUsed) {
        return null
    }

    return availableRefferal
}