import React from "react";
import { REPORTS } from "../lib/Reports";

const CatReportOutput: React.FC<{ title: string }> = ({ title }) => {
    const report = REPORTS.find((r) => r.title === title);

    if (!report) {
        return (
            <p className="text-fg-dim">
                cat: {title}: no such report. try{" "}
                <span className="text-accent">ls security</span> to see what&apos;s available.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2 border-l-2 border-border pl-3">
            <p className="font-bold text-fg">{report.title}</p>
            <div className="mt-4 flex flex-col gap-1">
                    <a href={report.url} target="_blank" rel="noreferrer">
                        <button
                             className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                        >
                            open in new tab
                        </button>
                    </a>
                    <a href={report.url} download>
                        <button 
                            className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                        >
                            download pdf
                        </button>
                    </a>
                </div>
        </div>
    );
};

export default CatReportOutput;