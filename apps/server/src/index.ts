import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(cors({
    origin: "http://localhost:3001",  // ⭐ REQUIRED
  credentials: true,            // ⬅ Allow requests from any domain
    methods: ["GET", "POST", "OPTIONS"],
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.get("/", (_req, res) => {
    res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
