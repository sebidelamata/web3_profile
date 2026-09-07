import React from "react";
import { STACK } from "../lib/Stack";

const ListTechStackOutput: React.FC<{ onRun: (cmd: string) => void }> = ({ onRun }) => (
    <div className="flex flex-col gap-1">
        {STACK.map((i) => (
            <button
                key={i}
                className="w-fit text-left underline decoration-accent/40 underline-offset-2"
            >
                {i}
            </button>
        ))}
    </div>
);

export default ListTechStackOutput;