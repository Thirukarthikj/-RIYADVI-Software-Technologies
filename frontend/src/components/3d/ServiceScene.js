'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// 1. Web Development: Floating 3D Glass Browser Viewport
function WebDevModel({ color }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Browser Chassis */}
      <RoundedBox args={[2.4, 1.5, 0.08]} radius={0.06} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0d0e12"
          metalness={0.9}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Titanium Gold Edge Bezel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.44, 1.54]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Top Chrome Header Bar */}
      <mesh position={[0, 0.63, 0.045]}>
        <planeGeometry args={[2.28, 0.16]} />
        <meshStandardMaterial color="#16181f" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Traffic Light Buttons */}
      <mesh position={[-1.0, 0.63, 0.05]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.9, 0.63, 0.05]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>
      <mesh position={[-0.8, 0.63, 0.05]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* URL Address Bar */}
      <RoundedBox args={[1.1, 0.09, 0.01]} radius={0.03} smoothness={4} position={[0, 0.63, 0.05]}>
        <meshStandardMaterial color="#08080a" roughness={0.5} />
      </RoundedBox>

      {/* Glass Viewport Screen Area */}
      <mesh position={[0, -0.1, 0.045]}>
        <planeGeometry args={[2.28, 1.18]} />
        <meshStandardMaterial
          color="#06070a"
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Floating 3D Wireframe Layout Cards */}
      {/* Hero Banner Card */}
      <RoundedBox args={[1.3, 0.45, 0.04]} radius={0.03} smoothness={4} position={[-0.4, 0.18, 0.08]}>
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.25}
          transparent
          opacity={0.85}
        />
      </RoundedBox>

      {/* Metric / Stat Card */}
      <RoundedBox args={[0.65, 0.45, 0.05]} radius={0.03} smoothness={4} position={[0.7, 0.18, 0.1]}>
        <meshStandardMaterial
          color="#1c1f2b"
          metalness={0.85}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Two Bottom Column Cards */}
      <RoundedBox args={[0.95, 0.42, 0.04]} radius={0.03} smoothness={4} position={[-0.55, -0.32, 0.08]}>
        <meshStandardMaterial color="#141722" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.95, 0.42, 0.04]} radius={0.03} smoothness={4} position={[0.55, -0.32, 0.08]}>
        <meshStandardMaterial color="#141722" metalness={0.7} roughness={0.3} />
      </RoundedBox>

      {/* Code Syntax Highlight Lines inside Hero Card */}
      {[-0.8, -0.6, -0.4, -0.2].map((x, i) => (
        <mesh key={i} position={[x + 0.15, 0.28 - i * 0.08, 0.11]}>
          <planeGeometry args={[0.35 + (i % 2) * 0.2, 0.025]} />
          <meshBasicMaterial color={i === 0 ? '#FFFFFF' : color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

// 2. Mobile App Development: ThreeUI Mirror Phone
function AppDevModel({ color }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Luxury Titanium Phone Chassis */}
      <RoundedBox args={[1.2, 2.3, 0.09]} radius={0.12} smoothness={8} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#121318"
          metalness={0.95}
          roughness={0.12}
        />
      </RoundedBox>

      {/* Gold Perimeter Rail */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.22, 2.32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.98}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* OLED Glass Screen */}
      <mesh position={[0, 0, 0.048]}>
        <planeGeometry args={[1.1, 2.2]} />
        <meshStandardMaterial color="#050608" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Dynamic Island Notch */}
      <RoundedBox args={[0.3, 0.06, 0.02]} radius={0.03} smoothness={4} position={[0, 0.98, 0.06]}>
        <meshStandardMaterial color="#000000" roughness={0.2} />
      </RoundedBox>
      <mesh position={[0.08, 0.98, 0.075]}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color="#1e3a8a" />
      </mesh>

      {/* App Interface UI Cards */}
      {/* Header Profile Bar */}
      <RoundedBox args={[0.9, 0.24, 0.02]} radius={0.04} smoothness={4} position={[0, 0.72, 0.06]}>
        <meshStandardMaterial color="#181a24" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Featured Metric / Balance Card (Floating Glass) */}
      <RoundedBox args={[0.94, 0.65, 0.04]} radius={0.06} smoothness={4} position={[0, 0.2, 0.09]}>
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.88}
        />
      </RoundedBox>

      {/* Activity Bars inside Card */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => {
        const heights = [0.15, 0.28, 0.42, 0.35, 0.48];
        const h = heights[i];
        return (
          <RoundedBox key={i} args={[0.08, h, 0.02]} radius={0.02} smoothness={2} position={[x, 0.05 + h / 2, 0.12]}>
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} />
          </RoundedBox>
        );
      })}

      {/* App List Row Cards */}
      <RoundedBox args={[0.9, 0.2, 0.02]} radius={0.04} smoothness={4} position={[0, -0.32, 0.06]}>
        <meshStandardMaterial color="#141620" metalness={0.6} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.9, 0.2, 0.02]} radius={0.04} smoothness={4} position={[0, -0.58, 0.06]}>
        <meshStandardMaterial color="#141620" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Bottom Dock Navigation Pill */}
      <RoundedBox args={[0.6, 0.08, 0.02]} radius={0.04} smoothness={4} position={[0, -0.92, 0.06]}>
        <meshStandardMaterial color="#252838" />
      </RoundedBox>
    </group>
  );
}

// 3. Digital Marketing: Kinetic Metric Growth Accelerator
function MarketingModel({ color }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
    }
  });

  const barData = useMemo(() => [
    { x: -0.8, h: 0.5, delay: 0 },
    { x: -0.4, h: 0.85, delay: 0.2 },
    { x: 0, h: 1.25, delay: 0.4 },
    { x: 0.4, h: 1.65, delay: 0.6 },
    { x: 0.8, h: 2.15, delay: 0.8 },
  ], []);

  return (
    <group ref={groupRef}>
      {/* Isometric Glass Base Pedestal */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[1.5, 1.65, 0.12, 32]} />
        <meshStandardMaterial color="#0d0e14" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.48, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Ascending Gold Metallic Towers */}
      {barData.map((bar, i) => (
        <group key={i} position={[bar.x, -1.0 + bar.h / 2, 0]}>
          <RoundedBox args={[0.26, bar.h, 0.26]} radius={0.04} smoothness={4}>
            <meshStandardMaterial
              color={color}
              metalness={0.92}
              roughness={0.18}
              emissive={color}
              emissiveIntensity={0.15 + i * 0.08}
            />
          </RoundedBox>

          {/* Summit Glowing Diamond Node */}
          <mesh position={[0, bar.h / 2 + 0.08, 0]} rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={color}
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>
      ))}

      {/* Growth Trajectory Arc Ring */}
      <mesh rotation={[Math.PI / 6, 0, Math.PI / 4]} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.4, 0.015, 16, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// 4. AR / VR & Spatial Computing: Futuristic Holographic Visor & Optical Ring
function ARVRModel({ color }) {
  const groupRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.5;
    if (ring2.current) ring2.current.rotation.x = -t * 0.4;
  });

  return (
    <group ref={groupRef}>
      {/* Main Optical Glass Visor Lens */}
      <mesh>
        <torusGeometry args={[1.1, 0.18, 24, 64]} />
        <meshStandardMaterial
          color="#10131a"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Outer Gold Gimbal Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.03, 16, 80]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Tilted Laser Targeting Ring */}
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 70]} />
        <meshStandardMaterial color="#FFFFFF" emissive={color} emissiveIntensity={0.6} />
      </mesh>

      {/* Holographic Center Reticle Sphere */}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive={color} emissiveIntensity={1.5} />
      </mesh>

      {/* Spatial HUD Crosshair Markers */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
        <mesh key={idx} position={[Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial color="#FFF" emissive={color} emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

// 5. 3D Modeling & CGI: Prismatic Polyhedron & Geometric Lattice
function Modeling3DModel({ color }) {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.3;
      outerRef.current.rotation.y = t * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2;
      innerRef.current.rotation.z = -t * 0.35;
    }
  });

  return (
    <group>
      {/* Outer Wireframe CGI Mesh Cage */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner Glowing Gemstone Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#0f1118"
          metalness={0.95}
          roughness={0.12}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 3D Spatial Coordinate Axis Rings */}
      <mesh>
        <torusGeometry args={[1.75, 0.015, 16, 90]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.015, 16, 90]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// 6. UI / UX Design Systems: Exploded 3D Glass Layer Stack
function UIUXModel({ color }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25 + 0.35;
      groupRef.current.rotation.x = 0.3 + Math.cos(t * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Bottom Layer: Wireframe Architecture Grid */}
      <group position={[0, -0.65, 0]}>
        <RoundedBox args={[2.0, 1.25, 0.04]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#0c0e14"
            metalness={0.8}
            roughness={0.3}
            transparent
            opacity={0.8}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.8, 1.05]} />
          <meshBasicMaterial color="#222838" wireframe />
        </mesh>
      </group>

      {/* Middle Layer: Design Tokens & Palette Tier */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[2.0, 1.25, 0.04]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#131622"
            metalness={0.85}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </RoundedBox>
        {/* Color Swatch Circles */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0.035]}>
            <circleGeometry args={[0.12, 24]} />
            <meshBasicMaterial color={i === 0 ? color : i === 1 ? '#38bdf8' : i === 2 ? '#ec4899' : '#10b981'} />
          </mesh>
        ))}
        {/* Typography Hierarchy Rules */}
        {[-0.1, -0.28].map((y, i) => (
          <mesh key={i} position={[-0.2, y, 0.035]}>
            <planeGeometry args={[1.2 - i * 0.3, 0.04]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>

      {/* Top Layer: Polished High-Fidelity UI Component Card */}
      <group position={[0, 0.65, 0]}>
        <RoundedBox args={[2.0, 1.25, 0.06]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.15}
            emissive={color}
            emissiveIntensity={0.25}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        {/* Featured Card Glass Elements */}
        <RoundedBox args={[1.6, 0.35, 0.03]} radius={0.04} smoothness={4} position={[0, 0.25, 0.05]}>
          <meshStandardMaterial color="#0b0d14" roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.8, 0.22, 0.04]} radius={0.04} smoothness={4} position={[-0.4, -0.25, 0.05]}>
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
        </RoundedBox>
      </group>

      {/* Vertical Corner Alignment Guides connecting all 3 tiers */}
      {[
        [-0.95, -0.55],
        [0.95, -0.55],
        [-0.95, 0.55],
        [0.95, 0.55],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry args={[0.008, 0.008, 1.35, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

const serviceRenderers = {
  'web-development': WebDevModel,
  'app-development': AppDevModel,
  'digital-marketing': MarketingModel,
  'ar-vr': ARVRModel,
  '3d-modeling': Modeling3DModel,
  'ui-ux-design': UIUXModel,
};

export default function ServiceScene({ serviceSlug, color = '#D4AF37' }) {
  const ModelComponent = serviceRenderers[serviceSlug] || WebDevModel;

  return (
    <div className="relative w-full h-[360px] md:h-[440px] rounded-2xl overflow-hidden glass border border-gold/20 flex flex-col items-center justify-center">
      {/* Interactive Drag Hint */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-dark-100/70 border border-gold/30 text-[11px] text-neutral-300 font-accent tracking-wider uppercase backdrop-blur-md pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
        <span>Drag to rotate 3D model</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} color="#1b1c24" />
        <directionalLight position={[5, 6, 5]} intensity={2.2} color="#F5D77F" />
        <directionalLight position={[-5, -4, -4]} intensity={1.0} color="#38bdf8" />
        <pointLight position={[0, 3, 2]} intensity={1.5} color={color} />

        {/* ThreeUI Presentation Controls: Interactive Drag with Smooth Return */}
        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0.2, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2.5, Math.PI / 2.5]}
        >
          <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
            <ModelComponent color={color} />
          </Float>
        </PresentationControls>

        {/* Soft Floor Shadow beneath 3D Object */}
        <ContactShadows
          position={[0, -1.5, 0]}
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
