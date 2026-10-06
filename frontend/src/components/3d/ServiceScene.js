'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ServiceObject({ type, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  if (type === 'web') {
    return (
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1.8, 1.2, 0.1]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.15} />
        </mesh>
        {/* Screen content suggestion */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
        {/* Code lines */}
        {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
          <mesh key={i} position={[-0.2 + i * 0.1, y, 0.07]}>
            <planeGeometry args={[0.4 + Math.random() * 0.6, 0.04]} />
            <meshBasicMaterial color={color} transparent opacity={0.5 + Math.random() * 0.3} />
          </mesh>
        ))}
      </Float>
    );
  }

  if (type === 'app') {
    return (
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[0.8, 1.5, 0.08]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[0.7, 1.3]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
      </Float>
    );
  }

  if (type === 'marketing') {
    return (
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <group ref={meshRef}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[-0.6 + i * 0.3, -0.5 + Math.random() * 1.2, 0]}>
              <boxGeometry args={[0.2, 0.3 + Math.random() * 0.8, 0.2]} />
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} emissive={color} emissiveIntensity={0.2} transparent opacity={0.6 + i * 0.08} />
            </mesh>
          ))}
        </group>
      </Float>
    );
  }

  if (type === 'arvr') {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1, 32, 32]}>
          <MeshDistortMaterial color={color} distort={0.4} speed={3} metalness={0.6} roughness={0.3} wireframe transparent opacity={0.4} />
        </Sphere>
      </Float>
    );
  }

  if (type === '3d') {
    return (
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.2} wireframe />
        </mesh>
      </Float>
    );
  }

  // UI/UX
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef}>
        {[
          [0, 0.5, 0],
          [-0.4, 0, 0.2],
          [0.4, -0.3, -0.1],
          [0, -0.6, 0.3],
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <planeGeometry args={[0.8, 0.4]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} emissive={color} emissiveIntensity={0.15} transparent opacity={0.4 + i * 0.15} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

const serviceTypes = {
  'web-development': 'web',
  'app-development': 'app',
  'digital-marketing': 'marketing',
  'ar-vr': 'arvr',
  '3d-modeling': '3d',
  'ui-ux-design': 'uiux',
};

export default function ServiceScene({ serviceSlug, color = '#D4AF37' }) {
  const type = serviceTypes[serviceSlug] || 'web';

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color={color} />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#E8C547" />
        <ServiceObject type={type} color={color} />
      </Canvas>
    </div>
  );
}
