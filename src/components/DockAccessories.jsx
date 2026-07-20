import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SPIN_END = 0.65
const REVEAL_START = 0.8 // within the dock phase, when accessories start appearing

function revealAmount(p) {
  if (p <= REVEAL_START) return 0
  const t = (p - REVEAL_START) / (1 - REVEAL_START)
  return THREE.MathUtils.smootherstep(t, 0, 1)
}

export function MagSafeStand({ progressRef }) {
  const ref = useRef(null)

  useFrame(() => {
    const g = ref.current
    if (!g) return
    const p = progressRef.current
    const amount = p <= SPIN_END ? 0 : revealAmount(p)
    g.scale.setScalar(0.6 + amount * 0.4)
    g.traverse((child) => {
      if (child.isMesh) {
        child.material.opacity = amount
        child.material.transparent = true
      }
    })
  })

  return (
    <group ref={ref} position={[-0.55, -0.62, 0]}>
      {/* base plinth */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.34, 0.38, 0.06, 48]} />
        <meshStandardMaterial color="#c9c9cf" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* magsafe puck */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 48]} />
        <meshStandardMaterial color="#e7e7ea" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* slim upright arm the phone leans against */}
      <mesh position={[0, 0.22, -0.05]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.05, 0.42, 0.02]} />
        <meshStandardMaterial color="#b8b8bf" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

