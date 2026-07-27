import express from "express";
import session from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import fileRouter from "./routes/fileRouter.js";
import prisma from "./config/prisma.js";
import passport from "./config/passport.js";
import authRouter from "./routes/authRouter.js";
import indexRouter from "./routes/indexRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import folderRouter from "./routes/folderRouter.js";

const viewsPath = fileURLToPath(new URL("./views", import.meta.url));
const publicPath = fileURLToPath(new URL("./public", import.meta.url));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    secret: process.env.SESSION_SECRET || "a_very_secret_key",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // clean up expired sessions every 2 mins
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static(publicPath));
app.use("/", indexRouter);
app.use("/", authRouter)
app.use("/", dashboardRouter)
app.use("/", folderRouter);
app.use("/", fileRouter);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File is too large! Maximum allowed size is 5MB.");
    }
    return res.status(400).send(err.message);
  } else if (err) {
    return res.status(400).send(err.message);
  }
  next();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
