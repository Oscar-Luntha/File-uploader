import express from "express";
import { fileURLToPath } from "node:url";

import indexRouter from "./routes/indexRouter.js";

const viewsPath = fileURLToPath(new URL("./views", import.meta.url));
const publicPath = fileURLToPath(new URL("./public", import.meta.url));

const app = express();

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.static(publicPath));
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
