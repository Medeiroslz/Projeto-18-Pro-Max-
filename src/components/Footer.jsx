export default function Footer() {
  return (
    <footer className="flex h-[60px] w-full items-center border-t border-white/[0.08] bg-black px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-1 sm:flex-row sm:justify-between">
        {/* Texto copyright */}
        <span className="text-xs text-white sm:text-sm">
          &copy; Todos os direitos reservados &agrave; NS Imports
        </span>

        {/* Ícone Instagram */}
        <a
          href="https://www.instagram.com/nicolass_silvaa/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-icon"
          aria-label="Instagram"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

