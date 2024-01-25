import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Use an SQLite-specific connection string for local development
const sqliteConnectionString = "file:./data/dev.db"; // Adjust the path as needed

export const db = new PrismaClient({
  datasources: {
    db: {
      url: "file:./data/dev.db",
    },
  },
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
