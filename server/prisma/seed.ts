import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.token.deleteMany();
  await prisma.task.deleteMany();
  await prisma.userAgency.deleteMany();
  await prisma.user.deleteMany();
  await prisma.agency.deleteMany();

  // Hash passwords
  const hashedPassword = await bcrypt.hash("123123", 12);

  // 1. Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      passwordHash: hashedPassword,
      role: "ADMIN",
      verified: true,
      invited: false,
    },
  });

  console.log("✅ Created Admin user:", adminUser.email);

  // 2. Create Agency and Agency Owner
  const acmeAgency = await prisma.agency.create({
    data: {
      name: "Acme Agency",
      subdomain: "acme",
    },
  });

  const agencyUser = await prisma.user.create({
    data: {
      name: "Acme Agency",
      email: "acme@acme.com",
      passwordHash: hashedPassword,
      role: "AGENCY",
      verified: true,
      invited: false,
    },
  });

  // Link agency user to agency
  await prisma.userAgency.create({
    data: {
      userId: agencyUser.id,
      agencyId: acmeAgency.id,
      agencyRole: "AGENCY", // Owner role
    },
  });

  console.log("✅ Created Agency:", acmeAgency.name);
  console.log("✅ Created Agency user:", agencyUser.email);

  // 3. Create Worker User
  const workerUser = await prisma.user.create({
    data: {
      name: "Worker",
      email: "worker@worker.com",
      passwordHash: hashedPassword,
      role: "WORKER",
      verified: true, // All users should be verified
      invited: true, // Worker was invited
    },
  });

  // Link worker to agency
  await prisma.userAgency.create({
    data: {
      userId: workerUser.id,
      agencyId: acmeAgency.id,
      agencyRole: "WORKER",
    },
  });

  console.log("✅ Created Worker user:", workerUser.email);

  // Create some sample tasks
  await prisma.task.create({
    data: {
      title: "Setup SEO audit for new client",
      description:
        "Perform comprehensive SEO audit for the new e-commerce client",
      status: "TODO",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: workerUser.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Keyword research for tech blog",
      description:
        "Research high-volume keywords for the technology blog project",
      status: "IN_PROGRESS",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: workerUser.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Monthly SEO report",
      description: "Generate and send monthly SEO performance report to client",
      status: "DONE",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: workerUser.id,
    },
  });

  console.log("✅ Created sample tasks");

  console.log("🎉 Database seeding completed successfully!");
  console.log("\n📋 Seeded accounts:");
  console.log("👤 Admin: admin@admin.com / 123123");
  console.log("🏢 Agency: acme@acme.com / 123123");
  console.log("👷 Worker: worker@worker.com / 123123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
