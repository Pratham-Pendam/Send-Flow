"use client";

import WorkspaceModal from "@/components/WorkspaceModal";
import { useCreateWorkflow } from "@/hooks/useCreateWorkflow";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const { mutate: createWorkflow, isPending } = useCreateWorkflow({
    onSuccess(res) {
      router.push(`/workflow/${res.data.id}`);   // 🛠 open React Flow editor
    }
  });

  const handleCreateWorkspace = (name: string) => {
    createWorkflow({ name });   // 🔥 API call from here NOT modal
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="w-[380px] h-[200px] bg-indigo-300 rounded-3xl shadow-lg flex flex-col items-center justify-center">
        
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          Create your Workflows 📁
        </h1>

        <p className="text-gray-700 text-sm mb-4 px-6 text-center">
          Organize automations, graphs & logic visually.
        </p>

        {/* Modal → returns name → page runs mutation */}
        <WorkspaceModal onCreate={handleCreateWorkspace} />
      </div>
    </div>
  );
}
