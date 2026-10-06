'use client';
import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNodes({ count = 60, mouse }) {
  const meshRef = useRef();
  const linesRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      temp.push({
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        speed: 0.1 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        size: 0.03 + Math.random() * 0.05,
      });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const sizes = useMemo(() => new Float32Array(count), [count]);
  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      const x = p.position.x + Math.sin(time * p.speed + p.offset) * 0.3;
      const y = p.position.y + Math.cos(time * p.speed + p.offset * 0.5) * 0.3;
      const z = p.position.z + Math.sin(time * p.speed * 0.5 + p.offset) * 0.2;

      positions[i * 3] = x + (mouse.current.x * 0.3);
      positions[i * 3 + 1] = y + (mouse.current.y * 0.3);
      positions[i * 3 + 2] = z;
      sizes[i] = p.size;
    });

    if (meshRef.current) {
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update connection lines
    let lineIndex = 0;
    const maxDist = 2.5;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist && lineIndex < count * count * 2) {
          linePositions[lineIndex * 3] = positions[i * 3];
          linePositions[lineIndex * 3 + 1] = positions[i * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positions[i * 3 + 2];
          lineIndex++;
          linePositions[lineIndex * 3] = positions[j * 3];
          linePositions[lineIndex * 3 + 1] = positions[j * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positions[j * 3 + 2];
          lineIndex++;
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineIndex);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#D4AF37"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * count * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

function CentralSphere({ mouse }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1 + mouse.current.y * 0.5;
      meshRef.current.rotation.y = time * 0.15 + mouse.current.x * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#D4AF37"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.9}
          emissive="#B8941F"
          emissiveIntensity={0.1}
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

function GlowRings({ mouse }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2 + mouse.current.y * 0.3;
      ring1Ref.current.rotation.z = time * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.15 + mouse.current.x * 0.3;
      ring2Ref.current.rotation.z = -time * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.12;
      ring3Ref.current.rotation.y = time * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.005, 16, 100]} />
        <meshBasicMaterial color="#E8C547" transparent opacity={0.15} />
      </mesh>
    </>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#D4AF37" />
      <pointLight position={[-10, -10, 5]} intensity={0.3} color="#E8C547" />

      <CentralSphere mouse={mouse} />
      <NetworkNodes mouse={mouse} count={50} />
      <GlowRings mouse={mouse} />

      <Sparkles
        count={100}
        scale={12}
        size={1.5}
        speed={0.4}
        color="#D4AF37"
        opacity={0.3}
      />
    </>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
