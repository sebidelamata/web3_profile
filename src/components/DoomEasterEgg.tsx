import React, { useEffect, useRef, useState } from "react";

// ---------- levels ----------
const LEVEL_1_MAP = [
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

const LEVEL_2_MAP = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,1],
    [1,0,3,0,1,0,1,1,1,0,1,0,3,1],
    [1,0,0,0,0,0,1,0,1,0,0,0,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,1],
    [1,0,2,1,1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,0,1,1,1,1,0,1,1,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,0,3,1],
    [1,0,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

type EnemyType = "rugpuller" | "fudlord" | "exitscammer";
type EnemyState = "idle" | "chase" | "attack";

interface Enemy {
    id: number;
    type: EnemyType;
    x: number;
    y: number;
    spawnX: number;
    spawnY: number;
    health: number;
    alive: boolean;
    state: EnemyState;
    attackCooldown: number;
    winding: boolean;
    windupTimer: number;
    alertTimer: number; // shows "!" briefly after spotting the player
    giveUpTimer: number; // seconds without line-of-sight while chasing
    wanderTarget: { x: number; y: number } | null;
    animPhase: number;
    speedFactor: number; // slight per-enemy variance so movement isn't robotic
}

interface Pickup {
    id: number;
    x: number;
    y: number;
    kind: "shotgun-ammo";
    collected: boolean;
}

interface LevelDef {
    name: string;
    map: number[][];
    playerStart: { x: number; y: number; angle: number };
    enemies: { id: number; type: EnemyType; x: number; y: number }[];
    pickups: Omit<Pickup, "collected">[];
}

const ENEMY_MAX_HEALTH = 60;

const LEVELS: LevelDef[] = [
    {
        name: "Level 1 — The Mempool",
        map: LEVEL_1_MAP,
        playerStart: { x: 3.5, y: 3.5, angle: 0 },
        enemies: [
            { id: 1, type: "rugpuller", x: 8.5, y: 2.5 },
            { id: 2, type: "fudlord", x: 9.5, y: 8.5 },
            { id: 3, type: "exitscammer", x: 2.5, y: 9.5 },
            { id: 4, type: "rugpuller", x: 5.5, y: 6.5 },
        ],
        pickups: [{ id: 1, x: 6.5, y: 9.5, kind: "shotgun-ammo" }],
    },
    {
        name: "Level 2 — The Bridge Exploit",
        map: LEVEL_2_MAP,
        playerStart: { x: 1.5, y: 1.5, angle: 0 },
        enemies: [
            { id: 1, type: "fudlord", x: 11.5, y: 1.5 },
            { id: 2, type: "rugpuller", x: 12.5, y: 10.5 },
            { id: 3, type: "exitscammer", x: 2.5, y: 10.5 },
            { id: 4, type: "fudlord", x: 6.5, y: 6.5 },
            { id: 5, type: "exitscammer", x: 9.5, y: 4.5 },
        ],
        pickups: [
            { id: 1, x: 3.5, y: 6.5, kind: "shotgun-ammo" },
            { id: 2, x: 10.5, y: 8.5, kind: "shotgun-ammo" },
        ],
    },
];

const CANVAS_W = 640;
const CANVAS_H = 360;
const FOV = Math.PI / 3;
const MOVE_SPEED = 3;
const ROT_SPEED = 2.2;
const CAPTURED_KEYS = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", " ", "1", "2"];
const RAY_STEP = 0.02;
const PLAYER_MAX_HEALTH = 100;
const PICKUP_RADIUS = 0.5;

// ---------- enemy behavior tuning ----------
const DETECTION_RANGE = 7;
const GIVE_UP_RANGE = 11;
const GIVE_UP_TIME = 3; // seconds without line-of-sight before reverting to idle
const WANDER_RADIUS = 1.4;
const WANDER_SPEED = 0.5;
const CHASE_SPEED = 1.15;
const ENEMY_ATTACK_RANGE = 1.0;
const ATTACK_WINDUP = 0.45; // telegraph before a hit lands
const ENEMY_ATTACK_DAMAGE = 6;
const ENEMY_ATTACK_COOLDOWN = 1.1;
const PLAYER_HIT_INVULN = 0.5;

// ---------- weapons ----------
type WeaponKind = "pistol" | "shotgun";

const WEAPONS: Record<WeaponKind, {
    damage: number;
    cooldown: number;
    pellets: number;
    spread: number;
    tolerance: number;
    infiniteAmmo: boolean;
}> = {
    pistol: { damage: 34, cooldown: 0.35, pellets: 1, spread: 0, tolerance: 0.12, infiniteAmmo: true },
    shotgun: { damage: 16, cooldown: 0.8, pellets: 5, spread: 0.3, tolerance: 0.09, infiniteAmmo: false },
};

const normalizeAngle = (a: number) => {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
};

// ---------- sound (synthesized, no external assets) ----------
class Sound {
    private ctx: AudioContext | null = null;

    private get audioCtx() {
        if (!this.ctx) {
            const AC = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AC();
        }
        return this.ctx;
    }

    private tone(freq: number, duration: number, type: OscillatorType, gainStart = 0.15) {
        try {
            const ctx = this.audioCtx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(gainStart, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch {
            // audio unavailable — fail silently
        }
    }

    shoot(kind: WeaponKind) {
        if (kind === "shotgun") {
            this.tone(180, 0.18, "sawtooth", 0.2);
            this.tone(90, 0.22, "square", 0.12);
        } else {
            this.tone(340, 0.09, "square", 0.15);
        }
    }
    hit() { this.tone(220, 0.08, "square", 0.12); }
    enemyDeath() { this.tone(140, 0.25, "sawtooth", 0.15); }
    playerHurt() { this.tone(90, 0.15, "sawtooth", 0.18); }
    playerDeath() { this.tone(70, 0.6, "sawtooth", 0.2); }
    pickup() {
        this.tone(520, 0.1, "sine", 0.12);
        this.tone(700, 0.1, "sine", 0.1);
    }
    levelClear() {
        this.tone(440, 0.15, "sine", 0.15);
        this.tone(660, 0.2, "sine", 0.15);
    }
    alert() { this.tone(500, 0.06, "square", 0.08); }
}

const makeEnemies = (level: LevelDef): Enemy[] =>
    level.enemies.map((e) => ({
        id: e.id,
        type: e.type,
        x: e.x,
        y: e.y,
        spawnX: e.x,
        spawnY: e.y,
        health: ENEMY_MAX_HEALTH,
        alive: true,
        state: "idle",
        attackCooldown: 0,
        winding: false,
        windupTimer: 0,
        alertTimer: 0,
        giveUpTimer: 0,
        wanderTarget: null,
        animPhase: Math.random() * 10,
        speedFactor: 0.85 + Math.random() * 0.3,
    }));

interface DoomEasterEggProps {
    onExit: () => void;
}

const DoomEasterEgg: React.FC<DoomEasterEggProps> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const keysRef = useRef<Record<string, boolean>>({});
    const soundRef = useRef(new Sound());

    const levelIndexRef = useRef(0);
    const playerRef = useRef({ ...LEVELS[0].playerStart, health: PLAYER_MAX_HEALTH, invulnTimer: 0 });
    const enemiesRef = useRef<Enemy[]>(makeEnemies(LEVELS[0]));
    const pickupsRef = useRef<Pickup[]>(LEVELS[0].pickups.map((p) => ({ ...p, collected: false })));
    const weaponRef = useRef<WeaponKind>("pistol");
    const shotgunAmmoRef = useRef(0);
    const shootCooldownRef = useRef(0);
    const flashRef = useRef(0);

    const rafRef = useRef<number>();
    const lastTimeRef = useRef<number>(performance.now());
    const [started, setStarted] = useState(false);
    const [gameState, setGameState] = useState<"playing" | "dead" | "levelClear" | "won">("playing");
    const [hud, setHud] = useState({
        health: PLAYER_MAX_HEALTH,
        kills: 0,
        total: enemiesRef.current.length,
        weapon: "pistol" as WeaponKind,
        shotgunAmmo: 0,
        levelName: LEVELS[0].name,
    });

    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    const loadLevel = (index: number, carryHealth: number) => {
        const level = LEVELS[index];
        levelIndexRef.current = index;
        playerRef.current = { ...level.playerStart, health: carryHealth, invulnTimer: 0 };
        enemiesRef.current = makeEnemies(level);
        pickupsRef.current = level.pickups.map((p) => ({ ...p, collected: false }));
        shootCooldownRef.current = 0;
        setGameState("playing");
        setHud({
            health: carryHealth,
            kills: 0,
            total: enemiesRef.current.length,
            weapon: weaponRef.current,
            shotgunAmmo: shotgunAmmoRef.current,
            levelName: level.name,
        });
    };

    const resetGame = () => {
        weaponRef.current = "pistol";
        shotgunAmmoRef.current = 0;
        loadLevel(0, PLAYER_MAX_HEALTH);
    };

    const isWall = (map: number[][], x: number, y: number) => {
        const mx = Math.floor(x);
        const my = Math.floor(y);
        if (my < 0 || my >= map.length || mx < 0 || mx >= map[0].length) return true;
        return map[my][mx] !== 0;
    };

    const castWallDistance = (map: number[][], fromX: number, fromY: number, angle: number, maxDist: number) => {
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        let distance = 0;
        let rx = fromX;
        let ry = fromY;
        while (distance < maxDist) {
            rx += dx * RAY_STEP;
            ry += dy * RAY_STEP;
            distance += RAY_STEP;
            if (isWall(map, rx, ry)) return distance;
        }
        return maxDist;
    };

    const hasLineOfSight = (map: number[][], fromX: number, fromY: number, toX: number, toY: number) => {
        const dist = Math.hypot(toX - fromX, toY - fromY);
        const angle = Math.atan2(toY - fromY, toX - fromX);
        const wallDist = castWallDistance(map, fromX, fromY, angle, dist);
        return wallDist >= dist - 0.1;
    };

    const performShot = () => {
        if (gameState !== "playing") return;
        if (shootCooldownRef.current > 0) return;

        const kind = weaponRef.current;
        const weapon = WEAPONS[kind];
        if (!weapon.infiniteAmmo && shotgunAmmoRef.current <= 0) return;

        shootCooldownRef.current = weapon.cooldown;
        flashRef.current = 0.08;
        soundRef.current.shoot(kind);
        if (!weapon.infiniteAmmo) {
            shotgunAmmoRef.current -= 1;
            setHud((h) => ({ ...h, shotgunAmmo: shotgunAmmoRef.current }));
        }

        const player = playerRef.current;
        const map = LEVELS[levelIndexRef.current].map;
        let anyHit = false;

        for (let p = 0; p < weapon.pellets; p++) {
            const pelletAngle =
                weapon.pellets === 1 ? player.angle : player.angle + (Math.random() * 2 - 1) * weapon.spread;

            let closest: Enemy | null = null;
            let closestDist = Infinity;

            for (const enemy of enemiesRef.current) {
                if (!enemy.alive) continue;
                const dx = enemy.x - player.x;
                const dy = enemy.y - player.y;
                const dist = Math.hypot(dx, dy);
                const angleTo = Math.atan2(dy, dx);
                const diff = Math.abs(normalizeAngle(angleTo - pelletAngle));
                if (diff > weapon.tolerance) continue;
                if (!hasLineOfSight(map, player.x, player.y, enemy.x, enemy.y)) continue;

                if (dist < closestDist) {
                    closestDist = dist;
                    closest = enemy;
                }
            }

            if (closest) {
                anyHit = true;
                // getting shot immediately alerts the enemy, even from behind/idle
                if (closest.state === "idle") {
                    closest.state = "chase";
                    closest.alertTimer = 0.7;
                    soundRef.current.alert();
                }
                closest.giveUpTimer = 0;
                closest.health -= weapon.damage;
                if (closest.health <= 0) closest.alive = false;
            }
        }

        if (anyHit) {
            soundRef.current.hit();
            const kills = enemiesRef.current.filter((e) => !e.alive).length;
            const justCleared = kills > 0 && kills === enemiesRef.current.length;
            setHud((h) => ({ ...h, kills }));
            if (justCleared) {
                soundRef.current.enemyDeath();
                const isLast = levelIndexRef.current === LEVELS.length - 1;
                setGameState(isLast ? "won" : "levelClear");
                if (!isLast) soundRef.current.levelClear();
            }
        }
    };

    const switchWeapon = (kind: WeaponKind) => {
        if (kind === weaponRef.current) return;
        weaponRef.current = kind;
        setHud((h) => ({ ...h, weapon: kind }));
    };

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            keysRef.current[key] = true;
            if (CAPTURED_KEYS.includes(key)) e.preventDefault();
            if (e.key === "Escape") onExit();
            if (key === "1") switchWeapon("pistol");
            if (key === "2") switchWeapon("shotgun");
            if (key === "r" && gameState === "dead") resetGame();
            if (key === "n" && gameState === "levelClear") {
                loadLevel(levelIndexRef.current + 1, playerRef.current.health);
            }
            if (!started) setStarted(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current[e.key.toLowerCase()] = false;
        };
        const handleClick = () => {
            if (!started) setStarted(true);
            performShot();
        };

        node.addEventListener("keydown", handleKeyDown);
        node.addEventListener("keyup", handleKeyUp);
        node.addEventListener("click", handleClick);
        return () => {
            node.removeEventListener("keydown", handleKeyDown);
            node.removeEventListener("keyup", handleKeyUp);
            node.removeEventListener("click", handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onExit, started, gameState]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const update = (dt: number) => {
            const keys = keysRef.current;
            const player = playerRef.current;
            const map = LEVELS[levelIndexRef.current].map;

            shootCooldownRef.current = Math.max(0, shootCooldownRef.current - dt);
            flashRef.current = Math.max(0, flashRef.current - dt);
            player.invulnTimer = Math.max(0, player.invulnTimer - dt);

            if (gameState !== "playing") return;

            if (keys[" "]) performShot();

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
                if (!isWall(map, nextX, player.y)) player.x = nextX;
                if (!isWall(map, player.x, nextY)) player.y = nextY;
            }

            // pickups
            for (const pickup of pickupsRef.current) {
                if (pickup.collected) continue;
                if (Math.hypot(pickup.x - player.x, pickup.y - player.y) < PICKUP_RADIUS) {
                    pickup.collected = true;
                    if (pickup.kind === "shotgun-ammo") {
                        shotgunAmmoRef.current += 8;
                        soundRef.current.pickup();
                        setHud((h) => ({ ...h, shotgunAmmo: shotgunAmmoRef.current }));
                    }
                }
            }

            // ---------- enemy AI ----------
            let damageTaken = 0;

            for (const enemy of enemiesRef.current) {
                if (!enemy.alive) continue;

                enemy.attackCooldown = Math.max(0, enemy.attackCooldown - dt);
                enemy.alertTimer = Math.max(0, enemy.alertTimer - dt);

                const distToPlayer = Math.hypot(player.x - enemy.x, player.y - enemy.y);
                const sees =
                    distToPlayer <= DETECTION_RANGE &&
                    hasLineOfSight(map, enemy.x, enemy.y, player.x, player.y);

                if (enemy.state === "idle") {
                    // gentle wander near spawn point
                    if (!enemy.wanderTarget || Math.hypot(enemy.wanderTarget.x - enemy.x, enemy.wanderTarget.y - enemy.y) < 0.15) {
                        let candidate = null;
                        for (let attempt = 0; attempt < 5; attempt++) {
                            const angle = Math.random() * Math.PI * 2;
                            const r = Math.random() * WANDER_RADIUS;
                            const tx = enemy.spawnX + Math.cos(angle) * r;
                            const ty = enemy.spawnY + Math.sin(angle) * r;
                            if (!isWall(map, tx, ty)) {
                                candidate = { x: tx, y: ty };
                                break;
                            }
                        }
                        enemy.wanderTarget = candidate;
                    }
                    if (enemy.wanderTarget) {
                        const dx = enemy.wanderTarget.x - enemy.x;
                        const dy = enemy.wanderTarget.y - enemy.y;
                        const d = Math.hypot(dx, dy);
                        if (d > 0.05) {
                            const nx = enemy.x + (dx / d) * WANDER_SPEED * enemy.speedFactor * dt;
                            const ny = enemy.y + (dy / d) * WANDER_SPEED * enemy.speedFactor * dt;
                            if (!isWall(map, nx, enemy.y)) enemy.x = nx;
                            if (!isWall(map, enemy.x, ny)) enemy.y = ny;
                            enemy.animPhase += dt * 3;
                        }
                    }

                    if (sees) {
                        enemy.state = "chase";
                        enemy.alertTimer = 0.7;
                        enemy.giveUpTimer = 0;
                        soundRef.current.alert();
                    }
                } else if (enemy.state === "chase") {
                    if (sees) {
                        enemy.giveUpTimer = 0;
                    } else {
                        enemy.giveUpTimer += dt;
                        if (enemy.giveUpTimer > GIVE_UP_TIME || distToPlayer > GIVE_UP_RANGE) {
                            enemy.state = "idle";
                            enemy.spawnX = enemy.x;
                            enemy.spawnY = enemy.y;
                            enemy.wanderTarget = null;
                            continue;
                        }
                    }

                    if (distToPlayer <= ENEMY_ATTACK_RANGE) {
                        enemy.state = "attack";
                        enemy.winding = false;
                    } else {
                        const dx = player.x - enemy.x;
                        const dy = player.y - enemy.y;
                        const nx = enemy.x + (dx / distToPlayer) * CHASE_SPEED * enemy.speedFactor * dt;
                        const ny = enemy.y + (dy / distToPlayer) * CHASE_SPEED * enemy.speedFactor * dt;
                        if (!isWall(map, nx, enemy.y)) enemy.x = nx;
                        if (!isWall(map, enemy.x, ny)) enemy.y = ny;
                        enemy.animPhase += dt * 6;
                    }
                } else if (enemy.state === "attack") {
                    if (distToPlayer > ENEMY_ATTACK_RANGE * 1.4) {
                        enemy.state = "chase";
                        enemy.winding = false;
                    } else if (enemy.attackCooldown <= 0) {
                        if (!enemy.winding) {
                            enemy.winding = true;
                            enemy.windupTimer = ATTACK_WINDUP;
                        } else {
                            enemy.windupTimer -= dt;
                            if (enemy.windupTimer <= 0) {
                                enemy.winding = false;
                                enemy.attackCooldown = ENEMY_ATTACK_COOLDOWN;
                                if (player.invulnTimer <= 0) {
                                    damageTaken += ENEMY_ATTACK_DAMAGE;
                                }
                            }
                        }
                    }
                }
            }

            if (damageTaken > 0) {
                player.health = Math.max(0, player.health - damageTaken);
                player.invulnTimer = PLAYER_HIT_INVULN;
                soundRef.current.playerHurt();
                setHud((h) => ({ ...h, health: player.health }));
                if (player.health <= 0) {
                    soundRef.current.playerDeath();
                    setGameState("dead");
                }
            }
        };

        const render = () => {
            const player = playerRef.current;
            const map = LEVELS[levelIndexRef.current].map;
            const zBuffer = new Array(CANVAS_W).fill(Infinity);

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

                while (!hit && distance < 20) {
                    rx += dx * RAY_STEP;
                    ry += dy * RAY_STEP;
                    distance += RAY_STEP;
                    if (isWall(map, rx, ry)) {
                        hit = true;
                        wallValue = map[Math.floor(ry)][Math.floor(rx)];
                    }
                }

                const corrected = distance * Math.cos(rayAngle - player.angle);
                zBuffer[col] = corrected;
                const wallHeight = Math.min(CANVAS_H, CANVAS_H / (corrected || 0.0001));
                const shade = Math.max(0.15, 1 - corrected / 10);
                const [r, g, b] = wallColors[wallValue] || wallColors[1];

                ctx.fillStyle = `rgb(${r * shade}, ${g * shade}, ${b * shade})`;
                ctx.fillRect(col, (CANVAS_H - wallHeight) / 2, 1, wallHeight);
            }

            const sortedEnemies = [...enemiesRef.current]
                .filter((e) => e.alive)
                .map((e) => ({ enemy: e, dist: Math.hypot(e.x - player.x, e.y - player.y) }))
                .sort((a, b) => b.dist - a.dist);

            for (const { enemy, dist } of sortedEnemies) {
                const angleTo = Math.atan2(enemy.y - player.y, enemy.x - player.x);
                const relAngle = normalizeAngle(angleTo - player.angle);
                if (Math.abs(relAngle) > FOV / 2 + 0.2) continue;

                const screenX = (0.5 + relAngle / FOV) * CANVAS_W;
                const spriteSize = Math.min(CANVAS_H, (CANVAS_H / dist) * 0.7);
                const colIndex = Math.max(0, Math.min(CANVAS_W - 1, Math.floor(screenX)));
                if (zBuffer[colIndex] < dist) continue;

                const shade = Math.max(0.25, 1 - dist / 10);
                const bob = enemy.state === "idle"
                    ? Math.sin(enemy.animPhase) * spriteSize * 0.015
                    : Math.abs(Math.sin(enemy.animPhase)) * spriteSize * 0.03;
                const top = (CANVAS_H - spriteSize) / 2 + bob;

                drawEnemySprite(ctx, enemy.type, screenX, top, spriteSize, shade, enemy.winding);

                // health sliver
                const healthPct = enemy.health / ENEMY_MAX_HEALTH;
                ctx.fillStyle = "#400";
                ctx.fillRect(screenX - spriteSize * 0.2, top - 8, spriteSize * 0.4, 3);
                ctx.fillStyle = "#e33";
                ctx.fillRect(screenX - spriteSize * 0.2, top - 8, spriteSize * 0.4 * healthPct, 3);

                // alert flash
                if (enemy.alertTimer > 0) {
                    ctx.fillStyle = "#ff3";
                    ctx.font = `bold ${Math.max(10, spriteSize * 0.22)}px monospace`;
                    ctx.fillText("!", screenX - spriteSize * 0.03, top - 14);
                }

                // attack telegraph ring
                if (enemy.winding) {
                    const pulse = 1 - enemy.windupTimer / ATTACK_WINDUP;
                    ctx.strokeStyle = `rgba(255, 60, 60, ${0.8 - pulse * 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(screenX, top + spriteSize * 0.5, spriteSize * (0.35 + pulse * 0.15), 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // pickups
            for (const pickup of pickupsRef.current) {
                if (pickup.collected) continue;
                const dx = pickup.x - player.x;
                const dy = pickup.y - player.y;
                const dist = Math.hypot(dx, dy);
                const angleTo = Math.atan2(dy, dx);
                const relAngle = normalizeAngle(angleTo - player.angle);
                if (Math.abs(relAngle) > FOV / 2 + 0.2) continue;

                const screenX = (0.5 + relAngle / FOV) * CANVAS_W;
                const size = Math.min(60, CANVAS_H / dist / 4);
                const colIndex = Math.max(0, Math.min(CANVAS_W - 1, Math.floor(screenX)));
                if (zBuffer[colIndex] < dist) continue;

                const top = CANVAS_H / 2 + Math.min(60, 30 / Math.max(dist, 0.5));
                ctx.fillStyle = "#e8c23a";
                ctx.fillRect(screenX - size / 2, top - size / 2, size, size * 0.6);
                ctx.fillStyle = "#3a2c0a";
                ctx.font = `${Math.max(8, size * 0.35)}px monospace`;
                ctx.fillText("S", screenX - size * 0.12, top + size * 0.08);
            }

            // damage vignette while invulnerable (visual feedback you got hit)
            if (player.invulnTimer > 0) {
                const alpha = (player.invulnTimer / PLAYER_HIT_INVULN) * 0.25;
                ctx.fillStyle = `rgba(200, 0, 0, ${alpha})`;
                ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
            }

            ctx.strokeStyle = flashRef.current > 0 ? "#fff" : "#e33";
            ctx.beginPath();
            ctx.moveTo(CANVAS_W / 2 - 6, CANVAS_H / 2);
            ctx.lineTo(CANVAS_W / 2 + 6, CANVAS_H / 2);
            ctx.moveTo(CANVAS_W / 2, CANVAS_H / 2 - 6);
            ctx.lineTo(CANVAS_W / 2, CANVAS_H / 2 + 6);
            ctx.stroke();

            if (flashRef.current > 0) {
                ctx.fillStyle = `rgba(255, 220, 80, ${flashRef.current / 0.08})`;
                ctx.beginPath();
                ctx.arc(CANVAS_W / 2, CANVAS_H - 30, 40, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = "rgba(0,0,0,0.55)";
            ctx.fillRect(0, CANVAS_H - 26, CANVAS_W, 26);
            ctx.font = "12px monospace";
            ctx.fillStyle = "#e33";
            ctx.fillText(`HP: ${Math.max(0, Math.round(playerRef.current.health))}`, 10, CANVAS_H - 9);
            const kills = enemiesRef.current.filter((e) => !e.alive).length;
            ctx.fillStyle = "#ccc";
            ctx.fillText(`KILLS: ${kills}/${enemiesRef.current.length}`, 105, CANVAS_H - 9);
            ctx.fillStyle = "#8cf";
            const weaponLabel =
                weaponRef.current === "pistol" ? "PISTOL" : `SHOTGUN (${shotgunAmmoRef.current})`;
            ctx.fillText(`WPN [1/2]: ${weaponLabel}`, 210, CANVAS_H - 9);
            ctx.fillStyle = "#888";
            ctx.fillText("SPACE/CLICK: shoot   ESC: quit", 400, CANVAS_H - 9);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState]);

    return (
        <div ref={containerRef} tabIndex={0} className="relative w-fit outline-none">
            <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="border border-border cursor-crosshair" />
            {!started && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-center text-xs text-fg">
                    <div>
                        <p className="mb-1 text-accent">
                            click here — WASD move, arrows turn, SPACE/click shoot, 1/2 switch weapon
                        </p>
                        <p>ESC to quit</p>
                    </div>
                </div>
            )}
            {gameState === "dead" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-center text-sm text-fg">
                    <div>
                        <p className="mb-2 text-lg text-accent">YOU DIED</p>
                        <p className="text-fg-dim">press R to respawn from level 1, ESC to quit</p>
                    </div>
                </div>
            )}
            {gameState === "levelClear" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-center text-sm text-fg">
                    <div>
                        <p className="mb-2 text-lg text-accent">{hud.levelName} CLEARED</p>
                        <p className="text-fg-dim">press N for next level, ESC to quit</p>
                    </div>
                </div>
            )}
            {gameState === "won" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-center text-sm text-fg">
                    <div>
                        <p className="mb-2 text-lg text-accent">ALL LEVELS CLEARED</p>
                        <p className="text-fg-dim">press R to play again, ESC to quit</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// fictional crypto-villain archetypes — no real people, purely invented silhouettes
function drawEnemySprite(
    ctx: CanvasRenderingContext2D,
    type: EnemyType,
    screenX: number,
    top: number,
    spriteSize: number,
    shade: number,
    winding: boolean
) {
    const s = spriteSize;
    const glow = winding ? 1.25 : 1; // brighten slightly during attack wind-up

    if (type === "rugpuller") {
        ctx.fillStyle = `rgb(${45 * shade * glow}, ${45 * shade * glow}, ${50 * shade * glow})`;
        ctx.fillRect(screenX - s * 0.18, top + s * 0.35, s * 0.36, s * 0.55);
        // legs (simple two-tone split for a walking read)
        ctx.fillStyle = `rgb(${30 * shade}, ${30 * shade}, ${34 * shade})`;
        ctx.fillRect(screenX - s * 0.14, top + s * 0.82, s * 0.1, s * 0.14);
        ctx.fillRect(screenX + s * 0.04, top + s * 0.82, s * 0.1, s * 0.14);
        ctx.fillStyle = `rgb(${70 * shade * glow}, ${70 * shade * glow}, ${75 * shade * glow})`;
        ctx.beginPath();
        ctx.arc(screenX, top + s * 0.25, s * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#111";
        ctx.fillRect(screenX - s * 0.12, top + s * 0.22, s * 0.24, s * 0.05);
    } else if (type === "fudlord") {
        ctx.fillStyle = `rgb(${90 * shade * glow}, ${20 * shade * glow}, ${90 * shade * glow})`;
        ctx.beginPath();
        ctx.moveTo(screenX, top + s * 0.3);
        ctx.lineTo(screenX - s * 0.3, top + s * 0.95);
        ctx.lineTo(screenX + s * 0.3, top + s * 0.95);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = `rgb(${180 * shade * glow}, ${170 * shade * glow}, ${160 * shade * glow})`;
        ctx.beginPath();
        ctx.arc(screenX, top + s * 0.25, s * 0.16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#900";
        ctx.beginPath();
        ctx.arc(screenX, top + s * 0.32, s * 0.06, 0.2, Math.PI - 0.2);
        ctx.stroke();
    } else {
        ctx.fillStyle = `rgb(${40 * shade * glow}, ${40 * shade * glow}, ${55 * shade * glow})`;
        ctx.fillRect(screenX - s * 0.18, top + s * 0.35, s * 0.36, s * 0.55);
        ctx.fillStyle = `rgb(${30 * shade}, ${30 * shade}, ${40 * shade})`;
        ctx.fillRect(screenX - s * 0.14, top + s * 0.82, s * 0.1, s * 0.14);
        ctx.fillRect(screenX + s * 0.04, top + s * 0.82, s * 0.1, s * 0.14);
        ctx.fillStyle = `rgb(${190 * shade * glow}, ${170 * shade * glow}, ${140 * shade * glow})`;
        ctx.beginPath();
        ctx.arc(screenX, top + s * 0.25, s * 0.16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgb(${30 * shade}, ${120 * shade}, ${40 * shade})`;
        ctx.fillRect(screenX + s * 0.15, top + s * 0.55, s * 0.16, s * 0.14);
    }
}

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