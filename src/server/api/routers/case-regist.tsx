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
          data: {
            userId: ctx.session.user.id,
            status: RegistrationStatus.FORM_FILLING,
          },
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
        leaderPostLink: z.string().optional(),
        member1PostLink: z.string().optional(),
        member2PostLink: z.string().optional(),
        leaderTwibbonLink: z.string().optional(),
        member1TwibbonLink: z.string().optional(),
        member2TwibbonLink: z.string().optional(),
        status: z
          .union([
            z.literal(RegistrationStatus.UNREGISTERED),
            z.literal(RegistrationStatus.SUBMITTED_UNCONFIRMED),
            z.literal(RegistrationStatus.SUBMITTED_CONFIRMED),
            z.literal(RegistrationStatus.FORM_FILLING),
          ])
          .optional(),
        fileUploadLink: z.string().optional(),
        isUsingReferral: z.boolean().optional(),
        referralCode: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sanitizedRefferalCode = input.referralCode?.trim().toUpperCase();

      const savedCaseRegistData =
        await ctx.prisma.mainCompetitionRegistrationData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

        console.log(input.isUsingReferral)

      if (savedCaseRegistData) {
        // logic to manage refferal usage
        if (input.isUsingReferral) {
          console.log(sanitizedRefferalCode)
          const refferalData = await ctx.prisma.referral.findFirst({
            where: {
              id: sanitizedRefferalCode ?? "",
            },
          });
          if (!refferalData) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Referral code not found.",
            });
          }

          if (
            savedCaseRegistData.isUsingReferral &&
            savedCaseRegistData.referralId !== sanitizedRefferalCode
          ) {
            const decrementedRefferalData = await ctx.prisma.referral.update({
              where: {
                id: savedCaseRegistData.referralId!,
              },
              data: {
                currentUsed: refferalData.currentUsed - 1,
              },
            });

            const incrementedRefferalData = await ctx.prisma.referral.update({
              where: {
                id: sanitizedRefferalCode,
              },
              data: {
                currentUsed: refferalData.currentUsed + 1,
              },
            });
          } else if (!savedCaseRegistData.isUsingReferral) {
            if (refferalData.currentUsed >= refferalData.maxUsed) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: "Referral code has been exhausted.",
              });
            }
            const newRefferalData = await ctx.prisma.referral.update({
              where: {
                id: sanitizedRefferalCode,
              },
              data: {
                currentUsed: refferalData.currentUsed + 1,
              },
            });
          }
        } else {
          if (savedCaseRegistData.isUsingReferral) {
            const refferalData = await ctx.prisma.referral.findFirst({
              where: {
                id: savedCaseRegistData.referralId ?? "",
              },
            });

            if (!refferalData) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: "Referral code not found.",
              });
            }
            const decrementedRefferalData = await ctx.prisma.referral.update({
              where: {
                id: savedCaseRegistData.referralId!,
              },
              data: {
                currentUsed: refferalData.currentUsed - 1,
              },
            });
          }
        }

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
              leaderPostLink: input.leaderPostLink,
              member1PostLink: input.member1PostLink,
              member2PostLink: input.member2PostLink,
              leaderTwibbonLink: input.leaderTwibbonLink,
              member1TwibbonLink: input.member1TwibbonLink,
              member2TwibbonLink: input.member2TwibbonLink,
              status: input.status,
              fileUploadLink: input.fileUploadLink,
              isUsingReferral: input.isUsingReferral,
              referralId: input.isUsingReferral ? sanitizedRefferalCode : undefined,
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
            isFilePaymentUploaded: input.isFilePaymentUploaded,
            leaderPostLink: input.leaderPostLink,
            member1PostLink: input.member1PostLink,
            member2PostLink: input.member2PostLink,
            leaderTwibbonLink: input.leaderTwibbonLink,
            member1TwibbonLink: input.member1TwibbonLink,
            member2TwibbonLink: input.member2TwibbonLink,
            status: input.status,
            fileUploadLink: input.fileUploadLink,
            isUsingReferral: input.isUsingReferral,
            referralId: input.isUsingReferral ? sanitizedRefferalCode : undefined,
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
            lastSubmissionTime: new Date(),
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

  participantCheckRefferalCode: participantProcedure
    .input(
      z.object({
        refferalCode: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sanitizedRefferalCode = input.refferalCode.trim().toUpperCase();

      const refferalData = await ctx.prisma.referral.findFirst({
        where: {
          id: sanitizedRefferalCode ?? "",
        },
      });

      if (!refferalData) {
        return "Referral code not found.";
      }

      if (refferalData.currentUsed >= refferalData.maxUsed) {
        return "Referral code has been exhausted.";
      }

      return "Referral code available";
    }),

  adminGetCaseRegistDataList: adminProcedure
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
      const CaseRegistDataList =
        await ctx.prisma.mainCompetitionRegistrationData.findMany({
          where: {
            teamName: {
              contains:
                input.filterBy === "teamName" ? input.searchQuery : undefined,
              mode: "insensitive",
              not: null,
            },
          },
          skip: offset,
          take: limitPerPage,
        });

      return {
        data: CaseRegistDataList,
        metadata: {
          currentPage: currentPage,
          limitPerPage: limitPerPage,
          total: CaseRegistDataList.length,
        },
      };
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
        messageFromAdmin: z.string().optional(),
        leaderPostLink: z.string().optional(),
        member1PostLink: z.string().optional(),
        member2PostLink: z.string().optional(),
        leaderTwibbonLink: z.string().optional(),
        member1TwibbonLink: z.string().optional(),
        member2TwibbonLink: z.string().optional(),
        status: z
          .union([
            z.literal(RegistrationStatus.UNREGISTERED),
            z.literal(RegistrationStatus.SUBMITTED_UNCONFIRMED),
            z.literal(RegistrationStatus.SUBMITTED_CONFIRMED),
            z.literal(RegistrationStatus.FORM_FILLING),
          ])
          .optional(),
        fileUploadLink: z.string().optional(),
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
            isFilePaymentUploaded: input.isFilePaymentUploaded,
            messageFromAdmin: input.messageFromAdmin,
            leaderPostLink: input.leaderPostLink,
            member1PostLink: input.member1PostLink,
            member2PostLink: input.member2PostLink,
            leaderTwibbonLink: input.leaderTwibbonLink,
            member1TwibbonLink: input.member1TwibbonLink,
            member2TwibbonLink: input.member2TwibbonLink,
            status: input.status,
            fileUploadLink: input.fileUploadLink,
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
            leaderPostLink: null,
            member1PostLink: null,
            member2PostLink: null,
            leaderTwibbonLink: null,
            member1TwibbonLink: null,
            member2TwibbonLink: null,
          },
        });

      return deletedCaseRegistData;
    }),
});
