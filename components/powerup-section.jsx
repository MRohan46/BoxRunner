"use client"

export function PowerUpSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Cyan accent glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12] via-[#00F0FF]/5 to-[#0D0D12]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Glowing blue orb */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#0080FF] animate-cyan-pulse animate-float" />
            
            {/* Inner glow */}
            <div className="absolute inset-4 md:inset-6 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
            
            {/* Outer rings */}
            <div className="absolute -inset-4 md:-inset-6 rounded-full border border-[#00F0FF]/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-8 md:-inset-12 rounded-full border border-[#00F0FF]/10" />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-[var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-6 text-glow-cyan text-[#00F0FF]">
              5 Seconds of Power
            </h2>
            
            <p className="text-[#E6E6E6] text-lg md:text-xl leading-relaxed max-w-xl">
              Pick up the blue orb and gain temporary invincibility. For five seconds, obstacles are no longer your enemy — they&apos;re targets.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8 mt-8 justify-center lg:justify-start">
              <div className="text-center">
                <p className="font-[var(--font-orbitron)] text-3xl font-bold text-[#00F0FF]">5s</p>
                <p className="text-[#8A8FA3] text-sm">Duration</p>
              </div>
              <div className="text-center">
                <p className="font-[var(--font-orbitron)] text-3xl font-bold text-[#00F0FF]">100%</p>
                <p className="text-[#8A8FA3] text-sm">Invincibility</p>
              </div>
              <div className="text-center">
                <p className="font-[var(--font-orbitron)] text-3xl font-bold text-[#00F0FF]">0</p>
                <p className="text-[#8A8FA3] text-sm">Fear</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-transparent to-[#00F0FF]/50" />
      <div className="absolute right-0 top-1/2 w-32 h-px bg-gradient-to-l from-transparent to-[#00F0FF]/50" />
    </section>
  )
}
