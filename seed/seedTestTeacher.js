const User = require("../models/User");
const Teacher = require("../models/Teacher");

async function seedTestTeacher() {
  const existing = await User.findOne({
    where: { phone: "8111111111" }
  });

  if (existing) {
    console.log("Test teacher already exists");
    return;
  }

  const user = await User.create({
    name: "test",
    phone: "8111111111",
    role: "teacher",
    otp: null
  });

  await Teacher.create({
    education: "Test Education",
    degree: "Test Degree",
    subject_taught: "Testing",
    id_proof: null,
    UserId: user.id
  });

  console.log("Test teacher created successfully");
}

module.exports = seedTestTeacher;