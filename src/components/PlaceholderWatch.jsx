import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const SPIN_END = 0.65
const REVEAL_START = 0.8

function revealAmount(p) {
  if (p <= REVEAL_START) return 0
  const t = (p - REVEAL_START) / (1 - REVEAL_START)
  return THREE.MathUtils.smootherstep(t, 0, 1)
}

export default function PlaceholderWatch({ progressRef }) {
  const group = useRef(null)

  useFrame(() => {
    const g = group.current
    if (!g) return
    const p = progressRef.current
    const amount = p <= SPIN_END ? 0 : revealAmount(p)
    g.position.x = THREE.MathUtils.lerp(0.85, 0.6, amount)
    g.position.y = THREE.MathUtils.lerp(-1.05, -0.58, amount)
    g.scale.setScalar(THREE.MathUtils.lerp(0.001, 0.55, amount))
  })

  return (
    <group ref={group} scale={0.001}>
      <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 32]} />
        <meshStandardMaterial color="#dcdce0" metalness={0.5} roughness={0.25} />
      </mesh>
      <RoundedBox args={[0.22, 0.27, 0.09]} radius={0.05} smoothness={4} position={[0, 0.02, 0]}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.3} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.17, 0.21, 0.01]} radius={0.03} smoothness={4} position={[0, 0.02, 0.05]}>
        <meshStandardMaterial color="#0a0a0a" emissive="#1a3a2c" emissiveIntensity={0.6} />
      </RoundedBox>
    </group>
  )
}
