import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(async (tx) => {
        // update values in src/app/utils/database/values.ts when adding new settings
        await tx.setting.createMany({ 
            data: [
                {
                    name: "timeRangePast",
                    updated_at: new Date()
                },
                {
                    name: "timeRangeFuture",
                    updated_at: new Date()
                },
                {
                    name: "alwaysShowIncomplete",
                    updated_at: new Date()
                },
                {
                    name: "additionalReminderAfter",
                    updated_at: new Date()
                },
            ]
        })
    })
}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => await prisma.$disconnect())