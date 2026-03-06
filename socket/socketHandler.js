module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
    });

    socket.on("send_message", (data) => {
      if (data.type === "personal") {
        io.to(`user_${data.receiverId}`).emit("receive_message", data);
      } else if (data.type === "group") {
        io.to(`batch_${data.batchId}`).emit("receive_message", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};