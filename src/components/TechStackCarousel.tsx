import React from "react";

const STACK = [
    "Solidity", "Foundry", "Hardhat", 
    "TypeScript", "React", "Next.js",
    "Vite", "Node.js", "React Native", 
    "Expo", "MongoDB", "SQL", "Python"
];

const TechStackCarousel: React.FC = () => {
    return (
        <ul className="mt-8 flex flex-wrap gap-2">
            {STACK.map((tech) => (
                <li
                    key={tech}
                    className="border border-border px-2.5 py-1 text-xs text-fg-dim"
                >
                    {tech}
                </li>
            ))}
        </ul>
    )
}

export default TechStackCarousel