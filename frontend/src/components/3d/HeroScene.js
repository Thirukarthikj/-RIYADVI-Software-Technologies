'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Dynamic Mouse Following Spotlight for ThreeUI-grade metallic gleams
function CursorLight({ mouse }) {
  const lightRef = useRef();
  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouse.current.x * 5, 0.05);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mouse.current.y * 4, 0.05);
    lightRef.current.position.z = 4.5;
  });
  return <pointLight ref={lightRef} color="#F5D77F" intensity={2.5} distance={15} decay={2} />;
}

// ThreeUI Aureon Core: Multi-layered Kinetic Gemstone
function PrismaticCore({ mouse }) {
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.25;
      innerRef.current.rotation.y = t * 0.35;
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      innerRef.current.scale.set(pulse, pulse, pulse);
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.15;
      outerRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group>
      {/* Inner Glowing Energy Crystal */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Mid Translucent Faceted Icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#F5D77F"
          roughness={0.15}
          metalness={0.95}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Core Point Light Aura */}
      <pointLight color="#D4AF37" intensity={2.2} distance={8} decay={2} />
    </group>
  );
}

// ThreeUI Kinetic Gyroscope Gimbal Rings
function GyroscopeRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.18;
      ring1.current.rotation.y = t * 0.12;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.22;
      ring2.current.rotation.z = t * 0.15;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.28;
      ring3.current.rotation.x = -t * 0.1;
    }
  });

  return (
    <group>
      {/* Outer Ring */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[2.7, 0.035, 16, 120]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.95}
            roughness={0.15}
            emissive="#D4AF37"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Notch Markers along Ring */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
          <mesh key={idx} position={[Math.cos(angle) * 2.7, Math.sin(angle) * 2.7, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#FFF" emissive="#D4AF37" emissiveIntensity={1} />
          </mesh>
        ))}
      </group>

      {/* Middle Tilted Ring */}
      <group ref={ring2} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.1, 0.028, 16, 100]} />
          <meshStandardMaterial
            color="#E5C158"
            metalness={0.9}
            roughness={0.2}
            emissive="#C59B27"
            emissiveIntensity={0.1}
          />
        </mesh>
        {[Math.PI / 4, (Math.PI * 3) / 4, (Math.PI * 5) / 4, (Math.PI * 7) / 4].map((angle, idx) => (
          <mesh key={idx} position={[Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Inner High-Speed Precession Ring */}
      <group ref={ring3} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[1.65, 0.022, 16, 90]} />
          <meshStandardMaterial
            color="#F5D77F"
            metalness={0.95}
            roughness={0.1}
            emissive="#F5D77F"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

// Orbiting Satellites (Inspired by ThreeUI Living World)
function OrbitingSatellites() {
  const groupRef = useRef();

  const satellites = useMemo(() => [
    { radius: 3.3, speed: 0.45, yOffset: 0.4, size: 0.14, color: '#D4AF37', shape: 'octa' },
    { radius: 3.8, speed: -0.32, yOffset: -0.5, size: 0.12, color: '#F5D77F', shape: 'dodeca' },
    { radius: 4.2, speed: 0.28, yOffset: 0.8, size: 0.15, color: '#E5C158', shape: 'tetra' },
    { radius: 2.9, speed: -0.52, yOffset: -0.9, size: 0.1, color: '#FFFFFF', shape: 'octa' },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const sat = satellites[i];
      const angle = t * sat.speed;
      child.position.x = Math.cos(angle) * sat.radius;
      child.position.z = Math.sin(angle) * sat.radius;
      child.position.y = sat.yOffset + Math.sin(t * 0.8 + i) * 0.25;
      child.rotation.x = t * 1.2;
      child.rotation.y = t * 1.5;
    });
  });

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => (
        <mesh key={i}>
          {sat.shape === 'octa' && <octahedronGeometry args={[sat.size, 0]} />}
          {sat.shape === 'dodeca' && <dodecahedronGeometry args={[sat.size, 0]} />}
          {sat.shape === 'tetra' && <tetrahedronGeometry args={[sat.size, 0]} />}
          <meshStandardMaterial
            color={sat.color}
            metalness={0.95}
            roughness={0.15}
            emissive={sat.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// ThreeUI Neural Node Constellation
function ConstellationField({ count = 42, mouse }) {
  const groupRef = useRef();

  const { positions, lineIndices } = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }

    const indices = [];
    const maxDistSq = 2.4 * 2.4;
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq && connections < 3) {
          indices.push(i, j);
          connections++;
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      lineIndices: new Uint16Array(indices),
    };
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.05 + mouse.current.x * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.08 + mouse.current.y * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Node Vertices */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#D4AF37"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Golden Connective Filaments */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={lineIndices.length}
            array={lineIndices}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Master Scene Assembly
function MainScene({ mouse, isDesktop }) {
  const sceneGroup = useRef();

  useFrame((state) => {
    if (!sceneGroup.current) return;
    const t = state.clock.elapsedTime;
    // Smooth levitation & mouse responsive parallax
    const targetX = (isDesktop ? 1.9 : 0) + mouse.current.x * 0.4;
    const targetY = Math.sin(t * 0.6) * 0.15 - mouse.current.y * 0.3;
    sceneGroup.current.position.x = THREE.MathUtils.lerp(sceneGroup.current.position.x, targetX, 0.06);
    sceneGroup.current.position.y = THREE.MathUtils.lerp(sceneGroup.current.position.y, targetY, 0.06);
    sceneGroup.current.rotation.y = THREE.MathUtils.lerp(sceneGroup.current.rotation.y, mouse.current.x * 0.35, 0.05);
    sceneGroup.current.rotation.x = THREE.MathUtils.lerp(sceneGroup.current.rotation.x, -mouse.current.y * 0.25, 0.05);
  });

  return (
    <>
      {/* Studio Lighting - Warm Gold Key & Cool Obsidian Rim */}
      <ambientLight intensity={0.5} color="#201a12" />
      <directionalLight position={[6, 8, 6]} intensity={2.4} color="#F5D77F" />
      <directionalLight position={[-8, -4, -6]} intensity={1.2} color="#38bdf8" />
      <CursorLight mouse={mouse} />

      {/* Floating ThreeUI Aureon Emblem */}
      <group ref={sceneGroup} position={[isDesktop ? 1.9 : 0, 0, 0]}>
        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
          <PrismaticCore mouse={mouse} />
          <GyroscopeRings />
          <OrbitingSatellites />
        </Float>
      </group>

      {/* Constellation Field & Cosmic Nebula */}
      <ConstellationField count={45} mouse={mouse} />

      <Sparkles
        count={75}
        scale={14}
        size={1.6}
        speed={0.35}
        color="#D4AF37"
        opacity={0.5}
      />
    </>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop={isInView ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <MainScene mouse={mouse} isDesktop={isDesktop} />
      </Canvas>
    </div>
  );
}
