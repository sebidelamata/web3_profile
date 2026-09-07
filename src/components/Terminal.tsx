import React, { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";

export interface Project {
    slug: string;
    title: string;
    description: string;
    applicationLink: string;
    repositoryLink: string;
    videoLink: string;
    videoTitle: string;
}

export const PROJECTS: Project[] = [
    {
        slug: 'alphaping',
        title: 'AlphaPING',
        description: 'AlphaPING is a DeFi chat protocol on Arbitrum, built with Next.js, React, TypeScript, Solidity, and Hardhat. It features token-gated messaging, aggregated social trading insights, sentiment analysis, integrated trading, creating a social experience.',
        applicationLink: 'https://www.alphaping.xyz/',
        repositoryLink: 'https://github.com/sebidelamata/alpha-ping',
        videoLink: 'https://www.youtube.com/embed/sI4y7i_BnBQ',
        videoTitle: 'AlphaPING',
    },
    {
        slug: 'repo',
        title: 'REPO',
        description: "ETH Denver 2024's 1st place Euler Finance Bounty winner, Repo Vault provides liquidity and leverage for Pendle Principal Token (PT) holders through fixed-rate loans.",
        applicationLink: 'https://defi-interest-rate-swaps-frontend.vercel.app/',
        repositoryLink: 'https://devfolio.co/projects/repo-9d33',
        videoLink: 'https://www.youtube.com/embed/7VfPbW5x3Dw',
        videoTitle: 'repo',
    },
    {
        slug: 'open-dollar',
        title: 'Open Dollar Gov Proposals',
        description: 'Built with Next.js, TypeScript, WalletConnect, and Ethers.js. Users view and submit proposals via Arbitrum blockchain. Features data from GitHub, decoded calldata, and user status messages.',
        applicationLink: 'https://propose.opendollar.com/',
        repositoryLink: 'https://github.com/open-dollar/od-gov-proposal-app',
        videoLink: 'https://www.youtube.com/embed/NQOsW6Spuq4',
        videoTitle: 'Open Dollar Governance Proposal App',
    },
    {
        slug: 'web3-portfolio-nft',
        title: 'Web3 Portfolio NFT',
        description: 'Web3 app utilizing TypeScript, React, and Hardhat. Users have the ability to mint commemorative NFTs, showcasing unique generative AI artwork with metadata securely pinned to IPFS.',
        applicationLink: 'https://www.sebidelamata.com/mint',
        repositoryLink: 'https://github.com/sebidelamata/web3_profile',
        videoLink: 'https://www.youtube.com/embed/K-umMAg4uVQ',
        videoTitle: 'Web3 Portfolio NFT',
    },
    {
        slug: 'gaping-pond',
        title: 'Gaping Pond',
        description: "GapingPond is a whitelabel NFT Marketplace using DeFiLlamma and OpenSea APIs. GapingPond provides metrics and interactive charts unavailable on OpenSea.",
        applicationLink: 'https://shoppingcart-e1v.pages.dev/',
        repositoryLink: 'https://github.com/sebidelamata/shoppingCart',
        videoLink: 'https://www.youtube.com/embed/DW4x2mfdgzE',
        videoTitle: 'GapingPond',
    },
]

type Line =
    | { type: "input"; content: string; id: string }
    | { type: "output"; content: React.ReactNode; id: string };

const COMMANDS = ["--help", "ls projects", "whoami", "cat alphaping", "clear"];

let idCounter = 0;
const nextId = () => `line-${idCounter++}`;

const HelpOutput: React.FC = () => (
    <div className="flex flex-col gap-1">
        <p>available commands:</p>
        <dl className="ml-4 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
            <dt className="text-accent">ls projects</dt>
            <dd className="text-fg-dim">list all projects</dd>
            <dt className="text-accent">cat &lt;project&gt;</dt>
            <dd className="text-fg-dim">show details for a project</dd>
            <dt className="text-accent">whoami</dt>
            <dd className="text-fg-dim">who&apos;s behind this</dd>
            <dt className="text-accent">clear</dt>
            <dd className="text-fg-dim">clear the screen</dd>
            <dt className="text-accent">--help</dt>
            <dd className="text-fg-dim">show this again</dd>
        </dl>
    </div>
);

const WhoamiOutput: React.FC = () => (
    <p className="text-fg-dim">
        sebi de la mata — full-stack web3 developer. building on Arbitrum,
        breaking things responsibly, occasionally minting NFTs about it.
    </p>
);

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
                    <Button variant="accent" size="sm">live application</Button>
                </a>
                <a href={project.repositoryLink} target="_blank" rel="noreferrer">
                    <Button variant="default" size="sm">repository</Button>
                </a>
            </div>
        </div>
    );
};

const UnknownOutput: React.FC<{ command: string }> = ({ command }) => (
    <p className="text-fg-dim">
        command not found: <span className="text-fg">{command}</span>. type{" "}
        <span className="text-accent">--help</span> to see what&apos;s available.
    </p>
);

interface TerminalProps {
    onRequestPlainList: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onRequestPlainList }) => {
    const [lines, setLines] = useState<Line[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const booted = useRef(false);

    const pushLine = (line: Omit<Line, "id">) => {
        setLines((prev) => [...prev, { ...line, id: nextId() } as Line]);
    };

    const run = (raw: string) => {
        const command = raw.trim();
        if (!command) return;

        if (command !== "--help" || lines.length > 0) {
            pushLine({ type: "input", content: command });
        }

        const [head, ...rest] = command.split(/\s+/);
        const arg = rest.join(" ");

        switch (head) {
            case "--help":
            case "help":
                pushLine({ type: "output", content: <HelpOutput /> });
                break;
            case "whoami":
                pushLine({ type: "output", content: <WhoamiOutput /> });
                break;
            case "ls":
                pushLine({ type: "output", content: <ListProjectsOutput onRun={run} /> });
                break;
            case "cat":
                if (!arg) {
                    pushLine({
                        type: "output",
                        content: <p className="text-fg-dim">usage: cat &lt;project&gt;</p>,
                    });
                } else {
                    pushLine({ type: "output", content: <CatProjectOutput slug={arg} /> });
                }
                break;
            case "clear":
                setLines([]);
                return;
            default:
                pushLine({ type: "output", content: <UnknownOutput command={command} /> });
        }
    };

    // boot once: seed the terminal as if --help was already run
    useEffect(() => {
        if (booted.current) return;
        booted.current = true;
        pushLine({ type: "input", content: "--help" });
        pushLine({ type: "output", content: <HelpOutput /> });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [lines]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        run(input);
        setInput("");
    };

    const handleChipClick = (cmd: string) => {
        run(cmd);
        inputRef.current?.focus();
    };

    return (
        <div className="border border-border bg-bg-raised">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs text-fg-dim">
                <span className="h-2.5 w-2.5 rounded-full border border-border" />
                <span className="h-2.5 w-2.5 rounded-full border border-border" />
                <span className="h-2.5 w-2.5 rounded-full border border-border" />
                <span className="ml-2">sebi@delamata:~/projects</span>
            </div>

            <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-label="terminal output"
                className="max-h-96 overflow-y-auto px-3 py-3 text-sm"
            >
                {lines.map((line) =>
                    line.type === "input" ? (
                        <p key={line.id} className="mt-3 first:mt-0">
                            <span className="text-accent">$</span>{" "}
                            <span className="text-fg">{line.content}</span>
                        </p>
                    ) : (
                        <div key={line.id} className="mt-1">
                            {line.content}
                        </div>
                    )
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-3 py-2">
                <label htmlFor="terminal-input" className="text-accent">$</label>
                <input
                    id="terminal-input"
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="type a command…"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-dim/60 focus:outline-none"
                />
            </form>

            <div className="flex flex-wrap gap-2 border-t border-border px-3 py-2">
                {COMMANDS.map((cmd) => (
                    <button
                        key={cmd}
                        onClick={() => handleChipClick(cmd)}
                        className="border border-border px-2 py-1 text-xs text-fg-dim transition-colors hover:border-accent hover:text-accent"
                    >
                        {cmd}
                    </button>
                ))}
            </div>

            <div className="border-t border-border px-3 py-2 text-xs">
                <button
                    onClick={onRequestPlainList}
                    className="text-fg-dim underline decoration-fg-dim/40 underline-offset-2 hover:text-accent hover:decoration-accent"
                >
                    prefer a plain list? view projects without the terminal →
                </button>
            </div>
        </div>
    );
};

export default Terminal;