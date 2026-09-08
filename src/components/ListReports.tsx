import React from "react";
import { REPORTS } from "../lib/Reports";

const ListReportsOutput: React.FC<{ onRun: (cmd: string) => void }> = ({ onRun }) => (
    <div className="flex flex-col gap-1">
        {REPORTS.map((p) => (
            <button
                key={p.id}
                onClick={() => onRun(`cat security/${p.title}`)}
                className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
                {p.title}
            </button>
        ))}
        <p className="mt-1 text-xs text-fg-dim">tip: try `cat security/{REPORTS[0].title}`</p>
    </div>
);

export default ListReportsOutput;