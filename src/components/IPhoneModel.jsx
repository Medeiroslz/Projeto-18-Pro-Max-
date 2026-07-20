import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { normalizeModel } from '../lib/normalizeModel'

const MODEL_PATH = '/models/iphone-18-pro-max.glb'
const TARGET_HEIGHT = 1.15

useGLTF.preload(MODEL_PATH)

const SPIN_END = 0.65
const ZOOM_START = SPIN_END

export default function IPhoneModel({ progressRef }) {
  const { scene } = useGLTF(MODEL_PATH)
  const group = useRef(null)

  const model = useMemo(() => normalizeModel(scene, TARGET_HEIGHT, 'height').wrapper, [scene])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const p = progressRef.current

    if (p <= SPIN_END) {
      // SPIN: 2 full turns (720°) — iPhone centralizado
      const spinP = p / SPIN_END

      g.rotation.y = spinP * Math.PI * 4
      g.rotation.x = 0
      g.position.x = 0
      g.position.y = Math.sin(spinP * Math.PI * 2) * 0.05
      g.scale.setScalar(1)
    } else {
      // ZOOM NA CÂMERA: iPhone escala e gira para mostrar o módulo traseiro
      const zoomP = (p - ZOOM_START) / (1 - ZOOM_START) // 0 -> 1
      const eased = THREE.MathUtils.smootherstep(zoomP, 0, 1)

      // Rotaciona para mostrar a parte traseira (câmera)
      // 720° = ~PI*4. A câmera fica no canto superior esquerdo das costas
      // Vamos girar para ~PI*0.5 (90°) para mostrar a lateral/costas
      const startRotY = Math.PI * 4
      const finalRotY = Math.PI * 0.15 // leve ângulo mostrando o módulo da câmera
      g.rotation.y = THREE.MathUtils.lerp(startRotY, finalRotY, eased)

      // Inclina levemente para frente para destacar a câmera
      g.rotation.x = THREE.MathUtils.lerp(0, -0.15, eased)

      // Centralizado (sem offset lateral)
      g.position.x = 0
      g.position.y = THREE.MathUtils.lerp(
        Math.sin(Math.PI * 2) * 0.05,
        0.15, // sobe um pouco para centralizar o módulo da câmera
        eased
      )

      // ZOOM: escala o iPhone para simular aproximação
      g.scale.setScalar(THREE.MathUtils.lerp(1, 1.8, eased))
    }
  })

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  )
}

