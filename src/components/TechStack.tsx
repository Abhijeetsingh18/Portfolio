import * as THREE from "three";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const techList = [
  { name: "Java", icon: "/images/icons/java.png", color: "#E76F00" },
  { name: "Spring", icon: "/images/icons/spring.png", color: "#6DB33F" },
  { name: "MySQL", icon: "/images/icons/mysql.png", color: "#00758F" },
  { name: "Hibernate", icon: "/images/icons/hibernate.png", color: "#59666C" },
  { name: "SQL/JDBC", icon: "/images/icons/sql.png", color: "#336791" },
  { name: "Python", icon: "/images/icons/python.png", color: "#3776AB" },
  { name: "C", icon: "/images/icons/c.png", color: "#00599C" },
  { name: "HTML5", icon: "/images/icons/html.png", color: "#E34F26" },
  { name: "CSS3", icon: "/images/icons/css.png", color: "#1572B6" },
  { name: "JavaScript", icon: "/images/icons/javascript.png", color: "#D4B830" },
  { name: "Bootstrap", icon: "/images/icons/bootstrap.png", color: "#7952B3" },
  { name: "Git", icon: "/images/icons/git.png", color: "#F05032" },
  { name: "GitHub", icon: "/images/icons/github.png", color: "#24292e" },
  { name: "VS Code", icon: "/images/icons/vscode.png", color: "#007ACC" },
  { name: "IntelliJ", icon: "/images/icons/intellij.png", color: "#FE315D" },
];

function createBallTexture(item: { name: string; icon: string; color: string }): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const render = (img?: HTMLImageElement) => {
    // Crisp white background for sphere
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 512);

    // Draw both front (cx: 256) and back (cx: 768) hemispheres
    [256, 768].forEach((cx) => {
      // Circular badge background
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, 220, 160, 0, Math.PI * 2);
      ctx.fillStyle = "#f5f4fa";
      ctx.fill();
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.restore();

      // Icon image
      if (img && img.complete && img.naturalWidth > 0) {
        const size = 200;
        ctx.drawImage(img, cx - size / 2, 220 - size / 2, size, size);
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, 220, 75, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.restore();
      }

      // Tech title text
      ctx.save();
      ctx.font = "bold 46px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = item.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.name.toUpperCase(), cx, 430);
      ctx.restore();
    });
  };

  render();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    render(image);
    texture.needsUpdate = true;
  };
  image.src = item.icon;

  return texture;
}

const textures = typeof window !== "undefined" ? techList.map(createBallTexture) : [];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const spheres = [...Array(30)].map((_, i) => ({
  scale: [0.75, 1, 0.85, 1.05, 0.95][i % 5],
  techIndex: i % techList.length,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.Material;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    delta = Math.min(0.05, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -45 * delta * scale,
          -90 * delta * scale,
          -45 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.65}
      angularDamping={0.15}
      friction={0.2}
      position={[r(12), r(10), r(8)]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }: { vec?: THREE.Vector3 }) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.25
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const materials = useMemo(() => {
    if (textures.length === 0) {
      return [
        new THREE.MeshStandardMaterial({
          color: "#c2a4ff",
          roughness: 0.3,
          metalness: 0.1,
        }),
      ];
    }
    return textures.map(
      (texture) =>
        new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>
        My <span>Techstack</span>
      </h2>

      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 0.1, far: 100 }}
        className="tech-canvas"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 15]} intensity={1.8} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#c2a4ff" />
        <Physics gravity={[0, 0, 0]}>
          <Pointer />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.techIndex % materials.length]}
            />
          ))}
        </Physics>
        <Suspense fallback={null}>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 4, 2]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStack;
