import db from "@send-flow/db";

export const createWorkflow = async (name: string, userId: string) => {
  return await db.workFlows.create({
    data: { name, userId },
  });
};

export const getAllWorkflows = async (userId: string) => {
  return await db.workFlows.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getWorkflowById = async (id: string) => {
  return await db.workFlows.findUnique({
    where: { id },
  });
};

export const updateWorkflow = async (id: string, name: string) => {
  return await db.workFlows.update({
    where: { id },
    data: { name },
  });
};

export const deleteWorkflow = async (id: string) => {
  return await db.workFlows.delete({
    where: { id },
  });
};
