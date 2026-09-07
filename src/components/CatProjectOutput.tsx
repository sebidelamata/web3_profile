import React from "react";
import { PROJECTS } from "../lib/Projects";
import { Button } from "./components/ui/button";

const CatProjectOutput: React.FC<{ slug: string }> = ({ slug }) => {
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        return (
            <p className="text-fg-dim">
                cat: {slug}: no such project. try{" "}
                <span className="text-accent">ls projects</span> to see what&apos;s available.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2 border-l-2 border-border pl-3">
            <p className="font-bold text-fg">{project.title}</p>
            <p className="text-fg-dim">{project.description}</p>
            <div className="overflow-hidden border border-border">
                <iframe
                    src={project.videoLink}
                    title={project.videoTitle}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
            <div className="flex flex-wrap gap-3">
                <a href={project.applicationLink} target="_blank" rel="noreferrer">
                    <Button variant="default" size="sm">live application</Button>
                </a>
                <a href={project.repositoryLink} target="_blank" rel="noreferrer">
                    <Button variant="default" size="sm">repository</Button>
                </a>
            </div>
        </div>
    );
};

export default CatProjectOutput;