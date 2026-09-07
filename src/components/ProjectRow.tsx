import React, { useState } from "react";
import { Button } from "./components/ui/button";

interface ProjectRowProps {
    index: number;
    title: string;
    description: string;
    applicationLink: string;
    repositoryLink: string;
    videoLink: string;
    videoTitle: string;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
    index,
    title,
    description,
    applicationLink,
    repositoryLink,
    videoLink,
    videoTitle,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const panelId = `project-panel-${index}`;

    return (
        <li className="border-b border-border first:border-t">
            <button
                className="group flex w-full items-baseline gap-3 py-3 text-left"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={panelId}
            >
                <span className="shrink-0 text-xs text-fg-dim">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-bold transition-colors group-hover:text-accent">
                    {title}
                </span>
                <span
                    aria-hidden="true"
                    className={`text-fg-dim transition-transform ${open ? "rotate-90 text-accent" : ""}`}
                >
                    &gt;
                </span>
            </button>

            <div
                id={panelId}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="min-h-0">
                    <div className="flex flex-col gap-3 pb-8">
                        <p className="text-fg-dim">{description}</p>
                        {open && (
                            <div className="overflow-hidden border border-border">
                                <iframe
                                    src={videoLink}
                                    title={videoTitle}
                                    className="aspect-video w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        )}
                        <div className="flex flex-wrap gap-3">
                            <a href={applicationLink} target="_blank" rel="noreferrer">
                                <Button variant="accent" size="sm">live application</Button>
                            </a>
                            <a href={repositoryLink} target="_blank" rel="noreferrer">
                                <Button variant="default" size="sm">repository</Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ProjectRow