const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("AndreeaBleu2024*", 10);

    const user = await prisma.user.upsert({
        where: { email: "andreea.chertes@bleupharma.com" },
        update: {},
        create: {
            email: "andreea.chertes@bleupharma.com",
            password: hashedPassword,
            fullName: "Andreea Chertes",
            role: "user"
        }
    });

    console.log("✅ Utilizator creat cu succes:", user);

    const space = await prisma.space.create({
        data: { name: "Neuro" }
    });

    const list = await prisma.list.create({
        data: {
            name: "Andreea Chertes",
            spaceId: space.id
        }
    });

    const task = await prisma.task.create({
        data: {
            name: "Test Task",
            dueDate: new Date(),
            cat: "A",
            speciality: "Cardiologie",
            city: "București",
            tel: "0723456789",
            cnp: "1234567890123",
            workplace: "Spital Fundeni",
            email: "doctor@spital.ro",
            dob: new Date("1980-01-01"),
            cuim: "123456",
            address: "Str. Unirii 10",
            schedule: "Luni-Vineri 9:00-17:00",
            listId: list.id,
            userId: user.id
        }
    });

    console.log("✅ Task creat cu succes:", task);
}

main()
    .catch((error) => {
        console.error("❌ Eroare:", error);
        process.exit(1); // Ensure the process exits with an error code
    })
    .finally(async () => {
        await prisma.$disconnect();
    });