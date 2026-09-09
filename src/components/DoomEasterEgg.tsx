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

type EnemyType = "david" | "gary" | "sbf" | "brian" | "elizabeth";
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
  alertTimer: number;
  giveUpTimer: number;
  wanderTarget: { x: number; y: number } | null;
  animPhase: number;
  speedFactor: number;
}

interface Pickup {
  id: number;
  x: number;
  y: number;
  kind: "eth";
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
      { id: 1, type: "david", x: 8, y: 1 },
      { id: 2, type: "gary", x: 9, y: 3 },
      { id: 3, type: "sbf", x: 2.5, y: 9.5 },
      { id: 4, type: "brian", x: 5.5, y: 5.5 },
    ],
    pickups: [{ id: 1, x: 7.5, y: 9.5, kind: "eth" }],
  },
  {
    name: "Level 2 — The Bridge Exploit",
    map: LEVEL_2_MAP,
    playerStart: { x: 1.5, y: 1.5, angle: 0 },
    enemies: [
      { id: 1, type: "gary", x: 11.5, y: 2.5 },
      { id: 2, type: "david", x: 12.5, y: 9.5 },
      { id: 3, type: "sbf", x: 2, y: 10.5 },
      { id: 4, type: "brian", x: 6.5, y: 5.5 },
      { id: 5, type: "elizabeth", x: 9.5, y: 3.5 },
    ],
    pickups: [
      { id: 1, x: 3.5, y: 5.5, kind: "eth" },
      { id: 2, x: 10.5, y: 7.5, kind: "eth" },
    ],
  },
];

const CANVAS_W = 640;
const CANVAS_H = 360;
const FOV = Math.PI / 3;
const MOVE_SPEED = 3;
const ROT_SPEED = 2.2;
const CAPTURED_KEYS = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", " ", "1", "2", "f"];
const RAY_STEP = 0.02;
const PLAYER_MAX_HEALTH = 100;
const PICKUP_RADIUS = 0.5;

// ---------- enemy behavior tuning ----------
const DETECTION_RANGE = 7;
const GIVE_UP_RANGE = 11;
const GIVE_UP_TIME = 3;
const WANDER_RADIUS = 1.4;
const WANDER_SPEED = 0.5;
const CHASE_SPEED = 1.15;
const ENEMY_ATTACK_RANGE = 1.0;
const ATTACK_WINDUP = 0.45;
const ENEMY_ATTACK_DAMAGE = 6;
const ENEMY_ATTACK_COOLDOWN = 1.1;
const PLAYER_HIT_INVULN = 0.5;

// ---------- weapons ----------
type WeaponKind = "pistol" | "shotgun";
const WEAPONS: Record<
  WeaponKind,
  {
    damage: number;
    cooldown: number;
    pellets: number;
    spread: number;
    tolerance: number;
    infiniteAmmo: boolean;
  }
> = {
  pistol: { damage: 34, cooldown: 0.35, pellets: 1, spread: 0, tolerance: 0.12, infiniteAmmo: true },
  shotgun: { damage: 16, cooldown: 0.8, pellets: 5, spread: 0.3, tolerance: 0.09, infiniteAmmo: false },
};

const normalizeAngle = (a: number) => {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
};

// ---------- sound (synthesized) ----------
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
      // audio unavailable
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
  hit() {
    this.tone(220, 0.08, "square", 0.12);
  }
  enemyDeath() {
    this.tone(140, 0.25, "sawtooth", 0.15);
  }
  playerHurt() {
    this.tone(90, 0.15, "sawtooth", 0.18);
  }
  playerDeath() {
    this.tone(70, 0.6, "sawtooth", 0.2);
  }
  pickup() {
    this.tone(520, 0.1, "sine", 0.12);
    this.tone(700, 0.1, "sine", 0.1);
  }
  levelClear() {
    this.tone(440, 0.15, "sine", 0.15);
    this.tone(660, 0.2, "sine", 0.15);
  }
  alert() {
    this.tone(500, 0.06, "square", 0.08);
  }
}

// ---------- procedural textures ----------
const TEX_SIZE = 64;

function createTexture(draw: (ctx: CanvasRenderingContext2D, size: number) => void): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = TEX_SIZE;
  const ctx = c.getContext("2d")!;
  draw(ctx, TEX_SIZE);
  return c;
}

const wallTextures: Record<number, HTMLCanvasElement> = {
  // Type 1 – dark red brick
  1: createTexture((ctx, s) => {
    ctx.fillStyle = "#3a1010";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#5c1a1a";
    for (let y = 0; y < s; y += 8) {
      for (let x = 0; x < s; x += 16) {
        const offset = (y / 8) % 2 === 0 ? 0 : 8;
        ctx.fillRect(x + offset, y, 14, 6);
      }
    }
    // mortar lines
    ctx.strokeStyle = "#2a0a0a";
    ctx.lineWidth = 1;
    for (let y = 0; y <= s; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(s, y);
      ctx.stroke();
    }
  }),

  // Type 2 – brown tech / panel
  2: createTexture((ctx, s) => {
    ctx.fillStyle = "#2a1e12";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#3d2c1a";
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(i * 8, 0, 6, s);
    }
    ctx.fillStyle = "#1f160c";
    ctx.fillRect(0, 20, s, 4);
    ctx.fillRect(0, 40, s, 4);
    // small lights
    ctx.fillStyle = "#6b4a20";
    for (let x = 4; x < s; x += 16) {
      ctx.fillRect(x, 12, 3, 3);
      ctx.fillRect(x, 32, 3, 3);
    }
  }),

  // Type 3 – cool grey metal / server
  3: createTexture((ctx, s) => {
    ctx.fillStyle = "#1e1e22";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#2c2c32";
    for (let y = 0; y < s; y += 4) {
      ctx.fillRect(0, y, s, 2);
    }
    ctx.fillStyle = "#3a3a42";
    ctx.fillRect(8, 8, s - 16, 12);
    ctx.fillRect(8, 28, s - 16, 8);
    ctx.fillRect(8, 44, s - 16, 12);
    // vents
    ctx.fillStyle = "#111";
    for (let x = 12; x < s - 12; x += 6) {
      ctx.fillRect(x, 10, 3, 8);
      ctx.fillRect(x, 46, 3, 8);
    }
  }),
};

const floorTexture = createTexture((ctx, s) => {
  ctx.fillStyle = "#1a120c";
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = "#2a1e14";
  ctx.lineWidth = 1;
  for (let i = 0; i <= s; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
    ctx.stroke();
  }
  // subtle dots
  ctx.fillStyle = "#241810";
  for (let y = 8; y < s; y += 16) {
    for (let x = 8; x < s; x += 16) {
      ctx.fillRect(x, y, 2, 2);
    }
  }
});

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

// ---------- image sprites ----------
const SPRITE_PATHS: Record<EnemyType, string> = {
  david: "/david-crying.jpeg",
  gary: "/gary-gensler.jpeg",
  sbf: "/sbf.jpeg",
  brian: "/brian-armstrong.jpeg",
  elizabeth: "/elizabeth-warren.jpeg",
};

const enemyImages: Record<EnemyType, HTMLImageElement | null> = {
  david: null,
  gary: null,
  sbf: null,
  brian: null,
  elizabeth: null,
};

function loadEnemySprites() {
  (Object.keys(SPRITE_PATHS) as EnemyType[]).forEach((type) => {
    const img = new Image();
    img.src = SPRITE_PATHS[type];
    img.onerror = () => console.warn(`Failed to load sprite: ${SPRITE_PATHS[type]}`);
    enemyImages[type] = img;
  });
}

if (typeof window !== "undefined") {
  loadEnemySprites();
}

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
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  // Track fullscreen state
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
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
      if (key === "r" && (gameState === "dead" || gameState === "won")) resetGame();
      if (key === "n" && gameState === "levelClear") {
        loadLevel(levelIndexRef.current + 1, playerRef.current.health);
      }
      if (key === "f") {
        const el = containerRef.current;
        if (!el) return;
        if (!document.fullscreenElement) {
          el.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
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
          if (pickup.kind === "eth") {
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

      // ---------- ceiling ----------
        ctx.fillStyle = "#0e0e12";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H / 2);

        // ---------- floor (simple perspective texture) ----------
        const floorImg = floorTexture;
        for (let y = CANVAS_H / 2; y < CANVAS_H; y++) {
        const rowDist = CANVAS_H / (2.0 * y - CANVAS_H); // rough perspective
        const shade = Math.max(0.15, 1 - rowDist / 12);

        // sample a horizontal strip of the floor texture
        const texY = Math.floor((y * 3) % TEX_SIZE);
        ctx.globalAlpha = shade;
        ctx.drawImage(
            floorImg,
            0, texY, TEX_SIZE, 1,          // source
            0, y, CANVAS_W, 1             // dest – stretch across screen
        );
        }
        ctx.globalAlpha = 1;

        // ---------- textured walls ----------
        for (let col = 0; col < CANVAS_W; col++) {
        const rayAngle = player.angle - FOV / 2 + (col / CANVAS_W) * FOV;
        const dx = Math.cos(rayAngle);
        const dy = Math.sin(rayAngle);

        let distance = 0;
        let wallValue = 1;
        let hit = false;
        let rx = player.x;
        let ry = player.y;
        let hitX = 0;
        let hitY = 0;

        while (!hit && distance < 20) {
            rx += dx * RAY_STEP;
            ry += dy * RAY_STEP;
            distance += RAY_STEP;
            if (isWall(map, rx, ry)) {
            hit = true;
            wallValue = map[Math.floor(ry)][Math.floor(rx)];
            hitX = rx;
            hitY = ry;
            }
        }

        const corrected = distance * Math.cos(rayAngle - player.angle);
        zBuffer[col] = corrected;

        const wallHeight = Math.min(CANVAS_H, CANVAS_H / (corrected || 0.0001));
        const shade = Math.max(0.18, 1 - corrected / 11);

        // texture X coordinate (which column of the texture to use)
        const tex = wallTextures[wallValue] || wallTextures[1];
        // use the fractional part of the hit to pick the texture column
        const wallX = Math.abs(dx) > Math.abs(dy)
            ? hitY % 1
            : hitX % 1;
        const texX = Math.floor(wallX * TEX_SIZE);

        // draw the textured vertical strip
        ctx.globalAlpha = shade;
        ctx.drawImage(
            tex,
            texX, 0, 1, TEX_SIZE,                     // source 1px column
            col, (CANVAS_H - wallHeight) / 2, 1, wallHeight  // dest
        );
        ctx.globalAlpha = 1;
        }

      // enemies (sorted far → near)
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
        const bob =
          enemy.state === "idle"
            ? Math.sin(enemy.animPhase) * spriteSize * 0.015
            : Math.abs(Math.sin(enemy.animPhase)) * spriteSize * 0.03;
        const top = (CANVAS_H - spriteSize) / 2 + bob;

        drawEnemySprite(ctx, enemy.type, screenX, top, spriteSize, shade, enemy.winding);

        // health bar
        const healthPct = enemy.health / ENEMY_MAX_HEALTH;
        ctx.fillStyle = "#400";
        ctx.fillRect(screenX - spriteSize * 0.2, top - 8, spriteSize * 0.4, 3);
        ctx.fillStyle = "#e33";
        ctx.fillRect(screenX - spriteSize * 0.2, top - 8, spriteSize * 0.4 * healthPct, 3);

        // alert "!"
        if (enemy.alertTimer > 0) {
          ctx.fillStyle = "#ff3";
          ctx.font = `bold ${Math.max(10, spriteSize * 0.22)}px monospace`;
          ctx.fillText("!", screenX - spriteSize * 0.03, top - 14);
        }

        // attack telegraph
        if (enemy.winding) {
          const pulse = 1 - enemy.windupTimer / ATTACK_WINDUP;
          ctx.strokeStyle = `rgba(255, 60, 60, ${0.8 - pulse * 0.5})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(screenX, top + spriteSize * 0.5, spriteSize * (0.35 + pulse * 0.15), 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // ETH pickups – tall Sims-style diamond
      for (const pickup of pickupsRef.current) {
        if (pickup.collected) continue;
        const dx = pickup.x - player.x;
        const dy = pickup.y - player.y;
        const dist = Math.hypot(dx, dy);
        const angleTo = Math.atan2(dy, dx);
        const relAngle = normalizeAngle(angleTo - player.angle);
        if (Math.abs(relAngle) > FOV / 2 + 0.2) continue;

        const screenX = (0.5 + relAngle / FOV) * CANVAS_W;
        const size = Math.min(70, CANVAS_H / dist / 3.5);
        const colIndex = Math.max(0, Math.min(CANVAS_W - 1, Math.floor(screenX)));
        if (zBuffer[colIndex] < dist) continue;

        const top = CANVAS_H / 2 + Math.min(50, 25 / Math.max(dist, 0.5));

        // Tall diamond (Sims plumbob style)
        const h = size * 1.35; // make it taller
        const w = size * 0.55;

        // Main body
        ctx.fillStyle = "#627EEA";
        ctx.beginPath();
        ctx.moveTo(screenX, top - h * 0.55); // top point
        ctx.lineTo(screenX + w, top); // right
        ctx.lineTo(screenX, top + h * 0.45); // bottom point
        ctx.lineTo(screenX - w, top); // left
        ctx.closePath();
        ctx.fill();

        // Lighter top facet
        ctx.fillStyle = "#8A9CF5";
        ctx.beginPath();
        ctx.moveTo(screenX, top - h * 0.55);
        ctx.lineTo(screenX + w * 0.65, top - h * 0.08);
        ctx.lineTo(screenX, top + h * 0.05);
        ctx.lineTo(screenX - w * 0.65, top - h * 0.08);
        ctx.closePath();
        ctx.fill();

        // Bright highlight
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.moveTo(screenX, top - h * 0.5);
        ctx.lineTo(screenX + w * 0.35, top - h * 0.15);
        ctx.lineTo(screenX, top - h * 0.05);
        ctx.closePath();
        ctx.fill();
      }

      // damage vignette
      if (player.invulnTimer > 0) {
        const alpha = (player.invulnTimer / PLAYER_HIT_INVULN) * 0.25;
        ctx.fillStyle = `rgba(200, 0, 0, ${alpha})`;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }

      // crosshair
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

      // HUD bar
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
      ctx.fillText("SPACE/CLICK: shoot   F: fullscreen   ESC: quit", 380, CANVAS_H - 9);
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
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative outline-none select-none bg-black flex items-center justify-center
        ${isFullscreen ? "w-screen h-screen" : "w-fit h-fit"}`}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className={`border border-border cursor-crosshair block
          ${isFullscreen ? "w-full h-full object-contain" : ""}`}
        style={{ imageRendering: "pixelated" }}
      />

      {/* ---------- START / TITLE SCREEN ---------- */}
      {!started && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-center px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-widest text-red-500 mb-1">DOOM</h1>
            <p className="text-sm text-amber-400 tracking-[0.3em] uppercase">Crypto Edition</p>
          </div>

          <div className="text-xs text-zinc-300 space-y-1 mb-8 max-w-xs">
            <p>Eliminate the market makers of FUD</p>
            <p className="text-zinc-500">
              WASD / Arrows • Space / Click to shoot • 1 / 2 weapons • F fullscreen
            </p>
          </div>

          <p className="text-sm text-white animate-pulse">Click or press any key to start</p>

          <p className="absolute bottom-4 text-[10px] text-zinc-600">ESC to quit at any time</p>
        </div>
      )}

      {/* ---------- DEATH SCREEN ---------- */}
      {gameState === "dead" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-2 tracking-wider">YOU DIED</h2>
          <p className="text-zinc-400 text-sm mb-6">The market took you out.</p>
          <p className="text-white text-sm">
            Press <span className="text-amber-400 font-mono">R</span> to restart from Level 1
          </p>
          <p className="text-zinc-500 text-xs mt-2">or ESC to quit</p>
        </div>
      )}

      {/* ---------- LEVEL CLEAR SCREEN ---------- */}
      {gameState === "levelClear" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center">
          <p className="text-xs tracking-[0.4em] text-emerald-500 uppercase mb-2">Level Complete</p>
          <h2 className="text-2xl font-bold text-white mb-1">{hud.levelName}</h2>
          <p className="text-zinc-400 text-sm mb-8">CLEARED</p>

          <div className="text-sm text-zinc-300 mb-8">
            <span className="text-emerald-400 font-mono">{hud.kills}</span>
            <span className="text-zinc-500"> / {hud.total} enemies eliminated</span>
          </div>

          <p className="text-white text-sm">
            Press <span className="text-amber-400 font-mono">N</span> for next level
          </p>
          <p className="text-zinc-500 text-xs mt-2">or ESC to quit</p>
        </div>
      )}

      {/* ---------- FINAL WIN SCREEN ---------- */}
      {gameState === "won" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center px-6">
          <p className="text-xs tracking-[0.4em] text-amber-400 uppercase mb-3">All Levels Cleared</p>
          <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">YOU WIN</h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-xs">
            The mempool is quiet. The FUD has been purged.
          </p>

          <div className="text-sm text-zinc-300 mb-10">
            Total kills: <span className="text-emerald-400 font-mono">{hud.kills}</span>
          </div>

          <p className="text-white text-sm">
            Press <span className="text-amber-400 font-mono">R</span> to play again
          </p>
          <p className="text-zinc-500 text-xs mt-2">or ESC to quit</p>
        </div>
      )}
    </div>
  );
};

// ---------- sprite drawing ----------
function drawEnemySprite(
  ctx: CanvasRenderingContext2D,
  type: EnemyType,
  screenX: number,
  top: number,
  spriteSize: number,
  shade: number,
  winding: boolean
) {
  const img = enemyImages[type];
  const s = spriteSize;

  // Prefer the loaded image
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.save();
    ctx.globalAlpha = Math.max(0.35, shade);
    if (winding) {
      ctx.filter = "brightness(1.35)";
    }
    ctx.drawImage(img, screenX - s * 0.5, top, s, s);
    ctx.restore();
    return;
  }

  // Fallback procedural drawing
  const glow = winding ? 1.25 : 1;

  if (type === "david") {
    ctx.fillStyle = `rgb(${40 * shade * glow}, ${70 * shade * glow}, ${140 * shade * glow})`;
    ctx.fillRect(screenX - s * 0.2, top + s * 0.35, s * 0.4, s * 0.55);
    ctx.fillStyle = `rgb(${200 * shade * glow}, ${180 * shade * glow}, ${160 * shade * glow})`;
    ctx.beginPath();
    ctx.arc(screenX, top + s * 0.25, s * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4af";
    ctx.fillRect(screenX - s * 0.1, top + s * 0.28, s * 0.04, s * 0.12);
    ctx.fillRect(screenX + s * 0.06, top + s * 0.28, s * 0.04, s * 0.12);
  } else if (type === "gary") {
    ctx.fillStyle = `rgb(${30 * shade * glow}, ${30 * shade * glow}, ${40 * shade * glow})`;
    ctx.fillRect(screenX - s * 0.18, top + s * 0.35, s * 0.36, s * 0.55);
    ctx.fillStyle = `rgb(${190 * shade * glow}, ${170 * shade * glow}, ${150 * shade * glow})`;
    ctx.beginPath();
    ctx.arc(screenX, top + s * 0.25, s * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.strokeRect(screenX - s * 0.12, top + s * 0.2, s * 0.1, s * 0.07);
    ctx.strokeRect(screenX + s * 0.02, top + s * 0.2, s * 0.1, s * 0.07);
  } else if (type === "sbf") {
    ctx.fillStyle = `rgb(${50 * shade * glow}, ${80 * shade * glow}, ${50 * shade * glow})`;
    ctx.fillRect(screenX - s * 0.2, top + s * 0.35, s * 0.4, s * 0.55);
    ctx.fillStyle = `rgb(${180 * shade * glow}, ${160 * shade * glow}, ${140 * shade * glow})`;
    ctx.beginPath();
    ctx.arc(screenX, top + s * 0.25, s * 0.17, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgb(${40 * shade}, ${30 * shade}, ${20 * shade})`;
    ctx.beginPath();
    ctx.arc(screenX - s * 0.08, top + s * 0.12, s * 0.1, 0, Math.PI * 2);
    ctx.arc(screenX + s * 0.08, top + s * 0.1, s * 0.11, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "elizabeth") {
    // Simple suit + glasses fallback
    ctx.fillStyle = `rgb(${40 * shade * glow}, ${40 * shade * glow}, ${60 * shade * glow})`;
    ctx.fillRect(screenX - s * 0.18, top + s * 0.35, s * 0.36, s * 0.55);
    ctx.fillStyle = `rgb(${200 * shade * glow}, ${180 * shade * glow}, ${160 * shade * glow})`;
    ctx.beginPath();
    ctx.arc(screenX, top + s * 0.25, s * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(screenX - s * 0.11, top + s * 0.2, s * 0.09, s * 0.06);
    ctx.strokeRect(screenX + s * 0.02, top + s * 0.2, s * 0.09, s * 0.06);
  } else {
    // brian
    ctx.fillStyle = `rgb(${20 * shade * glow}, ${40 * shade * glow}, ${90 * shade * glow})`;
    ctx.fillRect(screenX - s * 0.18, top + s * 0.35, s * 0.36, s * 0.55);
    ctx.fillStyle = `rgb(${200 * shade * glow}, ${180 * shade * glow}, ${160 * shade * glow})`;
    ctx.beginPath();
    ctx.arc(screenX, top + s * 0.25, s * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c33";
    ctx.beginPath();
    ctx.moveTo(screenX, top + s * 0.38);
    ctx.lineTo(screenX - s * 0.05, top + s * 0.55);
    ctx.lineTo(screenX + s * 0.05, top + s * 0.55);
    ctx.closePath();
    ctx.fill();
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