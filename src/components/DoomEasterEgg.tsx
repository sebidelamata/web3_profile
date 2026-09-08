import React, { useEffect, useRef, useState } from "react";

// 1 = red brick, 2 = brown, 3 = grey — purely cosmetic variety
const MAP = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,3,3,0,0,1,0,2,2,0,1],
    [1,0,3,0,0,0,0,0,2,0,0,1],
    [1,0,3,0,1,1,1,0,2,0,1,1],
    [1,0,0,0,1,0,1,0,0,0,0,1],
    [1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,1,0,0,0,0,0,1,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,0,0,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
];

const CANVAS_W = 640;
const CANVAS_H = 360;
const FOV = Math.PI / 3;
const MOVE_SPEED = 3;
const ROT_SPEED = 2.2;
const CAPTURED_KEYS = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"];

interface DoomEasterEggProps {
    onExit: () => void;
}

const DoomEasterEgg: React.FC<DoomEasterEggProps> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const keysRef = useRef<Record<string, boolean>>({});
    const playerRef = useRef({ x: 3.5, y: 3.5, angle: 0 });
    const rafRef = useRef<number>();
    const lastTimeRef = useRef<number>(performance.now());
    const [started, setStarted] = useState(false);

    // give the game keyboard focus as soon as it mounts, and pull it away
    // from the terminal's main input so arrows/WASD don't leak into it
    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            keysRef.current[key] = true;
            if (CAPTURED_KEYS.includes(key)) e.preventDefault();
            if (e.key === "Escape") onExit();
            if (!started) setStarted(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current[e.key.toLowerCase()] = false;
        };

        node.addEventListener("keydown", handleKeyDown);
        node.addEventListener("keyup", handleKeyUp);
        return () => {
            node.removeEventListener("keydown", handleKeyDown);
            node.removeEventListener("keyup", handleKeyUp);
        };
    }, [onExit, started]);

    const isWall = (x: number, y: number) => {
        const mx = Math.floor(x);
        const my = Math.floor(y);
        if (my < 0 || my >= MAP.length || mx < 0 || mx >= MAP[0].length) return true;
        return MAP[my][mx] !== 0;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const update = (dt: number) => {
            const keys = keysRef.current;
            const player = playerRef.current;

            if (keys["arrowleft"]) player.angle -= ROT_SPEED * dt;
            if (keys["arrowright"]) player.angle += ROT_SPEED * dt;

            let moveX = 0;
            let moveY = 0;
            if (keys["w"] || keys["arrowup"]) {
                moveX += Math.cos(player.angle);
                moveY += Math.sin(player.angle);
            }
            if (keys["s"] || keys["arrowdown"]) {
                moveX -= Math.cos(player.angle);
                moveY -= Math.sin(player.angle);
            }
            if (keys["a"]) {
                moveX += Math.cos(player.angle - Math.PI / 2);
                moveY += Math.sin(player.angle - Math.PI / 2);
            }
            if (keys["d"]) {
                moveX += Math.cos(player.angle + Math.PI / 2);
                moveY += Math.sin(player.angle + Math.PI / 2);
            }

            const len = Math.hypot(moveX, moveY);
            if (len > 0) {
                const nextX = player.x + (moveX / len) * MOVE_SPEED * dt;
                const nextY = player.y + (moveY / len) * MOVE_SPEED * dt;
                if (!isWall(nextX, player.y)) player.x = nextX;
                if (!isWall(player.x, nextY)) player.y = nextY;
            }
        };

        const render = () => {
            const player = playerRef.current;

            ctx.fillStyle = "#161616";
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H / 2);
            ctx.fillStyle = "#332417";
            ctx.fillRect(0, CANVAS_H / 2, CANVAS_W, CANVAS_H / 2);

            const wallColors: Record<number, [number, number, number]> = {
                1: [150, 32, 32],
                2: [110, 70, 35],
                3: [80, 80, 85],
            };

            for (let col = 0; col < CANVAS_W; col++) {
                const rayAngle = player.angle - FOV / 2 + (col / CANVAS_W) * FOV;
                const dx = Math.cos(rayAngle);
                const dy = Math.sin(rayAngle);

                let distance = 0;
                let wallValue = 1;
                let hit = false;
                let rx = player.x;
                let ry = player.y;
                const step = 0.02;

                while (!hit && distance < 20) {
                    rx += dx * step;
                    ry += dy * step;
                    distance += step;
                    if (isWall(rx, ry)) {
                        hit = true;
                        wallValue = MAP[Math.floor(ry)][Math.floor(rx)];
                    }
                }

                const corrected = distance * Math.cos(rayAngle - player.angle);
                const wallHeight = Math.min(CANVAS_H, CANVAS_H / (corrected || 0.0001));
                const shade = Math.max(0.15, 1 - corrected / 10);
                const [r, g, b] = wallColors[wallValue] || wallColors[1];

                ctx.fillStyle = `rgb(${r * shade}, ${g * shade}, ${b * shade})`;
                ctx.fillRect(col, (CANVAS_H - wallHeight) / 2, 1, wallHeight);
            }

            ctx.strokeStyle = "#e33";
            ctx.beginPath();
            ctx.moveTo(CANVAS_W / 2 - 6, CANVAS_H / 2);
            ctx.lineTo(CANVAS_W / 2 + 6, CANVAS_H / 2);
            ctx.moveTo(CANVAS_W / 2, CANVAS_H / 2 - 6);
            ctx.lineTo(CANVAS_W / 2, CANVAS_H / 2 + 6);
            ctx.stroke();
        };

        const loop = (time: number) => {
            const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
            lastTimeRef.current = time;
            update(dt);
            render();
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} tabIndex={0} className="relative w-fit outline-none">
            <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="border border-border" />
            {!started && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-center text-xs text-fg">
                    <div>
                        <p className="mb-1 text-accent">click here — WASD to move, arrows to turn</p>
                        <p>ESC to quit</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// wraps the game so it can replace itself with an exit message without
// the parent Terminal needing to reach back into its own lines[] state
export const DoomWrapper: React.FC<{ onFocusInput: () => void }> = ({ onFocusInput }) => {
    const [exited, setExited] = useState(false);

    if (exited) {
        return <p className="text-fg-dim">// IDDQD deactivated. segmentation fault (just kidding)</p>;
    }

    return (
        <DoomEasterEgg
            onExit={() => {
                setExited(true);
                onFocusInput();
            }}
        />
    );
};

export default DoomEasterEgg;