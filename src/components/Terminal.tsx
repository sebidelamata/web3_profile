import React, { useEffect, useRef, useState } from "react";
import Scheduler from "./Scheduler";
import HelpOutput from "./HelpOutput";
import WhoamiOutput from "./WhoAmIOutput";
import ListProjectsOutput from "./ListProjectsOutput";
import ListTechStackOutput from "./ListStackOutput";
import CatProjectOutput from "./CatProjectOutput";
import UnknownOutput from "./UnknownOutput";
import ConnectOutput from "./ConnectOutput";

type Line =
    | { type: "input"; content: string; id: string }
    | { type: "output"; content: React.ReactNode; id: string };

const COMMANDS = ["--help", "ls stack", "ls projects", "whoami", "cat alphaping", "clear", "contact", "connect"];

let idCounter = 0;
const nextId = () => `line-${idCounter++}`;

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
                if (arg === "projects") {
                    pushLine({ type: "output", content: <ListProjectsOutput onRun={run} /> });
                } else if (arg === "stack") {
                    pushLine({ type: "output", content: <ListTechStackOutput onRun={run} /> });
                } else {
                    pushLine({
                        type: "output",
                        content: (
                            <p className="text-fg-dim">
                                usage: ls &lt;projects|stack&gt;
                            </p>
                        ),
                    });
                }
                break;
            case "contact":
                pushLine({ type: "output", content: <Scheduler/> });
                break;
            case "connect":
                pushLine({ type: "output", content: <ConnectOutput /> });
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
                <span className="ml-2">sebi@delamata:~/</span>
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
        </div>
    );
};

export default Terminal;