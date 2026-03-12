import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Port freed, server closed");
    process.exit(0);
  });
});
