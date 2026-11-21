"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DeviceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  floatSpeed: number;
  floatIntensity: number;
  phaseOffset: number;
}

// Laptop Placeholder
function LaptopMesh({ position, rotation, scale, floatSpeed, floatIntensity, phaseOffset }: DeviceProps) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!meshRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed + phaseOffset) * floatIntensity;
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#D2D2D7" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1, -0.9]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[3, 1.8, 0.05]} />
        <meshStandardMaterial color="#1D1D1F" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Phone Placeholder
function PhoneMesh({ position, rotation, scale, floatSpeed, floatIntensity, phaseOffset }: DeviceProps) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!meshRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed + phaseOffset) * floatIntensity;
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 1.4, 0.08]} />
        <meshStandardMaterial color="#1D1D1F" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Tablet Placeholder
function TabletMesh({ position, rotation, scale, floatSpeed, floatIntensity, phaseOffset }: DeviceProps) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!meshRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed + phaseOffset) * floatIntensity;
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 2.2, 0.06]} />
        <meshStandardMaterial color="#6E6E73" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Watch Placeholder
function WatchMesh({ position, rotation, scale, floatSpeed, floatIntensity, phaseOffset }: DeviceProps) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!meshRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed + phaseOffset) * floatIntensity;
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.5, 0.12]} />
        <meshStandardMaterial color="#1D1D1F" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Earbuds Placeholder
function EarbudsMesh({ position, rotation, scale, floatSpeed, floatIntensity, phaseOffset }: DeviceProps) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!meshRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed + phaseOffset) * floatIntensity;
  });
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshStandardMaterial color="#F5F5F7" roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  );
}

function EcosystemGroup({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={groupRef}>
      <LaptopMesh position={[0, -0.2, 0]} rotation={[0, 0.2, 0]} scale={[1, 1, 1]} floatSpeed={1.2} floatIntensity={0.08} phaseOffset={0} />
      <PhoneMesh position={[-2.5, 0.3, 1.2]} rotation={[0.2, 0.5, -0.1]} scale={[1, 1, 1]} floatSpeed={1.5} floatIntensity={0.12} phaseOffset={1.5} />
      <TabletMesh position={[2.6, 0.5, -0.8]} rotation={[-0.1, -0.4, 0.1]} scale={[0.9, 0.9, 0.9]} floatSpeed={1.0} floatIntensity={0.07} phaseOffset={3.0} />
      <WatchMesh position={[-1.8, 1.2, -1.8]} rotation={[0.4, 0.8, -0.2]} scale={[1.2, 1.2, 1.2]} floatSpeed={1.8} floatIntensity={0.15} phaseOffset={4.5} />
      <EarbudsMesh position={[1.5, -0.4, 2.0]} rotation={[0.1, -0.8, 0.3]} scale={[1.1, 1.1, 1.1]} floatSpeed={2.0} floatIntensity={0.1} phaseOffset={0.7} />
    </group>
  );
}

export default function HeroDeviceScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener?.("change", updateMotion);

    try {
      const canvas = document.createElement("canvas");
      setWebglAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglAvailable(false);
    }

    return () => media.removeEventListener?.("change", updateMotion);
  }, []);

  return (
    <div className="w-full h-full min-h-0 min-w-0 max-w-full relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#FFFFFF_0%,#E8F4FD_100%)]">
      {!webglAvailable ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-[rgb(var(--ace-text-secondary))]">
            <div className="text-6xl mb-3" aria-hidden="true">
              💻📱
            </div>
            <p className="text-sm">Premium devices, ready to explore</p>
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-[rgb(var(--ace-text-secondary))] tracking-wide">
              Loading Premium Device Ecosystem...
            </div>
          }
        >
          <Canvas
            className="!block"
            dpr={[1, 1.75]}
            camera={{ position: [0, 2.5, 5.5], fov: 45 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onCreated={({ gl }) => gl.setClearColor("#EAF4FB", 1)}
            shadows
          >
            <ambientLight intensity={0.7} color="#FFFFFF" />
            <directionalLight position={[5, 10, 3]} intensity={1.5} castShadow />
            <pointLight position={[-10, 5, -5]} intensity={1.0} color="#FFFFFF" />
            <spotLight position={[0, 8, 2]} angle={0.6} penumbra={0.8} intensity={2.5} color="#3B82F6" castShadow />

            <EcosystemGroup reducedMotion={reducedMotion} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
              <planeGeometry args={[30, 30]} />
              <shadowMaterial opacity={0.04} />
            </mesh>
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}