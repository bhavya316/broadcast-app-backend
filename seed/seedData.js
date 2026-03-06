const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Batch = require("../models/Batch");

async function seedData() {

  const { faker } = await import("@faker-js/faker");

  console.log("Seeding database...");

  const batches = [];

  for (let i = 1; i <= 10; i++) {
    const batch = await Batch.create({
      name: `Batch ${i}`
    });
    batches.push(batch);
  }

  console.log("10 batches created");

  const teachers = [];

  for (let i = 1; i <= 5; i++) {

    const user = await User.create({
      name: faker.person.fullName(),
      phone: `900000000${i}`,
      role: "teacher"
    });

    const teacher = await Teacher.create({
      education: faker.company.name(),
      degree: "MSc",
      subject_taught: faker.person.jobTitle(),
      id_proof: null,
      UserId: user.id
    });

    teachers.push(teacher);
  }

  console.log("5 teachers created");

  for (let teacher of teachers) {
    const randomBatches = faker.helpers.arrayElements(batches, 2);
    await teacher.setBatches(randomBatches);
  }

  console.log("Teachers assigned to batches");

  let erpCounter = 1000;

  for (let i = 0; i < 100; i++) {

    const randomBatch = batches[Math.floor(Math.random() * batches.length)];

    const user = await User.create({
      name: faker.person.fullName(),
      phone: `8000000${100 + i}`,
      role: "student"
    });

    await Student.create({
      erp_id: `ERP${erpCounter++}`,
      dob: faker.date.birthdate(),
      address: faker.location.streetAddress(),
      UserId: user.id,
      BatchId: randomBatch.id
    });
  }

  console.log("100 students created");
  console.log("Database seeding completed successfully");
}

module.exports = seedData;