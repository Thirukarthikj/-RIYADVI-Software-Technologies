'use client';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNodes({ count = 36, mouse }) {
  const groupRef = useRef();

  // Pre-generate stable node positions and connected line indices
  const { nodePositions, lineIndices } = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }

    // Connect nodes that are within proximity once at initialization
    const indices = [];
    const maxDistSq = 2.8 * 2.8;
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq && connections < 4) {
          indices.push(i, j);
          connections++;
        }
      }
    }

    return {
      nodePositions: new Float32Array(pos),
      lineIndices: new Uint16Array(indices),
    };
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    // Rotate and sway smoothly using GPU transforms without recreating buffers
    groupRef.current.rotation.y = time * 0.08 + mouse.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1 + mouse.current.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Node Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#D4AF37"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection Lines (Indexed geometry - 0 CPU overhead) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={nodePositions}
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
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function CentralSphere({ mouse }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * 0.08 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = time * 0.12 + mouse.current.x * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <Sphere ref={meshRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#D4AF37"
          attach="material"
          distort={0.25}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.18}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

function GlowRings({ mouse }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.x = time * 0.1 + mouse.current.y * 0.2;
    groupRef.current.rotation.y = time * 0.08 + mouse.current.x * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.5, 0.008, 12, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.0, 0.008, 12, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.4, 0.006, 12, 64]} />
        <meshBasicMaterial color="#E8C547" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={0.6} color="#D4AF37" />

      <CentralSphere mouse={mouse} />
      <NetworkNodes mouse={mouse} count={36} />
      <GlowRings mouse={mouse} />

      <Sparkles
        count={50}
        scale={10}
        size={1.2}
        speed={0.3}
        color="#D4AF37"
        opacity={0.25}
      />
    </>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Pause WebGL rendering loop when scrolled out of view to free CPU & GPU
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

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        dpr={[1, 1.25]}
        frameloop={isInView ? 'always' : 'never'}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
