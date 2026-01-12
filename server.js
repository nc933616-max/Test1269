import express from "express";
import dataRoutes from "./routes/dataRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/data", dataRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
