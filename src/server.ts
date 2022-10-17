import express from "express";
import cors from "cors";

import { userRouter } from "./userRouter";

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => {
	console.log(`🚀 Server ready at: http://localhost:${port}`);
});
