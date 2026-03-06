const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Batch = require("../models/Batch");

exports.teacherDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: Batch,
          include: [Student]
        }
      ]
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const totalBatches = teacher.Batches.length;

    let totalStudents = 0;

    teacher.Batches.forEach(batch => {
      totalStudents += batch.Students.length;
    });

    res.json({
      totalStudents,
      totalBatches,
      totalGroups: totalBatches
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.studentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: Batch,
          include: [Student]
        }
      ]
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const totalStudentsInBatch = student.Batch.Students.length;

    res.json({
      batchName: student.Batch.name,
      totalStudentsInBatch
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};