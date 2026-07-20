import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const SPIN_END = 0.65

export default function PlaceholderPhone({ progressRef }) {
  const group = useRef(null)

  useFrame(() => {
    const g = group.current
    if (!g) return
    const p = progressRef.current

    if (p <= SPIN_END) {
      const spinP = p / SPIN_END
      g.rotation.y = spinP * Math.PI * 4
      g.rotation.x = 0
      g.position.x = 0
      g.position.y = Math.sin(spinP * Math.PI * 2) * 0.05
      g.scale.setScalar(1)
    } else {
      const zoomP = (p - SPIN_END) / (1 - SPIN_END)
      const eased = THREE.MathUtils.smootherstep(zoomP, 0, 1)

      const startRotY = Math.PI * 4
      const finalRotY = Math.PI * 0.15
      g.rotation.y = THREE.MathUtils.lerp(startRotY, finalRotY, eased)
      g.rotation.x = THREE.MathUtils.lerp(0, -0.15, eased)

      g.position.x = 0
      g.position.y = THREE.MathUtils.lerp(
        Math.sin(Math.PI * 2) * 0.05,
        0.15,
        eased
      )
      g.scale.setScalar(THREE.MathUtils.lerp(1, 1.8, eased))
    }
  })

  return (
    <group ref={group}>
      <RoundedBox args={[0.55, 1.15, 0.06]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color="#d8d8dc" metalness={0.6} roughness={0.25} />
      </RoundedBox>
      <RoundedBox args={[0.5, 1.08, 0.005]} radius={0.07} smoothness={4} position={[0, 0, 0.033]}>
        <meshStandardMaterial color="#050505" metalness={0.1} roughness={0.4} />
      </RoundedBox>
    </group>
  )
}
