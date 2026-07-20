import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useSectionScrollProgress } from '../hooks/useSectionScrollProgress'
import IPhoneModel from './IPhoneModel'
import ModelErrorBoundary from './ModelErrorBoundary'
import PlaceholderPhone from './PlaceholderPhone'

const SPIN_END = 0.65
const SEGMENTS = 4
const SEGMENT_SIZE = SPIN_END / SEGMENTS

const cardContent = [
  {
    title: 'Câmera Fusion Pro',
    copy: 'Novo sensor principal de 61MP com maior abertura — até 40% mais luz captada que o iPhone 17 Pro Max.',
  },
  {
    title: 'Bateria de longa duração',
    copy: 'Nova química de célula empilhada garante até 6 horas a mais de uso que a geração anterior.',
  },
  {
    title: 'Chip A20 Pro',
    copy: 'CPU e GPU até 30% mais rápidas, com um novo Neural Engine dedicado à IA no dispositivo.',
  },
  {
    title: 'Tela ProMotion Ultra',
    copy: 'Brilho de pico 40% maior ao ar livre e bordas ainda mais finas, para uma imagem que preenche a mão.',
  },
]

const cardVariants = {
  enter: (isLeft) => ({
    x: isLeft ? -40 : 40,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (isLeft) => ({
    x: isLeft ? 40 : -40,
    opacity: 0,
    scale: 0.92,
  }),
}

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.001, 4, 4]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

export default function ProductScene() {
  const sectionRef = useRef(null)
  const { progressRef, progress } = useSectionScrollProgress(sectionRef)

  const showCards = progress < SPIN_END
  const rawIndex = Math.min(Math.floor(progress / SEGMENT_SIZE), SEGMENTS - 1)
  const cardIndex = showCards ? rawIndex : -1
  const isLeft = cardIndex % 2 === 0

  return (
    <section ref={sectionRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* radial gradient to spotlight the product */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(10,10,10,0) 55%)',
          }}
        />

        <Canvas
          className="relative z-10"
          camera={{ position: [0, 0, 3.4], fov: 32 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.4} />
          {/* Key light */}
          <directionalLight position={[3, 4, 5]} intensity={1.6} />
          {/* Fill light com tom dourado */}
          <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#d4a834" />
          {/* Rim light */}
          <directionalLight position={[0, -2, -4]} intensity={0.3} color="#ffffff" />
          {/* Top accent dourado */}
          <directionalLight position={[0, 6, 0]} intensity={0.3} color="#d4a834" />

          <Suspense fallback={<SceneLoader />}>
            <ModelErrorBoundary fallback={<PlaceholderPhone progressRef={progressRef} />}>
              <IPhoneModel progressRef={progressRef} />
            </ModelErrorBoundary>

            <Environment
              preset="studio"
              environmentIntensity={0.8}
              environmentRotation={[0, Math.PI / 4, 0]}
            />
            <ContactShadows
              position={[0, -0.95, 0]}
              opacity={0.5}
              scale={4}
              blur={2.4}
              far={1.2}
              resolution={1024}
            />
          </Suspense>
        </Canvas>

        {/* Cards overlay sincronizados com o giro */}
        <AnimatePresence mode="wait">
          {cardIndex >= 0 && (
            <motion.div
              key={cardIndex}
              custom={isLeft}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-none absolute z-20 w-64 max-w-[65vw] sm:w-72 ${
                isLeft ? 'left-4 sm:left-12 lg:left-20' : 'right-4 sm:right-12 lg:right-20'
              } top-1/2 -translate-y-1/2 will-change-transform`}
            >
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-6 backdrop-blur-xl">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-gold-400 sm:mb-2 sm:text-xs">
                  {isLeft ? 'Novidade' : 'Destaque'}
                </span>
                <h3 className="mb-1.5 text-sm font-bold text-white sm:mb-2 sm:text-xl">
                  {cardContent[cardIndex].title}
                </h3>
                <p className="text-[11px] leading-relaxed text-neutral-300 sm:text-sm">
                  {cardContent[cardIndex].copy}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

<span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-neutral-500">
          Veja o que mudou
        </span>
      </div>
    </section>
  )
}
