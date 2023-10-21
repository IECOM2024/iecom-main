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

export const essayRegistRouter = createTRPCRouter({
  participantGetEssayRegistData: participantProcedure.query(async ({ ctx }) => {
    const savedEssayRegistData =
      await ctx.prisma.essayCompetitionRegistrationData.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

    if (!savedEssayRegistData) {
      const newEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.create({
          data: { userId: ctx.session.user.id },
        });

      return newEssayRegistData;
    }

    return savedEssayRegistData;
  }),

  participantSaveEssayRegistData: participantProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        institution: z.string().optional(),
        major: z.string().optional(),
        batch: z.string().optional(),
        whereDidYouKnowThisCompetitionInformation: z.string().optional(),
        postLink: z.string().optional(),
        twibbonLink: z.string().optional(),
        isFilePaymentUploaded: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const savedEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (savedEssayRegistData) {
        const updatedEssayRegistData =
          await ctx.prisma.essayCompetitionRegistrationData.update({
            where: {
              id: savedEssayRegistData.id,
            },
            data: {
              userId: ctx.session.user.id,
              name: input.name,
              email: input.email,
              phoneNumber: input.phoneNumber,
              institution: input.institution,
              major: input.major,
              batch: input.batch,
              whereDidYouKnowThisCompetitionInformation:
                input.whereDidYouKnowThisCompetitionInformation,
              postLink: input.postLink,
              twibbonLink: input.twibbonLink,
              isFilePaymentUploaded: input.isFilePaymentUploaded,
            },
          });

        return updatedEssayRegistData;
      }

      const newEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.create({
          data: {
            userId: ctx.session.user.id,
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            institution: input.institution,
            major: input.major,
            batch: input.batch,
            postLink: input.postLink,
            twibbonLink: input.twibbonLink,
            whereDidYouKnowThisCompetitionInformation:
              input.whereDidYouKnowThisCompetitionInformation,
          },
        });

      return newEssayRegistData;
    }),

  /**
   * Submit case regist data, buat FE, gabung sama saveessayRegistData ya, proc ini gapunya input
   *
   */
  participantSubmitEssayRegistData: participantProcedure.mutation(
    async ({ ctx }) => {
      const savedEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (!savedEssayRegistData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong, please contact support.",
        });
      }

      const updatedEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.update({
          where: {
            id: savedEssayRegistData.id,
          },
          data: {
            status: RegistrationStatus.SUBMITTED_UNCONFIRMED,
          },
        });

      return updatedEssayRegistData;
    }
  ),

  participantDeleteEssayRegistData: participantProcedure.mutation(
    async ({ ctx }) => {
      const savedEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (!savedEssayRegistData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong, please contact support.",
        });
      }

      const deletedessayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.update({
          where: {
            id: savedEssayRegistData.id,
          },
          data: {
            status: RegistrationStatus.UNREGISTERED,
            name: null,
            email: null,
            phoneNumber: null,
            institution: null,
            major: null,
            batch: null,
            postLink: null,
            twibbonLink: null,
            whereDidYouKnowThisCompetitionInformation: null,
          },
        });

      return deletedessayRegistData;
    }
  ),

  adminGetessayRegistDataList: adminProcedure.query(async ({ ctx }) => {
    const essayRegistDataList =
      await ctx.prisma.essayCompetitionRegistrationData.findMany();

    return essayRegistDataList;
  }),

  adminUpdateEssayRegistData: adminProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        institution: z.string().optional(),
        major: z.string().optional(),
        batch: z.string().optional(),
        postLink: z.string().optional(),
        twibbonLink: z.string().optional(),
        whereDidYouKnowThisCompetitionInformation: z.string().optional(),
        isFilePaymentUploaded: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            institution: input.institution,
            major: input.major,
            batch: input.batch,
            postLink: input.postLink,
            twibbonLink: input.twibbonLink,
            whereDidYouKnowThisCompetitionInformation:
              input.whereDidYouKnowThisCompetitionInformation,
          },
        });

      return updatedEssayRegistData;
    }),

  adminDeleteEssayRegistData: adminProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedEssayRegistData =
        await ctx.prisma.essayCompetitionRegistrationData.update({
          where: {
            id: input.id,
          },
          data: {
            status: RegistrationStatus.UNREGISTERED,
            teamName: null,
            name: null,
            email: null,
            phoneNumber: null,
            institution: null,
            major: null,
            batch: null,
            postLink: null,
            twibbonLink: null,
            whereDidYouKnowThisCompetitionInformation: null,
          },
        });

      return deletedEssayRegistData;
    }),
});
