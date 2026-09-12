import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 512);

    [256, 768].forEach((cx) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, 225, 175, 0, Math.PI * 2);
      ctx.fillStyle = "#f6f6fc";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      if (img && img.complete && img.naturalWidth > 0) {
        const size = 210;
        ctx.drawImage(img, cx - size / 2, 225 - size / 2, size, size);
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, 225, 80, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.font = "bold 44px 'Geist', -apple-system, sans-serif";
      ctx.fillStyle = item.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.name.toUpperCase(), cx, 435);
      ctx.restore();
    });
  };

  render();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const image = new Image();
  image.onload = () => {
    render(image);
    texture.needsUpdate = true;
  };
  image.src = item.icon;

  return texture;
}

const textures = typeof window !== "undefined" ? techList.map(createBallTexture) : [];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map((_, i) => ({
  scale: [0.75, 1, 0.85, 1.05, 0.95][i % 5],
  techIndex: i % techList.length,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
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

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const target = document.getElementById("techstack");
    if (!target) {
      setIsActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  const materials = useMemo(() => {
    if (textures.length === 0) {
      return [
        new THREE.MeshPhysicalMaterial({
          color: "#c2a4ff",
          metalness: 0.1,
          roughness: 0.3,
        }),
      ];
    }
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.25,
          metalness: 0.15,
          roughness: 0.35,
          clearcoat: 0.2,
        })
    );
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1.2} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.techIndex % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
