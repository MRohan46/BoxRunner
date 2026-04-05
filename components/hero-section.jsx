"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Smartphone } from "lucide-react"

// Pre-defined particle positions to avoid hydration mismatch
const particles = [
  { left: 5, top: 12, delay: 0.2, duration: 3.5 },
  { left: 15, top: 45, delay: 1.1, duration: 4.2 },
  { left: 25, top: 78, delay: 2.3, duration: 3.8 },
  { left: 35, top: 23, delay: 0.8, duration: 4.5 },
  { left: 45, top: 67, delay: 1.5, duration: 3.2 },
  { left: 55, top: 34, delay: 2.7, duration: 4.1 },
  { left: 65, top: 89, delay: 0.4, duration: 3.6 },
  { left: 75, top: 56, delay: 1.9, duration: 4.8 },
  { left: 85, top: 15, delay: 2.1, duration: 3.3 },
  { left: 95, top: 42, delay: 0.6, duration: 4.4 },
  { left: 10, top: 71, delay: 1.3, duration: 3.9 },
  { left: 20, top: 28, delay: 2.5, duration: 4.0 },
  { left: 30, top: 93, delay: 0.9, duration: 3.4 },
  { left: 40, top: 8, delay: 1.7, duration: 4.6 },
  { left: 50, top: 52, delay: 2.9, duration: 3.7 },
  { left: 60, top: 81, delay: 0.3, duration: 4.3 },
  { left: 70, top: 19, delay: 1.4, duration: 3.1 },
  { left: 80, top: 63, delay: 2.2, duration: 4.7 },
  { left: 90, top: 37, delay: 0.7, duration: 3.0 },
  { left: 98, top: 85, delay: 1.8, duration: 4.9 },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg animate-grid-move opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D12]/50 to-[#0D0D12]" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00F0FF]/30 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="font-[var(--font-orbitron)] text-6xl md:text-8xl font-bold tracking-wider mb-4 text-glow-red animate-neon-flicker">
          BoxRunner
        </h1>

        {/* Animated neon line under title */}
        <div className="relative h-1 w-48 md:w-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF2D55] to-transparent animate-neon-pulse" />
        </div>

        {/* Subtitle */}
        <p className="font-[var(--font-orbitron)] text-xl md:text-2xl text-[#00F0FF] tracking-widest mb-6">
          Dodge. Survive. Repeat.
        </p>

        {/* Description */}
        <p className="text-[#8A8FA3] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          A minimalist endless runner where precision is survival. One mistake ends everything.
        </p>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={"https://github.com/MRohan46/BoxRunner/releases/download/v1.0.0/BoxRunner_x64_Setup.exe"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button
              size="lg"
              className="group relative bg-[#FF2D55] hover:bg-[#FF2D55] text-white font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 glow-red"
              >
              <Monitor className="mr-2 h-5 w-5" />
              Download for Windows (.EXE)
              <div className="absolute inset-0 rounded-md bg-[#FF2D55] opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
            </Button>
          </a>
          <a 
            href={"https://github.com/MRohan46/BoxRunner/releases/download/v1.0.0/BoxRunner.apk"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button
              size="lg"
              variant="outline"
              className="group relative border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-[#00F0FF] font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
              <Smartphone className="mr-2 h-5 w-5" />
              Download for Android (.APK)
              <div className="absolute inset-0 rounded-md bg-[#00F0FF] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#8A8FA3] rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#8A8FA3] rounded-full" />
        </div>
      </div>
    </section>
  )
}
