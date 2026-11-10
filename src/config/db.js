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

const connectDB = async ()=>{
  try {
    await prisma.$connect()
    console.log("Database connected ")
    
  } catch (error) {
   console.log(`database error:${error.massege}`)
    
  }

}

const disconnectDB = async ()=>{
  await prisma.$disconnect()
  console.log("database is disconnected ")
  process.exit(1)
}


export {prisma, connectDB, disconnectDB}

