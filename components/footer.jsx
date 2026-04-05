export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[#2A2A3A]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-[var(--font-orbitron)] text-[#FF2D55] text-xl mb-4">
          BoxRunner
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[#8A8FA3] text-sm">
          <span>Built with Unity.</span>
          <span className="hidden sm:inline">•</span>
          <span>First Indie Project.</span>
          <span className="hidden sm:inline">•</span>
          <span>© 2026 BoxRunner</span>
        </div>
      </div>
    </footer>
  )
}
