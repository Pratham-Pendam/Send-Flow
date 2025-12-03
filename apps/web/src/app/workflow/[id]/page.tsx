

"use client";

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap } from '@xyflow/react';
import type { Edge, Node, NodeChange, EdgeChange, Connection } from '@xyflow/react';
import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function WorkflowPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), [],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), [],
  );

  return (
    <div className="relative w-full h-screen min-h-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background gap={12} size={1} />
        <Controls position="top-left" />
        <MiniMap  />
      </ReactFlow>

      {/* CURVE with rounded top-left corner */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-[9999] text-indigo-300"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="
            M 100 0
            L 1.5 0
            Q 0 0, 0 2
            L 0 100
          "
          stroke="currentColor"
          strokeWidth="0.4"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}