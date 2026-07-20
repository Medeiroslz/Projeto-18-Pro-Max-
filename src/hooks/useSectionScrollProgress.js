import { useEffect, useRef, useState } from 'react'

/**
 * Tracks how far the user has scrolled through a tall section (e.g. 400vh).
 * Returns both a ref (for r3f useFrame loops without re-renders) and
 * a state value (for React components that need to react to scroll changes).
 */
export function useSectionScrollProgress(sectionRef) {
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const scrollableHeight = el.offsetHeight - window.innerHeight
      let p = 0
      if (scrollableHeight > 0) {
        const scrolled = -rect.top
        p = scrolled / scrollableHeight
        p = Math.min(Math.max(p, 0), 1)
      }
      progressRef.current = p
      setProgress(p)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef])

  return { progressRef, progress }
}
