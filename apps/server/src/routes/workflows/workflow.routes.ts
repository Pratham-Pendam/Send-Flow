import { create, getAll, getOne, update, remove } from "@/controllers/workflows/workflow.controller";
import { authGuard } from "@/middlewares/auth.guard";
import express from "express";

const router = express.Router();

// Create a new workflow
router.post("/create", authGuard, create);

// Get all workflows for the logged-in user
router.get("/get", authGuard, getAll);

// Get a single workflow by ID
router.get("/:id", authGuard, getOne);

// Update a workflow by ID
router.put("/:id", authGuard, update);

// Delete a workflow by ID
router.delete("/:id", authGuard, remove);

export default router;
