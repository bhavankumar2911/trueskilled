import express, { ErrorRequestHandler } from "express";
import createError from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connection from "./db/connection";
import authRouter from "./routes/auth";

const app = express();

// parse requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

// db connection
connection();

// api routes
app.get("/auth", authRouter);

// 404 api request
app.use((req, res, next) => {
  return next(
    createError.NotFound("The requested resource is not found in the server")
  );
});

// error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  return res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

app.use(errorHandler);

// server config
const PORT = process.env.PORT || 9000;
app.listen(9000, () => console.log(`Server is running on port ${PORT} 🚀`));