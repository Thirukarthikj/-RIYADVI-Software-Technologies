'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function TechOrb({ position, color = '#D4AF37', label, index }) {
  const meshRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + offset) * 0.3;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, speed, rotationAxis }) {
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ringRef.current) {
      if (rotationAxis === 'x') ringRef.current.rotation.x = time * speed;
      else if (rotationAxis === 'y') ringRef.current.rotation.y = time * speed;
      else ringRef.current.rotation.z = time * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} />
    </mesh>
  );
}

function TechConstellation() {
  const techPositions = useMemo(() => {
    const positions = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.5;
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  return (
    <>
      {techPositions.map((pos, i) => (
        <TechOrb key={i} position={pos} index={i} />
      ))}
      <OrbitRing radius={2.5} speed={0.1} rotationAxis="y" />
      <OrbitRing radius={3} speed={-0.08} rotationAxis="x" />
      <OrbitRing radius={3.5} speed={0.05} rotationAxis="z" />
      <Sparkles count={60} scale={8} size={1} speed={0.3} color="#D4AF37" opacity={0.3} />
    </>
  );
}

export default function TechEcosystem() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#D4AF37" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#E8C547" />
        <TechConstellation />
      </Canvas>
    </div>
  );
}
