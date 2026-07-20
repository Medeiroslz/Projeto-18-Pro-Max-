import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { normalizeModel } from '../lib/normalizeModel'

const MODEL_PATH = '/models/apple_watch_ultra_2.glb'
const TARGET_SIZE = 0.85 // normalized against the model's longest dimension (case + band)

useGLTF.preload(MODEL_PATH)

const SPIN_END = 0.65
const REVEAL_START = 0.8 // within the dock phase, when the watch starts appearing

function revealAmount(p) {
  if (p <= REVEAL_START) return 0
  const t = (p - REVEAL_START) / (1 - REVEAL_START)
  return THREE.MathUtils.smootherstep(t, 0, 1)
}

export default function WatchModel({ progressRef }) {
  const { scene } = useGLTF(MODEL_PATH)
  const group = useRef(null)

  const model = useMemo(() => normalizeModel(scene, TARGET_SIZE, 'max').wrapper, [scene])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const p = progressRef.current
    const amount = p <= SPIN_END ? 0 : revealAmount(p)

    g.position.x = THREE.MathUtils.lerp(0.85, 0.6, amount)
    g.position.y = THREE.MathUtils.lerp(-1.05, -0.6, amount)
    g.position.z = 0.05
    g.rotation.y = THREE.MathUtils.lerp(-0.6, 0.35, amount)
    g.scale.setScalar(THREE.MathUtils.lerp(0.001, 1, amount))
  })

  return (
    <group ref={group} scale={0.001}>
      <primitive object={model} />
    </group>
  )
}
