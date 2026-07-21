import { useState, useEffect } from 'react'

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const duration = 3000 // 3 segundos

    let frameId
    const tick = (now) => {
      const elapsed = now - startTime
      const raw = Math.min((elapsed / duration) * 100, 100)
      setProgress(Math.round(raw))
      if (raw < 100) {
        frameId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => onFinish(), 300)
      }
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [onFinish])

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-[#0a0a0a] px-4">
      {/* Título estilo 8-bit */}
      <h1
        className="text-center font-mono text-xl font-bold uppercase tracking-[0.15em] sm:text-2xl"
        style={{
          color: '#ccc',
          textShadow: '3px 3px 0 #333',
          imageRendering: 'pixelated',
        }}
      >
        Carregando seu novo
        <br />
        modelo apple
      </h1>

      {/* Container da barra + porcentagem */}
      <div className="relative flex items-center justify-center" style={{ width: '75vw', maxWidth: '700px' }}>
        {/* Barra externa (fundo escuro + borda 8-bit) */}
        <div
          className="relative w-full"
          style={{
            height: 28,
            background: '#222',
            border: '3px solid #555',
            outline: '3px solid #333',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
            imageRendering: 'pixelated',
          }}
        >
          {/* Preenchimento com estilo pixelado */}
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: `repeating-linear-gradient(
                90deg,
                #ddd 0px,
                #ddd 6px,
                #aaa 6px,
                #aaa 12px
              )`,
              imageRendering: 'pixelated',
              transition: 'width 0.12s linear',
            }}
          />
        </div>

        {/* Porcentagem centralizada */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm font-bold tracking-wider"
          style={{
            color: '#fff',
            textShadow: '2px 2px 0 #000',
            imageRendering: 'pixelated',
          }}
        >
          {progress}%
        </span>
      </div>
    </section>
  )
}
