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

export const colorRunRouter = createTRPCRouter({
  participantGetColorRunTicket: participantProcedure.query(async ({ ctx }) => {
    const savedColorRunTicket =
      await ctx.prisma.colorRunParticipantData.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

    if (!savedColorRunTicket) {
      const newColorRunTicket = await ctx.prisma.colorRunParticipantData.create(
        { data: { userId: ctx.session.user.id } }
      );

      return newColorRunTicket;
    }

    return savedColorRunTicket;
  }),

  participantSaveColorRunTicket: participantProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
        institution: z.string().optional(),
        bloodType: z.string().optional(),
        healthHistory: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactRelationship: z.string().optional(),
        isFilePaymentUploaded: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const savedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (savedColorRunTicket) {
        const updatedColorRunTicket =
          await ctx.prisma.colorRunParticipantData.update({
            where: {
              id: savedColorRunTicket.id,
            },
            data: {
              name: input.name,
              email: input.email,
              phoneNumber: input.phoneNumber,
              address: input.address,
              institution: input.institution,
              bloodType: input.bloodType,
              healthHistory: input.healthHistory,
              emergencyContactNumber: input.emergencyContactNumber,
              emergencyContactName: input.emergencyContactName,
              emergencyContactRelationship: input.emergencyContactRelationship,
              isFilePaymemtUploaded: input.isFilePaymentUploaded,
              
            },
          });

        return updatedColorRunTicket;
      }

      const newColorRunTicket = await ctx.prisma.colorRunParticipantData.create(
        {
          data: {
            userId: ctx.session.user.id,
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            address: input.address,
            institution: input.institution,
            bloodType: input.bloodType,
            healthHistory: input.healthHistory,
            emergencyContactNumber: input.emergencyContactNumber,
            emergencyContactName: input.emergencyContactName,
            emergencyContactRelationship: input.emergencyContactRelationship,
            isFilePaymemtUploaded: input.isFilePaymentUploaded,
          },
        }
      );

      return newColorRunTicket;
    }),

  /**
   * Submit color run ticket, buat FE, gabung sama saveColorRunTicket ya, proc ini gapunya input
   *
   */
  participantSubmitColorRunTicket: participantProcedure.mutation(
    async ({ ctx }) => {
      const savedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (!savedColorRunTicket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong, please contact support.",
        });
      }

      const updatedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.update({
          where: {
            id: savedColorRunTicket.id,
          },
          data: {
            status: RegistrationStatus.SUBMITTED_UNCONFIRMED,
          },
        });

      return updatedColorRunTicket;
    }
  ),

  participantDeleteColorRunTicket: participantProcedure.mutation(
    async ({ ctx }) => {
      const savedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
        });

      if (!savedColorRunTicket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong, please contact support.",
        });
      }

      const deletedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.update({
          where: {
            id: savedColorRunTicket.id,
          },
          data: {
            status: RegistrationStatus.UNREGISTERED,
            name: null,
            email: null,
            phoneNumber: null,
            address: null,
            institution: null,
            bloodType: null,
            healthHistory: null,
            emergencyContactNumber: null,
            emergencyContactName: null,
            emergencyContactRelationship: null,
          },
        });

      return deletedColorRunTicket;
    }
  ),

  adminGetColorRunTicketList: adminProcedure.query(async ({ ctx }) => {
    const colorRunTicketList =
      await ctx.prisma.colorRunParticipantData.findMany();

    return colorRunTicketList;
  }),

  adminUpdateColorRunTicket: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
        institution: z.string().optional(),
        bloodType: z.string().optional(),
        healthHistory: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactRelationship: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            address: input.address,
            institution: input.institution,
            bloodType: input.bloodType,
            healthHistory: input.healthHistory,
            emergencyContactNumber: input.emergencyContactNumber,
            emergencyContactName: input.emergencyContactName,
            emergencyContactRelationship: input.emergencyContactRelationship,
          },
        });

      return updatedColorRunTicket;
    }),

  adminDeleteColorRunTicket: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedColorRunTicket =
        await ctx.prisma.colorRunParticipantData.update({
          where: {
            id: input.id,
          },
          data: {
            status: RegistrationStatus.UNREGISTERED,
            name: null,
            email: null,
            phoneNumber: null,
            address: null,
            institution: null,
            bloodType: null,
            healthHistory: null,
            emergencyContactNumber: null,
            emergencyContactName: null,
            emergencyContactRelationship: null,
          },
        });

      return deletedColorRunTicket;
    }),
});
