import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
    const user = await db.user.create({
        data: {
            username: "test",
            email: "test@test.com",
            password: "test",
        }
    })
    console.log(user)
}

export default db;
