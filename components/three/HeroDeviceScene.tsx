'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function useReducedMotion() {
  const reduced = useRef<boolean>(false)
  if (typeof window !== 'undefined') {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return reduced
}

function Laptop() {
  const ref = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()
  useFrame(({ clock }) => {
    if (!ref.current) return
    if (reducedMotion.current) return // hold a static pose; do not animate
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * (Math.PI/2)) * 0.15
    ref.current.rotation.y = Math.sin(t * Math.PI / 8) * THREE.MathUtils.degToRad(8)
    ref.current.rotation.z = Math.sin(t * 0.7) * 0.03
  })
  return (
    <group ref={ref} position={[-0.1, 0.2, 0]}>
      <mesh position={[0, -0.02, 0.35]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2.2, 0.06, 1.5]} />
        <meshStandardMaterial color="#c8cdd5" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.55, -0.32]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.2, 1.35, 0.06]} />
        <meshStandardMaterial color="#11151f" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.55, -0.28]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[2.05, 1.22]} />
        <meshBasicMaterial color="#3B82F6" opacity={0.08} transparent />
      </mesh>
    </group>
  )
}
function Phone() {
  const ref = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()
  useFrame(({ clock }) => {
    if (!ref.current) return
    if (reducedMotion.current) return // hold a static pose; do not animate
    const t = clock.getElapsedTime() + 1.2
    ref.current.position.y = Math.sin(t * (Math.PI/2)) * 0.12 - 0.35
    ref.current.rotation.y = Math.sin(t * Math.PI / 8) * THREE.MathUtils.degToRad(6) + 0.25
  })
  return (
    <group ref={ref} position={[1.15, -0.35, 0.5]}>
      <mesh>
        <boxGeometry args={[0.55, 1.08, 0.06]} />
        <meshStandardMaterial color="#1a1f2b" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.50, 1.0]} />
        <meshBasicMaterial color="#3B82F6" opacity={0.06} transparent />
      </mesh>
    </group>
  )
}
export default function HeroDeviceScene() {
  return (
    <div className="w-full h-[320px] md:h-[480px]">
      <Canvas camera={{ position: [0, 0.3, 4.2], fov: 42 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        {/* ACE Electronics – Hero 3D Scene
            Current: primitive geometry (Laptop + Phone) with Stage 3 motion spec
            To swap to final assets: replace <Laptop/> / <Phone/> with:
              <primitive object={gltf.scene} />
            using useGLTF('/models/macbook-ace.glb') etc.
        */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.1} />
        <pointLight position={[-2, 1, 2]} intensity={0.5} color="#3B82F6" />
        <Laptop />
        <Phone />
      </Canvas>
    </div>
  )
}
