import type { Request, Response } from "express";
import { 
  createWorkflow, 
  getAllWorkflows, 
  getWorkflowById, 
  updateWorkflow, 
  deleteWorkflow 
} from "@/services/workflows/workflow.service";
import { sendResponse } from "utils/helper";


/* -------------------- CREATE WORKFLOW -------------------- */
export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.userId as string;

    if (!name) return sendResponse(res, 400, "Name is required");
    if (!userId) return sendResponse(res, 401, "Unauthorized");

    const workflow = await createWorkflow(name, userId);
    return sendResponse(res, 201, "Workflow created successfully", workflow);
  } catch (error) {
    return sendResponse(res, 500, "Failed to create workflow", null, error);
  }
};

/* -------------------- GET ALL WORKFLOWS -------------------- */
export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    if (!userId) return sendResponse(res, 401, "Unauthorized");

    const workflows = await getAllWorkflows(userId);
    return sendResponse(res, 200, "Workflows fetched successfully", workflows);
  } catch (error) {
    return sendResponse(res, 500, "Failed to fetch workflows", null, error);
  }
};

/* -------------------- GET ONE WORKFLOW BY ID -------------------- */
export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id) return sendResponse(res, 400, "Workflow ID is required");

    const workflow = await getWorkflowById(id);
    if (!workflow) return sendResponse(res, 404, "Workflow not found");

    return sendResponse(res, 200, "Workflow fetched successfully", workflow);
  } catch (error) {
    return sendResponse(res, 500, "Error fetching workflow", null, error);
  }
};

/* -------------------- UPDATE WORKFLOW -------------------- */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id?: string };
    const { name } = req.body as { name?: string };

    if (!id) return sendResponse(res, 400, "Workflow ID is required");
    if (!name) return sendResponse(res, 400, "Name is required");

    const updated = await updateWorkflow(id, name);
    return sendResponse(res, 200, "Workflow updated successfully", updated);
  } catch (error) {
    return sendResponse(res, 500, "Failed to update workflow", null, error);
  }
};

/* -------------------- DELETE WORKFLOW -------------------- */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id) return sendResponse(res, 400, "Workflow ID is required");

    await deleteWorkflow(id);
    return sendResponse(res, 200, "Workflow deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, "Failed to delete workflow", null, error);
  }
};
