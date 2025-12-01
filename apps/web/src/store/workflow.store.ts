import { create } from "zustand";

export interface Workflow {
  id: string;
  name: string;
  createdAt: string;
}

type WorkflowStore = {
  workflows: Workflow[];
  setWorkflows: (data: Workflow[]) => void;
  addWorkflow: (workflow: Workflow) => void;
};

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  workflows: [],

  setWorkflows: (data) => set({ workflows: data }),

  addWorkflow: (workflow) =>
    set((state) => ({ workflows: [workflow, ...state.workflows] })),
}));
