'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, ContactShadows, PresentationControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Flagship Device / Workstation on Glass Pedestal
function ShowcaseModel() {
  const groupRef = useRef();
  const screenRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* 1. Frosted Glass Pedestal Monolith Base */}
      <group position={[0, -1.05, 0]}>
        <mesh>
          <cylinderGeometry args={[1.7, 1.85, 0.14, 40]} />
          <meshStandardMaterial
            color="#0e1017"
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Gold Pedestal Rim Ring */}
        <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.66, 40]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.7} />
        </mesh>
        {/* Inner Laser Track Ring */}
        <mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.09, 32]} />
          <meshBasicMaterial color="#F5D77F" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 2. Floating Workstation Base Deck */}
      <group position={[0, -0.4, 0]}>
        <RoundedBox args={[2.1, 0.08, 1.4]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#12141c"
            metalness={0.95}
            roughness={0.15}
          />
        </RoundedBox>
        {/* Titanium Gold Edge Accent */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[2.12, 0.02, 1.42]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} emissive="#D4AF37" emissiveIntensity={0.2} />
        </mesh>
        {/* Keyboard Deck Recess */}
        <RoundedBox args={[1.7, 0.01, 0.75]} radius={0.02} smoothness={2} position={[0, 0.045, -0.1]}>
          <meshStandardMaterial color="#08090d" roughness={0.6} />
        </RoundedBox>
        {/* Trackpad Glass */}
        <RoundedBox args={[0.7, 0.01, 0.4]} radius={0.02} smoothness={2} position={[0, 0.045, 0.42]}>
          <meshStandardMaterial color="#1a1c26" roughness={0.2} metalness={0.5} />
        </RoundedBox>
      </group>

      {/* 3. Tilted Workstation Display Screen */}
      <group position={[0, 0.4, -0.65]} rotation={[-0.18, 0, 0]}>
        {/* Display Back Lid */}
        <RoundedBox args={[2.1, 1.35, 0.06]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#10121a" metalness={0.95} roughness={0.15} />
        </RoundedBox>
        {/* Gold Border */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[2.02, 1.27]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
        </mesh>
        {/* OLED Glass Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.035]}>
          <planeGeometry args={[1.98, 1.23]} />
          <meshStandardMaterial color="#05060a" roughness={0.1} metalness={0.7} />
        </mesh>

        {/* UI Mockup Blocks on Display Screen */}
        {/* Top Navbar */}
        <RoundedBox args={[1.86, 0.12, 0.01]} radius={0.02} smoothness={2} position={[0, 0.5, 0.045]}>
          <meshStandardMaterial color="#151824" />
        </RoundedBox>
        {/* Main Analytics Chart Card (Glowing Gold) */}
        <RoundedBox args={[1.1, 0.65, 0.02]} radius={0.03} smoothness={2} position={[-0.35, 0.08, 0.05]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} emissive="#D4AF37" emissiveIntensity={0.25} />
        </RoundedBox>
        {/* Metric Sparkline Bars inside Chart Card */}
        {[-0.35, -0.2, -0.05, 0.1, 0.25, 0.4].map((x, i) => {
          const h = 0.12 + (i % 3) * 0.12 + (i === 5 ? 0.18 : 0);
          return (
            <RoundedBox key={i} args={[0.07, h, 0.01]} radius={0.01} smoothness={2} position={[x - 0.35, 0.08 - 0.28 + h / 2, 0.065]}>
              <meshBasicMaterial color="#FFFFFF" />
            </RoundedBox>
          );
        })}
        {/* Side KPI Card */}
        <RoundedBox args={[0.65, 0.65, 0.02]} radius={0.03} smoothness={2} position={[0.58, 0.08, 0.05]}>
          <meshStandardMaterial color="#161926" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Bottom Data Row */}
        <RoundedBox args={[1.86, 0.24, 0.01]} radius={0.02} smoothness={2} position={[0, -0.42, 0.045]}>
          <meshStandardMaterial color="#11131c" />
        </RoundedBox>
      </group>

      {/* 4. ThreeUI-Style Floating Holographic Depth Cards */}
      {/* Floating Card Left: AI Health / Performance Badge */}
      <group position={[-1.3, 0.3, 0.35]} rotation={[0, 0.35, 0]}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
          <RoundedBox args={[0.75, 0.45, 0.03]} radius={0.03} smoothness={2}>
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.85}
              roughness={0.15}
              emissive="#D4AF37"
              emissiveIntensity={0.3}
              transparent
              opacity={0.9}
            />
          </RoundedBox>
          <mesh position={[-0.15, 0.08, 0.02]}>
            <planeGeometry args={[0.3, 0.04]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[-0.1, -0.05, 0.02]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </Float>
      </group>

      {/* Floating Card Right: Security / Global Scale Node */}
      <group position={[1.3, 0.5, 0.15]} rotation={[0, -0.3, 0]}>
        <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.4}>
          <RoundedBox args={[0.7, 0.5, 0.03]} radius={0.03} smoothness={2}>
            <meshStandardMaterial
              color="#1a1d2e"
              metalness={0.85}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </RoundedBox>
          <mesh position={[0, 0.1, 0.02]}>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, -0.1, 0.02]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshBasicMaterial color="#F5D77F" />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

export default function GlassShowcase() {
  return (
    <div className="relative w-full aspect-video md:aspect-[16/11] rounded-2xl overflow-hidden glass border border-gold/25 flex items-center justify-center">
      {/* Interactive 3D Badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-100/80 border border-gold/30 text-[10px] text-neutral-300 font-accent tracking-wider uppercase backdrop-blur-md pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        <span>3D Flagship Showcase</span>
      </div>

      <Canvas
        camera={{ position: [0, 0.6, 4.4], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} color="#181a24" />
        <directionalLight position={[5, 7, 5]} intensity={2.4} color="#F5D77F" />
        <directionalLight position={[-5, -4, -4]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[0, 2, 2]} intensity={1.8} color="#D4AF37" />

        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0.1, 0.2, 0]}
          polar={[-Math.PI / 5, Math.PI / 5]}
          azimuth={[-Math.PI / 2.5, Math.PI / 2.5]}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <ShowcaseModel />
          </Float>
        </PresentationControls>

        <Sparkles
          count={45}
          scale={7}
          size={1.4}
          speed={0.3}
          color="#D4AF37"
          opacity={0.4}
        />

        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={0.65}
          scale={5.5}
          blur={2.4}
          far={3.8}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
