import { useState, lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import CTA from './components/CTA'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

// The 3D scene pulls in three.js + the GLTF model, so it's split into its
// own chunk and only loaded once the browser is idle after first paint.
const ProductScene = lazy(() => import('./components/ProductScene'))

function ProductSceneFallback() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-400/20 border-t-gold-400/70" />
    </section>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return <LoadingScreen onFinish={() => setLoaded(true)} />
  }

  return (
    <>
      <Header />
      <main className="bg-page min-h-screen">
        <Hero />
        <Suspense fallback={<ProductSceneFallback />}>
          <ProductScene />
        </Suspense>
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
