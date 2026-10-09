'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const techNodes = [
  { name: 'Next.js 14', color: '#D4AF37', ring: 1, speed: 0.45, offset: 0, shape: 'octa' },
  { name: 'Three.js / 3D', color: '#F5D77F', ring: 1, speed: 0.45, offset: Math.PI, shape: 'icosa' },
  { name: 'Node / Express', color: '#34d399', ring: 2, speed: -0.32, offset: Math.PI * 0.25, shape: 'dodeca' },
  { name: 'Python / AI', color: '#38bdf8', ring: 2, speed: -0.32, offset: Math.PI * 1.25, shape: 'octa' },
  { name: 'AWS Cloud', color: '#fb923c', ring: 3, speed: 0.24, offset: Math.PI * 0.5, shape: 'tetra' },
  { name: 'Mobile / Flutter', color: '#60a5fa', ring: 3, speed: 0.24, offset: Math.PI * 1.5, shape: 'octa' },
  { name: 'MongoDB / Data', color: '#4ade80', ring: 4, speed: -0.18, offset: Math.PI * 0.8, shape: 'dodeca' },
  { name: 'UI/UX Design', color: '#c084fc', ring: 4, speed: -0.18, offset: Math.PI * 1.8, shape: 'icosa' },
];

const ringRadii = {
  1: 2.1,
  2: 2.9,
  3: 3.7,
  4: 4.5,
};

// Central Quantum Tech Nexus Core
function NexusCore() {
  const coreRef = useRef();
  const cageRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.y = t * 0.4;
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (cageRef.current) {
      cageRef.current.rotation.x = -t * 0.2;
      cageRef.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group>
      {/* Radiant Inner Star */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Geodesic Wireframe Reactor Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#F5D77F"
          wireframe
          metalness={0.95}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Point Light Aura */}
      <pointLight color="#D4AF37" intensity={3.5} distance={10} decay={2} />
    </group>
  );
}

// Orbital Track Rings with ThreeUI Tick Markers
function OrbitalTracks() {
  const tracks = [2.1, 2.9, 3.7, 4.5];

  return (
    <group>
      {tracks.map((radius, i) => (
        <group key={i} rotation={[Math.PI / 6 * (i % 2 === 0 ? 1 : -1), 0, 0]}>
          <mesh>
            <torusGeometry args={[radius, 0.012, 16, 120]} />
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.25 - i * 0.03}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Individual Orbiting Tech Satellite
function OrbitingNode({ node }) {
  const groupRef = useRef();
  const radius = ringRadii[node.ring];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const angle = t * node.speed + node.offset;

    // Slight orbital inclination per ring
    const tilt = (node.ring % 2 === 0 ? 1 : -1) * 0.25;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle) * radius * tilt + Math.sin(t * 1.5 + node.offset) * 0.15;

    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.y = t * 1.2;
    groupRef.current.rotation.x = t * 0.8;
  });

  return (
    <group ref={groupRef}>
      {/* Tech Satellite Mesh */}
      <mesh>
        {node.shape === 'octa' && <octahedronGeometry args={[0.22, 0]} />}
        {node.shape === 'icosa' && <icosahedronGeometry args={[0.24, 0]} />}
        {node.shape === 'dodeca' && <dodecahedronGeometry args={[0.22, 0]} />}
        {node.shape === 'tetra' && <tetrahedronGeometry args={[0.25, 0]} />}
        <meshStandardMaterial
          color={node.color}
          metalness={0.9}
          roughness={0.15}
          emissive={node.color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glowing Halo Ring (pure Three.js — no DOM portal) */}
      <mesh position={[0, 0.36, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.015, 12, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function GalaxyScene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#181a24" />
      <directionalLight position={[6, 8, 6]} intensity={2.2} color="#F5D77F" />
      <directionalLight position={[-6, -6, -4]} intensity={1.2} color="#38bdf8" />

      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1.6}
        zoom={1}
        rotation={[0.3, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
      >
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <NexusCore />
          <OrbitalTracks />
          {techNodes.map((node, i) => (
            <OrbitingNode key={i} node={node} />
          ))}
        </Float>
      </PresentationControls>

      <Sparkles
        count={85}
        scale={12}
        size={1.5}
        speed={0.3}
        color="#D4AF37"
        opacity={0.45}
      />

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.55}
        scale={8}
        blur={2.5}
        far={4.5}
        color="#000000"
      />
    </>
  );
}

export default function TechEcosystem() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] md:h-[560px] rounded-3xl overflow-hidden glass border border-gold/20 flex flex-col items-center justify-center"
    >
      {/* ThreeUI Interactive Hint Pill */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-100/75 border border-gold/30 text-[11px] text-neutral-300 font-accent tracking-wider uppercase backdrop-blur-md pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
        <span>Drag to orbit technology galaxy</span>
      </div>

      <Canvas
        camera={{ position: [0, 1.8, 8.5], fov: 46 }}
        dpr={[1, 1.5]}
        frameloop={isInView ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <GalaxyScene />
      </Canvas>
    </div>
  );
}
