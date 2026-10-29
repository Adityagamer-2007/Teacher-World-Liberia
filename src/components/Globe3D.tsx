import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

function Scene() {
  const g = useRef<Group>(null)
  useFrame((_, d) => { if (g.current) g.current.rotation.y += d * 0.25 })
  return (<>
    <ambientLight intensity={0.7} /><pointLight position={[4, 4, 4]} intensity={60} color="#9bb8ff" />
    <group ref={g}>
      <mesh><sphereGeometry args={[1.25, 48, 48]} /><meshStandardMaterial color="#1d4ed8" roughness={0.5} metalness={0.2} /></mesh>
      <mesh><sphereGeometry args={[1.27, 24, 24]} /><meshBasicMaterial color="#9bb8ff" wireframe transparent opacity={0.35} /></mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}><torusGeometry args={[1.7, 0.015, 8, 96]} /><meshBasicMaterial color="#e9c46a" /></mesh>
    </group>
    <group position={[0, -1.7, 0]} rotation={[0.25, 0, 0]}>
      <mesh position={[-0.65, 0, 0]} rotation={[0, 0, 0.18]}><boxGeometry args={[1.3, 0.05, 0.9]} /><meshStandardMaterial color="#f5f7fb" /></mesh>
      <mesh position={[0.65, 0, 0]} rotation={[0, 0, -0.18]}><boxGeometry args={[1.3, 0.05, 0.9]} /><meshStandardMaterial color="#f5f7fb" /></mesh>
    </group>
  </>)
}

function hasWebGL() { try { return !!document.createElement('canvas').getContext('webgl') } catch { return false } }

export default function Globe3D() {
  const simple = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 600 || !hasWebGL()
  if (simple) return <div className="globe-fallback" role="img" aria-label="Decorative globe" />
  return <div className="globe" aria-hidden="true"><Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]}><Scene /></Canvas></div>
}
