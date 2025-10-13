import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.token.deleteMany();
  await prisma.task.deleteMany();
  await prisma.userAgency.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const hashedPassword = await bcrypt.hash("123123", 12);

  // 0. Create Super Admin User
  const superAdminUser = await prisma.user.create({
    data: {
      name: "SuperAdmin",
      email: "super@super.com",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      verified: true,
      invited: false,
    },
  });

  console.log("✅ Created Super Admin user:", superAdminUser.email);

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

  const acmeAgency = await prisma.agency.create({
    data: {
      name: "Acme Agency",
      subdomain: "acme",
    },
  });

  const superAdminAgency = await prisma.agency.create({
    data: {
      name: "Super Agency",
      subdomain: "super",
    },
  });

  // Link agency user to agency
  await prisma.userAgency.create({
    data: {
      userId: superAdminUser.id,
      agencyId: superAdminAgency.id,
      agencyRole: "OWNER", // Owner role
    },
  });

  await prisma.userAgency.create({
    data: {
      userId: agencyUser.id,
      agencyId: acmeAgency.id,
      agencyRole: "OWNER", // Owner role
    },
  });

  console.log("✅ Created Agency:", acmeAgency.name, ",", superAdminAgency.name);
  console.log("✅ Created Agency user:", agencyUser.email);

  // 3. Create Worker User
  const acmeWorker = await prisma.user.create({
    data: {
      name: "Worker",
      email: "worker@acme.com",
      passwordHash: hashedPassword,
      role: "WORKER",
      verified: true, // All users should be verified
      invited: true, // Worker was invited
    },
  });

  const acmeWorker1 = await prisma.user.create({
    data: {
      name: "Worker1",
      email: "worker1@acme.com",
      passwordHash: hashedPassword,
      role: "WORKER",
      verified: true, // All users should be verified
      invited: true, // Worker was invited
    },
  });

  const superAdminWorker = await prisma.user.create({
    data: {
      name: "Worker3",
      email: "superworker@super.com",
      passwordHash: hashedPassword,
      role: "WORKER",
      verified: true, // All users should be verified
      invited: true, // Worker was invited
    },
  });

  // Link worker to agency
  await prisma.userAgency.create({
    data: {
      userId: acmeWorker.id,
      agencyId: acmeAgency.id,
      agencyRole: "WORKER",
    },
  });

  await prisma.userAgency.create({
    data: {
      userId: acmeWorker1.id,
      agencyId: acmeAgency.id,
      agencyRole: "WORKER",
    },
  });

  await prisma.userAgency.create({
    data: {
      userId: superAdminWorker.id,
      agencyId: superAdminAgency.id,
      agencyRole: "WORKER",
    },
  });

  console.log("✅ Created Worker users:", acmeWorker.email, acmeWorker1.email, superAdminWorker.email);

  // Create sample client
  const superAdminClient = await prisma.client.create({
    data: {
      name: "Acme Co",
      domain: "acme.example",
      industry: "E-commerce",
      targets: [
        "US / Chicago"
      ],
      userId: superAdminUser.id,
    }
  });

  const acmeClient = await prisma.client.create({
    data: {
      name: "Beta Soft",
      domain: "beta.example",
      industry: "SaaS",
      targets: [
        "US / Remote"
      ],
      userId: agencyUser.id,
    }
  });

  const acmeClient1 = await prisma.client.create({
    data: {
      name: "Nimbus Health",
      domain: "nimbus.example",
      industry: "Healthcare",
      targets: [
        "US / NY",
        "US / NJ"
      ],
      userId: agencyUser.id,
    }
  });

  console.log("✅ Created sample clients");

  // Create some sample tasks
  await prisma.task.create({
    data: {
      title: "Setup SEO audit for new client",
      description:
        "Perform comprehensive SEO audit for the new e-commerce client",
      category: "On-page",
      status: "TODO",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: acmeWorker.id,
      clientId: acmeClient.id
    },
  });

  await prisma.task.create({
    data: {
      title: "Keyword research for tech blog",
      description:
        "Research high-volume keywords for the technology blog project",
      category: "Content",
      status: "IN_PROGRESS",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: acmeWorker.id,
      clientId: acmeClient1.id
    },
  });

  await prisma.task.create({
    data: {
      title: "Monthly SEO report",
      description: "Generate and send monthly SEO performance report to client",
      category: "Link building",
      status: "DONE",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: acmeWorker1.id,
      clientId: acmeClient1.id
    },
  });

  await prisma.task.create({
    data: {
      title: "Fix title tags on category pages",
      description: "Fix title tages on category pages",
      category: "Link building",
      status: "TODO",
      agencyId: acmeAgency.id,
      createdById: agencyUser.id,
      assigneeId: acmeWorker1.id,
      clientId: acmeClient.id
    },
  });

  await prisma.task.create({
    data: {
      title: "SILO Structure Mapping",
      description: "Plan website SILO architecture based on keywords and categories.",
      category: "On-page",
      status: "IN_PROGRESS",
      agencyId: superAdminAgency.id,
      createdById: superAdminUser.id,
      assigneeId: superAdminWorker.id,
      clientId: superAdminClient.id
    },
  });

  await prisma.task.create({
    data: {
      title: "Competitor Analysis",
      description: "Analyze top competitors’ backlink profiles and content strategies.",
      category: "Link building",
      status: "TODO",
      agencyId: superAdminAgency.id,
      createdById: superAdminUser.id,
      assigneeId: superAdminWorker.id,
      clientId: superAdminClient.id
    },
  });

  console.log("✅ Created sample tasks");

  console.log("🎉 Database seeding completed successfully!");
  console.log("\n📋 Seeded accounts:");
  console.log("👤 SuperAdmin: super@super.com / 123123");
  console.log("👤 Admin: admin@admin.com / 123123");
  console.log("🏢 Agency: acme@acme.com / 123123");
  console.log("👷 Worker: worker@worker.com / 123123");
  console.log("👷 Worker: worker1@worker1.com / 123123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
