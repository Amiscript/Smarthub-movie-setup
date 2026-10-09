import {PrismaClient} from '@prisma/client';
import {PrismaPg} from "@prisma/adapter-pg"
import {dotenv} from "dotenv";


dotenv.config();

const adapter = new PrismaPg({
  url: process.env.DATABASE_URL
});


const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// prisma migrate dev --name init- this helps to create the initial migration for the database schema based on the Prisma schema file. It generates SQL migration files and applies them to the database.

// prisma generate- this command generates the Prisma Client based on the schema defined in the Prisma schema file. It creates a client that can be used to interact with the database in your application code.

// prisma studio- this command launches Prisma Studio, a visual interface for exploring and managing your database. It allows you to view and manipulate data in your database tables.




