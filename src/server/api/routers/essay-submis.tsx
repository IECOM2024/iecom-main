import { RegistrationStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  participantProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const essaySubmisRouter = createTRPCRouter({
  participantGetSubmissionData: participantProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) throw new TRPCError({ code: "UNAUTHORIZED" });

    const essaySubmission = await ctx.prisma.essaySubmission.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        user: true,
        essayCompetitionRegistrationData: true,
      },
    });

    if (essaySubmission) {
      return essaySubmission;
    }

    const essayRegistrationData =
      await ctx.prisma.essayCompetitionRegistrationData.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

    if (!essayRegistrationData)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Sorry, you haven't registered for this competition",
      });
    if (essayRegistrationData.status !== RegistrationStatus.SUBMITTED_CONFIRMED)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Sorry, your registration hasn't been confirmed yet",
      });

    const newEssaySubmission = await ctx.prisma.essaySubmission.create({
      data: {
        userId: ctx.session.user.id,
        essayCompetitionRegistrationDataId: essayRegistrationData.id,
      },
      include: {
        user: true,
        essayCompetitionRegistrationData: true,
      },
    });

    return newEssaySubmission;
  }),

  participantUpdateSubmissionData: participantProcedure
    .input(
      z.object({
        id: z.string(),
        fileUploadLink: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const essaySubmission = await ctx.prisma.essaySubmission.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!essaySubmission)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Sorry, you haven't registered for this competition",
        });

      const updatedEssaySubmission = await ctx.prisma.essaySubmission.update({
        where: {
          id: essaySubmission.id,
        },
        data: {
          essaySubmissionLink: input.fileUploadLink,
          lastSubmissionTime: new Date(),
        },
      });

      return updatedEssaySubmission;
    }),

  adminGetAllSubmissions: adminProcedure
    .input(
      z.object({
        page: z.number().optional(),
        rowPerPage: z.number().optional(),
        filterBy: z.string().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const offset =
        input.page && input.rowPerPage
          ? (input.page - 1) * input.rowPerPage
          : 0;

      const essaySubmissions = await ctx.prisma.essaySubmission.findMany({
        include: {
          user: true,
          essayCompetitionRegistrationData: true,
        },
        where: {
          essayCompetitionRegistrationData: {
            user: {
              name: {
                contains: input.filterBy === "name" ? input.searchQuery : "",
                mode: "insensitive",
              },
            },
          },
        },
        skip: offset,
        take: input.rowPerPage,
      });

      const essaySubmissionCount = await ctx.prisma.essaySubmission.count();

      return {
        data: essaySubmissions,
        metadata: {
          total: essaySubmissionCount,
        },
      };
    }),
});
