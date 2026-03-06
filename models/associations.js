const User = require("./User");
const Teacher = require("./Teacher");
const Student = require("./Student");
const Batch = require("./Batch");
const Message = require("./Message");
const Notice = require("./Notice");

/* User Relations */
User.hasOne(Teacher);
Teacher.belongsTo(User);

User.hasOne(Student);
Student.belongsTo(User);

/* Batch Relations */
Batch.hasMany(Student);
Student.belongsTo(Batch);

Teacher.belongsToMany(Batch, { through: "TeacherBatch" });
Batch.belongsToMany(Teacher, { through: "TeacherBatch" });

/* Message Relations */
User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });

User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

Batch.hasMany(Message);
Message.belongsTo(Batch);

/* Notice Relations */
Teacher.hasMany(Notice);
Notice.belongsTo(Teacher);

Batch.hasMany(Notice);
Notice.belongsTo(Batch);

User.hasMany(Notice);
Notice.belongsTo(User);