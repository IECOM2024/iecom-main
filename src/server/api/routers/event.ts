import { EventTicketStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  participantProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  participantCreateEventTicket: participantProcedure
    .input(
      z.object({
        participantName: z.string().min(1),
        participantEmail: z.string().email(),
        participantPhoneNumber: z.string().min(1),
        participantInstitution: z.string().min(1),
        eventId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;

      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const eventTicket = await ctx.prisma.eventTicket.create({
        data: {
          participantName: input.participantName,
          participantEmail: input.participantEmail,
          participantPhoneNumber: input.participantPhoneNumber,
          participantInstitution: input.participantInstitution,
          status: EventTicketStatus.REGISTERED,
          eventId: input.eventId,
          userId: session.user.id,
        },
      });

      if (!eventTicket)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unable to create event ticket. Please signin first",
        });

      return eventTicket;
    }),

  participantGetEventTicketList: participantProcedure.query(async ({ ctx }) => {
    const session = ctx.session;

    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

    const eventTickets = await ctx.prisma.eventTicket.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: true,
        event: true,
      },
    });

    return eventTickets;
  }),

  participantEditEventTicket: participantProcedure
    .input(
      z.object({
        id: z.string().min(1),
        participantName: z.string().min(1),
        participantEmail: z.string().email(),
        participantPhoneNumber: z.string().min(1),
        participantInstitution: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;

      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const eventTicket = await ctx.prisma.eventTicket.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!eventTicket) throw new TRPCError({ code: "UNAUTHORIZED" });

      const updatedEventTicket = await ctx.prisma.eventTicket.update({
        where: {
          id: input.id,
        },
        data: {
          participantName: input.participantName,
          participantEmail: input.participantEmail,
          participantPhoneNumber: input.participantPhoneNumber,
          participantInstitution: input.participantInstitution,
        },
      });

      return updatedEventTicket;
    }),

  participantDeleteEventTicket: participantProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;

      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const eventTicket = await ctx.prisma.eventTicket.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!eventTicket)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No Ticket Detected",
        });

      if (
        eventTicket.status === EventTicketStatus.PAID_CONFIRMED ||
        eventTicket.status === EventTicketStatus.PAID_UNCONFIRMED
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Ticket already paid, please contact support for cancellation",
        });
      }

      const deletedEventTicket = await ctx.prisma.eventTicket.delete({
        where: {
          id: input.id,
        },
      });

      return deletedEventTicket;
    }),

  adminGetEventTicketList: adminProcedure.query(async ({ ctx }) => {
    const eventTickets = await ctx.prisma.eventTicket.findMany({
      include: {
        user: true,
      },
    });

    return eventTickets;
  }),

  adminEditEventTicket: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        status: z
          .enum([
            EventTicketStatus.PAID_CONFIRMED,
            EventTicketStatus.PAID_UNCONFIRMED,
            EventTicketStatus.REGISTERED,
            EventTicketStatus.UNATTENDED,
          ])
          .optional(),
        participantName: z.string().min(1),
        participantEmail: z.string().email(),
        participantPhoneNumber: z.string().min(1),
        participantInstitution: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventTicket = await ctx.prisma.eventTicket.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!eventTicket) throw new TRPCError({ code: "UNAUTHORIZED" });

      const updatedEventTicket = await ctx.prisma.eventTicket.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status || eventTicket.status,
          participantName: input.participantName || eventTicket.participantName,
          participantEmail:
            input.participantEmail || eventTicket.participantEmail,
          participantInstitution:
            input.participantInstitution || eventTicket.participantInstitution,
          participantPhoneNumber:
            input.participantPhoneNumber || eventTicket.participantPhoneNumber,
        },
      });

      return updatedEventTicket;
    }),

  adminDeleteEventTicket: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventTicket = await ctx.prisma.eventTicket.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!eventTicket) throw new TRPCError({ code: "UNAUTHORIZED" });

      const deletedEventTicket = await ctx.prisma.eventTicket.delete({
        where: {
          id: input.id,
        },
      });

      return deletedEventTicket;
    }),

  participantGetEventList: participantProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany({
      where: {
        isPublished: true,
      },
      
    });

    return events;
  }),

  adminCreateEvent: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        startTime: z.date(),
        endTime: z.date(),
        location: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.create({
        data: {
          name: input.name,
          description: input.description,
          startTime: input.startTime,
          endTime: input.endTime,
          location: input.location
        },
      });

      return event;
    }),

  adminGetEventList: adminProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany();

    return events;
  }),

  adminEditEvent: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        startTime: z.date(),
        endTime: z.date(),
        isPublished: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!event) throw new TRPCError({ code: "UNAUTHORIZED" });

      const updatedEvent = await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name || event.name,
          description: input.description || event.description,
          startTime: input.startTime || event.startTime,
          endTime: input.endTime || event.endTime,
          isPublished: input.isPublished || event.isPublished,
        },
      });

      return updatedEvent;
    }),
});
