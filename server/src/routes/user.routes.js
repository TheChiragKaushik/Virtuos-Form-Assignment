import { Router } from "express";
import { newUser } from "../controllers/user.controller.js"
import { getUser } from "./getUser.routes.js";

const router = Router();

router.route("/").post(
    newUser
)

router.route("/").get(
    getUser
)


const userRoute = router;

export default userRoute