import React from "react";

const STACK = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
    "Vite", "Node.js", "Webpack", "Jest", "Git", "MongoDB",
    "Solidity", "Truffle", "Hardhat"
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