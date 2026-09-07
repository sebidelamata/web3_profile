import React from "react";
import { PROJECTS } from "../lib/Projects";

const ListProjectsOutput: React.FC<{ onRun: (cmd: string) => void }> = ({ onRun }) => (
    <div className="flex flex-col gap-1">
        {PROJECTS.map((p) => (
            <button
                key={p.slug}
                onClick={() => onRun(`cat ${p.slug}`)}
                className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
                {p.slug}
            </button>
        ))}
        <p className="mt-1 text-xs text-fg-dim">tip: try `cat {PROJECTS[0].slug}`</p>
    </div>
);

export default ListProjectsOutput;