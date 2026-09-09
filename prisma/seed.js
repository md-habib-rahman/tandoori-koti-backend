import prisma from "../src/config/db.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("Starting database seeding...");

  // Hash the password securely
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Upsert ensures we don't accidentally create duplicate admins if you run this twice
  const admin = await prisma.admin.upsert({
    where: { username: "tandoori_admin" },
    update: {}, // Do nothing if it already exists
    create: {
      username: "tandoori_admin",
      password: hashedPassword,
    },
  });

  console.log(`✅ Admin user successfully created!`);
  console.log(`➡️  Username: ${admin.username}`);
  console.log(`➡️  Password: admin123`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
