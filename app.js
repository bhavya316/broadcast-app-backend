const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const sequelize = require("./config/database");
require("./models/associations");
require("dotenv").config();

const seedTestTeacher = require("./seed/seedTestTeacher");
const seedData = require("./seed/seedData");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Socket
require("./socket/socketHandler")(io);

// DB Sync
sequelize.sync().then(async () => {
  console.log("Database synced");

  // Only seed if empty (IMPORTANT)
  const userCount = await require("./models/User").count();
  if (userCount === 0) {
    await seedTestTeacher();
    await seedData();
  }

  server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});