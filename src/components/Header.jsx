import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 z-50 p-4 sm:p-6"
    >
      <a href="/" className="block" aria-label="Página inicial">
        <img
          src="/logo-header.png"
          alt="Logo"
          className="h-10 w-10 sm:h-16 sm:w-16 object-contain"
        />
      </a>
    </motion.header>
  )
}

