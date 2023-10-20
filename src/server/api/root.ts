import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { storageRouter } from "./routers/storage";
import { profileRouter } from "./routers/profile";
import { eventRouter } from "./routers/event";
import { colorRunRouter } from "./routers/color-run";
import { caseRegistRouter } from "./routers/case-regist";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  storage: storageRouter,
  profile: profileRouter,
  event: eventRouter,
  colorRun: colorRunRouter,
  caseRegist: caseRegistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
