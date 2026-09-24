import cron from "node-cron";
import prisma from "../config/db.js";

export  const startBuffetCleanupCron = () => {
  // Runs once every day at 03:00 AM (server local/configured time)
  cron.schedule("0 3 * * *", async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      thirtyDaysAgo.setHours(0, 0, 0, 0);

      const result = await prisma.buffetMenu.deleteMany({
        where: {
          date: {
            lt: thirtyDaysAgo,
          },
        },
      });

      console.log(
        `[CRON] Buffet cleanup finished. Deleted ${result.count} entries older than 30 days.`,
      );
    } catch (error) {
      console.error(
        "[CRON ERROR] Failed to clean up old buffet records:",
        error,
      );
    }
  });

  console.log("[CRON] Buffet schedule 30-day cleanup job initialized.");
};
