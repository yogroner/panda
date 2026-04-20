import { useEffect, useRef } from 'react';

interface SparkEffectProps {
  selector?: string;
  amount?: number;
  speed?: number;
  lifetime?: number;
  direction?: { x: number; y: number };
  size?: [number, number];
  maxopacity?: number;
  color?: string;
  randColor?: boolean;
  acceleration?: [number, number];
}

export function SparkEffect({
  selector = '#sparks',
  amount = 800,
  speed = 0.05,
  lifetime = 200,
  direction = { x: -0.5, y: 1 },
  size = [2, 2],
  maxopacity = 1,
  color = '150, 150, 150',
  randColor = true,
  acceleration = [5, 40]
}: SparkEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const OPT = {
      selector,
      amount,
      speed: window.innerWidth < 520 ? 0.05 : speed,
      lifetime,
      direction,
      size,
      maxopacity,
      color: window.innerWidth < 520 ? '150, 150, 150' : color,
      randColor,
      acceleration
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    interface SparkInstance {
      x: number;
      y: number;
      age: number;
      acceleration: number;
      color: string;
      opacity: number;
      go: () => void;
    }

    let sparks: SparkInstance[] = [];

    function setCanvasWidth() {
      if (!ctx) return;
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function rand(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createSpark(x: number, y: number): SparkInstance {
      const acceleration = rand(OPT.acceleration[0], OPT.acceleration[1]);
      const color = OPT.randColor
        ? `${rand(0, 255)},${rand(0, 255)},${rand(0, 255)}`
        : OPT.color;
      
      const spark: SparkInstance = {
        x,
        y,
        age: 0,
        acceleration,
        color,
        opacity: OPT.maxopacity,
        go() {
          this.x += OPT.speed * OPT.direction.x * this.acceleration / 2;
          this.y += OPT.speed * OPT.direction.y * this.acceleration / 2;
          this.opacity = OPT.maxopacity - ++this.age / OPT.lifetime;
        }
      };
      return spark;
    }

    function addSpark() {
      let x = rand(-200, window.innerWidth + 200);
      let y = rand(-200, window.innerHeight + 200);
      sparks.push(createSpark(x, y));
    }

    function drawSpark(spark: SparkInstance) {
      let x = spark.x,
        y = spark.y;
      spark.go();
      if (!ctx) return;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
      ctx.rect(x, y, OPT.size[0], OPT.size[1]);
      ctx.fill();
    }

    let animationFrameId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Add new sparks if needed, but limit per frame
      if (sparks.length < OPT.amount && Math.random() > 0.5) {
        addSpark();
      }

      sparks.forEach((spark, i, array) => {
        if (spark.opacity <= 0) {
          array.splice(i, 1);
        } else {
          drawSpark(spark);
        }
      });
      animationFrameId = window.requestAnimationFrame(draw);
    }

    function init() {
      setCanvasWidth();
      window.requestAnimationFrame(draw);
    }

    window.addEventListener('resize', setCanvasWidth);
    init();

    return () => {
      window.removeEventListener('resize', setCanvasWidth);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [selector, amount, speed, lifetime, direction, size, maxopacity, color, randColor, acceleration]);

  return (
    <canvas
      ref={canvasRef}
      id="sparks"
      className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0"
    />
  );
}
