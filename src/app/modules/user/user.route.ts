import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);

router.post("/wishlist/:id", UserController.addToWishlist);
router.post("/readlist/:id", UserController.addToReadList);

router.patch("/readlist/:id", UserController.updateReadlist);

router.get("/:id", UserController.getSingleUser);

export const UserRoutes = router;
