import React from "react";

const UnknownOutput: React.FC<{ command: string }> = ({ command }) => (
    <p className="text-fg-dim">
        command not found: <span className="text-fg">{command}</span>. type{" "}
        <span className="text-accent">--help</span> to see what&apos;s available.
    </p>
);

export default UnknownOutput;