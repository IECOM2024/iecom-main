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
              status: RegistrationStatus.FORM_FILLING,
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
            status: RegistrationStatus.FORM_FILLING,
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

  adminGetessayRegistDataList: adminProcedure
    .input(
      z.object({
        currentPage: z.number(),
        limitPerPage: z.number(),
        filterBy: z.string().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const currentPage = input.currentPage;
      const limitPerPage = input.limitPerPage;
      const offset = (currentPage - 1) * limitPerPage;

      const essayRegistDataList =
        await ctx.prisma.essayCompetitionRegistrationData.findMany({
          where: {
            name: {
              contains:
                input.filterBy === "name" ? input.searchQuery : undefined,
              mode: "insensitive",
              not: null,
            },
            email: {
              contains:
                input.filterBy === "email" ? input.searchQuery : undefined,
              mode: "insensitive",
            },
            phoneNumber: {
              contains:
                input.filterBy === "phoneNumber"
                  ? input.searchQuery
                  : undefined,
              mode: "insensitive",
            },
            institution: {
              contains:
                input.filterBy === "institution"
                  ? input.searchQuery
                  : undefined,
              mode: "insensitive",
            },
          },
          skip: offset,
          take: limitPerPage,
        });

      const essayRegistDataCount =
        await ctx.prisma.essayCompetitionRegistrationData.count({
          where: {
            name: {
              contains:
                input.filterBy === "name" ? input.searchQuery : undefined,
              mode: "insensitive",
            },
            email: {
              contains:
                input.filterBy === "email" ? input.searchQuery : undefined,
              mode: "insensitive",
            },
            phoneNumber: {
              contains:
                input.filterBy === "phoneNumber"
                  ? input.searchQuery
                  : undefined,
              mode: "insensitive",
            },
            institution: {
              contains:
                input.filterBy === "institution"
                  ? input.searchQuery
                  : undefined,
              mode: "insensitive",
            },
          },
        });

      return {
        data: essayRegistDataList,
        metadata: {
          currentPage: currentPage,
          limitPerPage: limitPerPage,
          total: essayRegistDataCount,
        },
      };
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
        status: z.union([
          z.literal(RegistrationStatus.UNREGISTERED),
          z.literal(RegistrationStatus.SUBMITTED_UNCONFIRMED),
          z.literal(RegistrationStatus.SUBMITTED_CONFIRMED),
          z.literal(RegistrationStatus.FORM_FILLING),
        ]),
        whereDidYouKnowThisCompetitionInformation: z.string().optional(),
        isFilePaymentUploaded: z.boolean().optional(),
        messageFromAdmin: z.string().optional(),
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
            status: input.status,
            whereDidYouKnowThisCompetitionInformation:
              input.whereDidYouKnowThisCompetitionInformation,
            isFilePaymentUploaded: input.isFilePaymentUploaded,
            messageFromAdmin: input.messageFromAdmin,
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
