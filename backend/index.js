// 🔹 Importă dotenv la început pentru a citi variabilele din .env
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔹 Inițializează Prisma înainte de a o folosi!
const prisma = new PrismaClient();

// 🔹 Funcție de test pentru conexiunea la baza de date
async function testDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("✅ Conectat la baza de date!");
    } catch (error) {
        console.error("❌ Eroare la conectarea cu baza de date:", error);
        process.exit(1);
    }
}

// 🔥 Rulează testul pentru conexiune
testDatabaseConnection();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 🔹 Citește PORT și JWT_SECRET din .env (fallback: 5000)
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secrettoken123";

// 🔹 Middleware pentru verificarea token-ului JWT
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acces interzis! Token lipsă." });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token invalid!" });
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(404).json({ error: "Utilizator inexistent!" });
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role, // 🔥 Acum verificăm și rolul
        };
        next();
    });
};

// 🔹 API STATUS (pentru testare rapidă)
app.get("/", (req, res) => {
    res.json({ message: "Backend is running!" });
});

// 🔹 Rutele pentru utilizatori
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Utilizator inexistent!" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Parolă incorectă!" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Autentificare reușită!", token });
    } catch (error) {
        console.error("Eroare la autentificare:", error);
        res.status(500).json({ error: "Eroare la autentificare" });
    }
});

app.post("/users", async (req, res) => {
    const { email, password, fullName, role } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email-ul este deja folosit!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                role: role || "user",
            },
        });

        res.status(201).json({ message: "Utilizator creat cu succes!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Eroare la crearea utilizatorului" });
    }
});

app.get("/users", authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Acces interzis! Doar adminii pot vedea utilizatorii." });
        }

        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea utilizatorilor" });
    }
});

// 🔹 Rutele pentru spaces și liste
app.get("/spaces", authenticateToken, async (req, res) => {
    try {
        const spaces = await prisma.space.findMany();
        res.json(spaces);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea spațiilor" });
    }
});

app.post("/lists", authenticateToken, async (req, res) => {
    const { name, spaceId } = req.body;
    try {
        const newList = await prisma.list.create({
            data: {
                name,
                spaceId,
            },
        });
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ error: "Eroare la crearea listei" });
    }
});

app.get("/spaces/:spaceId/lists", authenticateToken, async (req, res) => {
    const { spaceId } = req.params;
    try {
        const lists = await prisma.list.findMany({
            where: { spaceId: parseInt(spaceId) },
        });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea listelor" });
    }
});

// 🔹 Rutele pentru tasks
app.post("/tasks", authenticateToken, async (req, res) => {
    const { name, dueDate, cat, speciality, city, tel, cnp, workplace, email, dob, cuim, address, schedule, listId, userId } = req.body;

    try {
        const newTask = await prisma.task.create({
            data: {
                name,
                dueDate: new Date(dueDate),
                cat,
                speciality,
                city,
                tel,
                cnp,
                workplace,
                email,
                dob: new Date(dob),
                cuim,
                address,
                schedule,
                list: {
                    connect: { id: listId }
                },
                user: {
                    connect: { id: userId }
                }
            },
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Eroare la crearea taskului", details: error.message });
    }
});

app.get("/lists/:listId/tasks", async (req, res) => {
    const { listId } = req.params;

    try {
        const tasks = await prisma.task.findMany({
            where: { listId: parseInt(listId, 10) },
        });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("❌ Eroare la obținerea taskurilor:", error);
        return res.status(500).json({ error: "Eroare la obținerea taskurilor" });
    }
});

app.get("/", (req, res) => {
    res.json({ message: "Backend is running!" });
});

app.put("/tasks/:taskId/visit", authenticateToken, async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await prisma.task.findUnique({ where: { id: parseInt(taskId) } });

        if (!task) return res.status(404).json({ error: "Task not found" });

        let newDueDate = new Date(task.dueDate);
        if (task.cat === "A") {
            newDueDate.setDate(newDueDate.getDate() + 28); // +4 săptămâni
        } else if (task.cat === "A+") {
            newDueDate.setDate(newDueDate.getDate() + 14); // +2 săptămâni
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: { dueDate: newDueDate, vizita1: true }
        });

        res.json({ message: "Due Date actualizat cu succes", task: updatedTask });
    } catch (error) {
        console.error("Eroare la actualizarea Due Date:", error);
        res.status(500).json({ error: "Eroare la actualizarea Due Date" });
    }
});

app.put("/tasks/:taskId/custom-fields", authenticateToken, async (req, res) => {
    const { taskId } = req.params;
    const updatedData = req.body; // Primim orice câmp din req.body

    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: updatedData
        });

        res.json({ message: "Task actualizat cu succes!", task: updatedTask });
    } catch (error) {
        console.error("Eroare la actualizarea Custom Fields:", error);
        res.status(500).json({ error: "Eroare la actualizarea Custom Fields" });
    }
});

app.get("/tasks/view/daily-visit", authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                dueDate: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lt: new Date(new Date().setHours(23, 59, 59, 999)),
                },
            },
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea taskurilor pentru Daily Visit" });
    }
});

app.get("/tasks/view/missed-calls", authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                vizita1: false,
                dueDate: { lt: new Date() }
            },
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea taskurilor pentru Missed Calls" });
    }
});

app.get("/tasks/view/unplanned", authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { dueDate: null }
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea taskurilor neplanificate" });
    }
});

app.get("/tasks/view/bleu-programs-2024", authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { program: "Bleu 2024" }
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Eroare la obținerea taskurilor pentru Bleu Programs 2024" });
    }
});

// 🔹 PORNIRE SERVER (la final)
app.listen(PORT, () => {
    console.log(`✅ Serverul rulează pe portul ${PORT}`);
    console.log(`🔹 Conectat la baza de date: ${process.env.DATABASE_URL}`);
});
app.put("/tasks/:taskId/visit", authenticateToken, async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await prisma.task.findUnique({ where: { id: parseInt(taskId) } });

        if (!task) return res.status(404).json({ error: "Task not found" });

        let newDueDate = new Date(task.dueDate);
        if (task.cat === "A") {
            newDueDate.setDate(newDueDate.getDate() + 28); // +4 săptămâni
        } else if (task.cat === "A+") {
            newDueDate.setDate(newDueDate.getDate() + 14); // +2 săptămâni
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: { dueDate: newDueDate, vizitat: true }
        });

        res.json(updatedTask);
    } catch (error) {
        console.error("Eroare la actualizarea Due Date:", error);
        res.status(500).json({ error: "Eroare la actualizarea Due Date" });
    }
});
app.put("/tasks/:taskId/custom-fields", authenticateToken, async (req, res) => {
    const { taskId } = req.params;
    const updatedData = req.body; // Primim orice câmp din req.body

    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: updatedData
        });

        res.json(updatedTask);
    } catch (error) {
        console.error("Eroare la actualizarea Custom Fields:", error);
        res.status(500).json({ error: "Eroare la actualizarea Custom Fields" });
    }
});
app.post("/tasks", authenticateToken, async (req, res) => {
    const { name, dueDate, cat, speciality, city, tel, cnp, workplace, email, dob, cuim, address, schedule, listId, userId } = req.body;

    try {
        const newTask = await prisma.task.create({
            data: {
                name, dueDate: new Date(dueDate), cat, speciality, city, tel, cnp, workplace, email, dob: new Date(dob), cuim, address, schedule,
                list: { connect: { id: listId } },
                user: { connect: { id: userId } }
            }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Eroare la crearea taskului:", error);
        res.status(500).json({ error: "Eroare la crearea taskului" });
    }
});
app.delete("/tasks/:taskId", authenticateToken, async (req, res) => {
    const { taskId } = req.params;

    try {
        await prisma.task.delete({ where: { id: parseInt(taskId) } });
        res.json({ message: "Task șters cu succes!" });
    } catch (error) {
        console.error("Eroare la ștergerea taskului:", error);
        res.status(500).json({ error: "Eroare la ștergerea taskului" });
    }
});
app.get("/tasks/view/:viewType", authenticateToken, async (req, res) => {
    const { viewType } = req.params;

    let filter = {};
    if (viewType === "daily-visit") {
        filter = { dueDate: new Date().toISOString().split("T")[0] }; // Taskuri pentru azi
    } else if (viewType === "missed-calls") {
        filter = { vizitat: false, dueDate: { lt: new Date() } }; // Taskuri cu due date trecut, dar nevizitate
    } else if (viewType === "tomorrow") {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        filter = { dueDate: tomorrow.toISOString().split("T")[0] };
    }

    try {
        const tasks = await prisma.task.findMany({ where: filter });
        res.json(tasks);
    } catch (error) {
        console.error("Eroare la filtrare View-uri:", error);
        res.status(500).json({ error: "Eroare la filtrare View-uri" });
    }
});
