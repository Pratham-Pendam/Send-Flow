// WorkspaceModal.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface WorkspaceModalProps {
  onCreate: (workspaceName: string) => void; // only returns name
}

const WorkspaceModal: FC<WorkspaceModalProps> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name);      // 🚀 send name to parent
    setName("");         
    setOpen(false);      // close modal
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      
      <Dialog.Trigger asChild>
        <Button className="bg-indigo-500 text-white rounded-2xl px-5 py-2">
          Create Workspace +
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-400/90 p-6 rounded-2xl text-white w-[400px]">
          
          <div className="flex justify-between">
            <Dialog.Title className="text-lg font-semibold">New Workflow</Dialog.Title>
            <Dialog.Close><X /></Dialog.Close>
          </div>

          <Label className="mt-4 block">Workspace Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="AI Studio / Automations..."
            className="rounded-2xl mt-2"
          />

          <Button onClick={handleSubmit} className="mt-6 w-full bg-white text-indigo-600 rounded-2xl">
            Create 🚀
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WorkspaceModal;
