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

export const caseRegistRouter = createTRPCRouter({
  participantGetCaseRegistData: participantProcedure.query(async ({ ctx }) => {
    const savedCaseRegistData =
      await ctx.prisma.mainCompetitionRegistrationData.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

    if (!savedCaseRegistData) {
      const newCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.create({
          data: { userId: ctx.session.user.id },
        });

      return newCaseRegistData;
    }

    return savedCaseRegistData;
  }),

  participantSaveCaseRegistData: participantProcedure
    .input(
      z.object({
        teamName: z.string().optional(),
        leaderName: z.string().optional(),
        leaderEmail: z.string().optional(),
        leaderPhoneNumber: z.string().optional(),
        leaderInstitution: z.string().optional(),
        leaderMajor: z.string().optional(),
        leaderBatch: z.string().optional(),
        member1Name: z.string().optional(),
        member1Email: z.string().optional(),
        member1PhoneNumber: z.string().optional(),
        member1Institution: z.string().optional(),
        member1Major: z.string().optional(),
        member1Batch: z.string().optional(),
        member2Name: z.string().optional(),
        member2Email: z.string().optional(),
        member2PhoneNumber: z.string().optional(),
        member2Institution: z.string().optional(),
        member2Major: z.string().optional(),
        member2Batch: z.string().optional(),
        whereDidYouKnowThisCompetitionInformation: z.string().optional(),
        isFilePaymentUploaded: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const savedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (savedCaseRegistData) {
        const updatedCaseRegistData =
          await ctx.prisma.mainCompetitionRegistrationData.update({
            where: {
              id: savedCaseRegistData.id,
            },
            data: {
              teamName: input.teamName,
              leaderName: input.leaderName,
              leaderEmail: input.leaderEmail,
              leaderPhoneNumber: input.leaderPhoneNumber,
              leaderInstitution: input.leaderInstitution,
              leaderMajor: input.leaderMajor,
              leaderBatch: input.leaderBatch,
              member1Name: input.member1Name,
              member1Email: input.member1Email,
              member1PhoneNumber: input.member1PhoneNumber,
              member1Institution: input.member1Institution,
              member1Major: input.member1Major,
              member1Batch: input.member1Batch,
              member2Name: input.member2Name,
              member2Email: input.member2Email,
              member2PhoneNumber: input.member2PhoneNumber,
              member2Institution: input.member2Institution,
              member2Major: input.member2Major,
              member2Batch: input.member2Batch,
              whereDidYouKnowThisCompetitionInformation:
                input.whereDidYouKnowThisCompetitionInformation,
              isFilePaymentUploaded: input.isFilePaymentUploaded,
            },
          });

        return updatedCaseRegistData;
      }

      const newCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.create({
          data: {
            userId: ctx.session.user.id,
            teamName: input.teamName,
            leaderName: input.leaderName,
            leaderEmail: input.leaderEmail,
            leaderPhoneNumber: input.leaderPhoneNumber,
            leaderInstitution: input.leaderInstitution,
            leaderMajor: input.leaderMajor,
            leaderBatch: input.leaderBatch,
            member1Name: input.member1Name,
            member1Email: input.member1Email,
            member1PhoneNumber: input.member1PhoneNumber,
            member1Institution: input.member1Institution,
            member1Major: input.member1Major,
            member1Batch: input.member1Batch,
            member2Name: input.member2Name,
            member2Email: input.member2Email,
            member2PhoneNumber: input.member2PhoneNumber,
            member2Institution: input.member2Institution,
            member2Major: input.member2Major,
            member2Batch: input.member2Batch,
            whereDidYouKnowThisCompetitionInformation:
              input.whereDidYouKnowThisCompetitionInformation,
          },
        });

      return newCaseRegistData;
    }),

  /**
   * Submit case regist data, buat FE, gabung sama saveCaseRegistData ya, proc ini gapunya input
   *
   */
  participantSubmitCaseRegistData: participantProcedure.mutation(
    async ({ ctx }) => {
      const savedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (!savedCaseRegistData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong, please contact support.",
        });
      }

      const updatedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.update({
          where: {
            id: savedCaseRegistData.id,
          },
          data: {
            status: RegistrationStatus.SUBMITTED_UNCONFIRMED,
          },
        });

      return updatedCaseRegistData;
    }
  ),

  participantDeleteCaseRegistData: participantProcedure.mutation(
    async ({ ctx }) => {
      const savedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (!savedCaseRegistData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong, please contact support.",
        });
      }

      const deletedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.update({
          where: {
            id: savedCaseRegistData.id,
          },
          data: {
            status: RegistrationStatus.UNREGISTERED,
            teamName: null,
            leaderName: null,
            leaderEmail: null,
            leaderPhoneNumber: null,
            leaderInstitution: null,
            leaderMajor: null,
            leaderBatch: null,
            member1Name: null,
            member1Email: null,
            member1PhoneNumber: null,
            member1Institution: null,
            member1Major: null,
            member1Batch: null,
            member2Name: null,
            member2Email: null,
            member2PhoneNumber: null,
            member2Institution: null,
            member2Major: null,
            member2Batch: null,
            whereDidYouKnowThisCompetitionInformation: null,
          },
        });

      return deletedCaseRegistData;
    }
  ),

  adminGetCaseRegistDataList: adminProcedure.query(async ({ ctx }) => {
    const CaseRegistDataList =
      await ctx.prisma.mainCompetitionRegistrationData.findMany();

    return CaseRegistDataList;
  }),

  adminUpdateCaseRegistData: adminProcedure
    .input(
      z.object({
        id: z.string().optional(),
        teamName: z.string().optional(),
        leaderName: z.string().optional(),
        leaderEmail: z.string().optional(),
        leaderPhoneNumber: z.string().optional(),
        leaderInstitution: z.string().optional(),
        leaderMajor: z.string().optional(),
        leaderBatch: z.string().optional(),
        member1Name: z.string().optional(),
        member1Email: z.string().optional(),
        member1PhoneNumber: z.string().optional(),
        member1Institution: z.string().optional(),
        member1Major: z.string().optional(),
        member1Batch: z.string().optional(),
        member2Name: z.string().optional(),
        member2Email: z.string().optional(),
        member2PhoneNumber: z.string().optional(),
        member2Institution: z.string().optional(),
        member2Major: z.string().optional(),
        member2Batch: z.string().optional(),
        whereDidYouKnowThisCompetitionInformation: z.string().optional(),
        isFilePaymentUploaded: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.update({
          where: {
            id: input.id,
          },
          data: {
            teamName: input.teamName,
            leaderName: input.leaderName,
            leaderEmail: input.leaderEmail,
            leaderPhoneNumber: input.leaderPhoneNumber,
            leaderInstitution: input.leaderInstitution,
            leaderMajor: input.leaderMajor,
            leaderBatch: input.leaderBatch,
            member1Name: input.member1Name,
            member1Email: input.member1Email,
            member1PhoneNumber: input.member1PhoneNumber,
            member1Institution: input.member1Institution,
            member1Major: input.member1Major,
            member1Batch: input.member1Batch,
            member2Name: input.member2Name,
            member2Email: input.member2Email,
            member2PhoneNumber: input.member2PhoneNumber,
            member2Institution: input.member2Institution,
            member2Major: input.member2Major,
            member2Batch: input.member2Batch,
            whereDidYouKnowThisCompetitionInformation:
              input.whereDidYouKnowThisCompetitionInformation,
          },
        });

      return updatedCaseRegistData;
    }),

  adminDeleteCaseRegistData: adminProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.update({
          where: {
            id: input.id,
          },
          data: {
            status: RegistrationStatus.UNREGISTERED,
            teamName: null,
            leaderName: null,
            leaderEmail: null,
            leaderPhoneNumber: null,
            leaderInstitution: null,
            leaderMajor: null,
            leaderBatch: null,
            member1Name: null,
            member1Email: null,
            member1PhoneNumber: null,
            member1Institution: null,
            member1Major: null,
            member1Batch: null,
            member2Name: null,
            member2Email: null,
            member2PhoneNumber: null,
            member2Institution: null,
            member2Major: null,
            member2Batch: null,
            whereDidYouKnowThisCompetitionInformation: null,
          },
        });

      return deletedCaseRegistData;
    }),
});
