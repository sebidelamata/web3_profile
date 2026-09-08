import React, { useEffect, useRef, useState } from "react";
import Scheduler from "./Scheduler";
import HelpOutput from "./HelpOutput";
import ListProjectsOutput from "./ListProjectsOutput";
import ListTechStackOutput from "./ListStackOutput";
import CatProjectOutput from "./CatProjectOutput";
import UnknownOutput from "./UnknownOutput";
import ConnectOutput from "./ConnectOutput";
import Mint from "../routes/Mint";
import Contacts from "./Contacts";
import Resume from "../routes/Resume";
import ListReportsOutput from "./ListReports";
import CatReportOutput from "./CatReportOutput";
import { REPORTS } from "../lib/Reports"; // adjust path to wherever Reports.ts actually lives
import { PROJECTS } from "../lib/Projects"; // adjust path to wherever Projects.ts actually lives

type Line =
    | { type: "input"; content: string; id: string }
    | { type: "output"; content: React.ReactNode; id: string };

const COMMANDS = [
    "--help",
    "ls stack",
    "ls security",
    "ls projects",
    "whoami",
    "cat security/snowman-merkle-airdrop",
    "cat projects/alphaping",
    "clear",
    "ping",
    "cron",
    "connect",
    "mint"
];

const HISTORY_KEY = "delamata-terminal-history";
const MAX_HISTORY = 100;

// pseudo-directories available under "cat"
const CAT_DIRS = ["security/", "projects/"];
const SECURITY_SLUGS = REPORTS.map((r) => r.title);
const PROJECT_SLUGS = PROJECTS.map((p) => p.slug);

let idCounter = 0;
const nextId = () => `line-${idCounter++}`;

interface CompletionContext {
    prefix: string; // everything before the word being completed, e.g. "cat "
    word: string; // the partial word being completed
    candidates: string[]; // full replacement values for `word`
}

const longestCommonPrefix = (strs: string[]): string => {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
    }
    return prefix;
};

// only "cat <pseudo-dir>/<slug>" gets completion — nothing else in this
// terminal resembles a real filesystem, so we don't try to complete
// command names (no "l" -> "ls").
// only "cat <pseudo-dir>/<slug>" and "ls <pseudo-dir>" get completion —
// nothing else in this terminal resembles a real filesystem, so we don't
// try to complete command names themselves (no "l" -> "ls").
const LS_TARGETS = ["security", "projects", "stack"];

const getCompletionContext = (input: string): CompletionContext | null => {
    const trailingSpace = /\s$/.test(input);
    const parts = input.split(/\s+/).filter(Boolean);

    if (parts[0] !== "cat" && parts[0] !== "ls") return null;
    // still typing the command itself (e.g. "ca", "l") — not a completion target
    if (parts.length === 1 && !trailingSpace) return null;

    const word = parts.length === 2 && !trailingSpace ? parts[1] : "";
    const prefix = `${parts[0]} `;

    if (parts[0] === "ls") {
        return {
            prefix,
            word,
            candidates: LS_TARGETS.filter((t) => t.startsWith(word)),
        };
    }

    // parts[0] === "cat"
    if (word.includes("/")) {
        const [dir, ...rest] = word.split("/");
        const sub = rest.join("/");
        let slugs: string[] = [];
        if (dir === "security") slugs = SECURITY_SLUGS;
        else if (dir === "projects") slugs = PROJECT_SLUGS;
        else return { prefix, word, candidates: [] };

        return {
            prefix,
            word,
            candidates: slugs.filter((s) => s.startsWith(sub)).map((s) => `${dir}/${s}`),
        };
    }

    return {
        prefix,
        word,
        candidates: CAT_DIRS.filter((d) => d.startsWith(word)),
    };
};

interface TerminalProps {
    onRequestPlainList: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onRequestPlainList }) => {
    const [lines, setLines] = useState<Line[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const booted = useRef(false);

    // command history state, seeded from sessionStorage
    const [history, setHistory] = useState<string[]>(() => {
        try {
            const saved = sessionStorage.getItem(HISTORY_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [historyIndex, setHistoryIndex] = useState(-1); // -1 = not browsing
    const draftRef = useRef("");

    // tracks the last input value we tab-completed against, so a second
    // consecutive Tab (with no typing in between) can show the match list
    const lastTabInputRef = useRef<string | null>(null);

    useEffect(() => {
        try {
            sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        } catch {
            // sessionStorage unavailable (private mode, etc) — fail silently
        }
    }, [history]);

    const pushLine = (line: Omit<Line, "id">) => {
        setLines((prev) => [...prev, { ...line, id: nextId() } as Line]);
    };

    const run = (raw: string) => {
        const command = raw.trim();
        if (!command) return;

        if (command !== "--help" || lines.length > 0) {
            pushLine({ type: "input", content: command });
        }

        setHistory((prev) => {
            if (prev[prev.length - 1] === command) return prev;
            return [...prev, command].slice(-MAX_HISTORY);
        });
        setHistoryIndex(-1);
        draftRef.current = "";

        const [head, ...rest] = command.split(/\s+/);
        const arg = rest.join(" ");

        switch (head) {
            case "--help":
            case "help":
                pushLine({ type: "output", content: <HelpOutput /> });
                break;
            case "ls":
                if (arg === "projects") {
                    pushLine({ type: "output", content: <ListProjectsOutput onRun={run} /> });
                } else if (arg === "stack") {
                    pushLine({ type: "output", content: <ListTechStackOutput onRun={run} /> });
                } else if (arg === "security") {
                    pushLine({ type: "output", content: <ListReportsOutput onRun={run} /> });
                } else {
                    pushLine({
                        type: "output",
                        content: (
                            <p className="text-fg-dim">
                                usage: ls &lt;security|projects|stack&gt;
                            </p>
                        ),
                    });
                }
                break;
            case "ping":
                pushLine({ type: "output", content: <Contacts /> });
                break;
            case "cron":
                pushLine({ type: "output", content: <Scheduler/> });
                break;
            case "connect":
                pushLine({ type: "output", content: <ConnectOutput /> });
                break;
            case "mint":
                pushLine({ type: "output", content: <Mint /> });
                break;
            case "cat":
                if (!arg) {
                    pushLine({
                        type: "output",
                        content: <p className="text-fg-dim">usage: cat &lt;report|project&gt;</p>,
                    });
                } else {
                    let [path, ...rest] = arg.split("/");
                    if (path === "projects") {
                        pushLine({ type: "output", content: <CatProjectOutput slug={rest.join("/")} /> });
                    } else if (path === "security") {
                        pushLine({ type: "output", content: <CatReportOutput title={rest.join("/")} /> });
                    }
                }
                break;
            case "whoami":
                pushLine({ type: "output", content: <Resume /> });
                break;
            case "clear":
                setLines([]);
                return;
            default:
                pushLine({ type: "output", content: <UnknownOutput command={command} /> });
        }
    };

    useEffect(() => {
        if (booted.current) return;
        booted.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [lines]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        run(input);
        setInput("");
        lastTabInputRef.current = null;
    };

    const handleTab = () => {
        const ctx = getCompletionContext(input);
        if (!ctx || ctx.candidates.length === 0) {
            lastTabInputRef.current = null;
            return;
        }

        if (ctx.candidates.length === 1) {
            setInput(ctx.prefix + ctx.candidates[0]);
            lastTabInputRef.current = null;
            return;
        }

        const lcp = longestCommonPrefix(ctx.candidates);
        const completed = ctx.prefix + lcp;

        if (lcp !== ctx.word) {
            // can extend unambiguously, even if not a full match yet
            setInput(completed);
            lastTabInputRef.current = completed;
            return;
        }

        // already at the longest common prefix — second consecutive Tab
        // shows the options, like a real shell's double-tab
        if (lastTabInputRef.current === input) {
            pushLine({
                type: "output",
                content: <p className="text-fg-dim">{ctx.candidates.join("  ")}</p>,
            });
        }
        lastTabInputRef.current = input;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            handleTab();
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0) return;

            if (historyIndex === -1) {
                draftRef.current = input;
            }
            const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);

            setHistoryIndex(nextIndex);
            setInput(history[nextIndex]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === -1) return;

            const nextIndex = historyIndex + 1;
            if (nextIndex >= history.length) {
                setHistoryIndex(-1);
                setInput(draftRef.current);
            } else {
                setHistoryIndex(nextIndex);
                setInput(history[nextIndex]);
            }
        }

        // any key other than Tab means we're no longer in a tab-cycle
        if (e.key !== "Tab") {
            lastTabInputRef.current = null;
        }
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
                <span className="ml-2">sebi@de_la_mata:~$</span>
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
                    onChange={(e) => {
                        setInput(e.target.value);
                        lastTabInputRef.current = null;
                    }}
                    onKeyDown={handleKeyDown}
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