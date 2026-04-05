"use client"

import { useEffect, useRef, useState } from "react"

export function GameplaySection() {
  const videoRef = useRef(null)
  const [showGameOver, setShowGameOver] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true // Required for autoplay policies

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log("Playback blocked:", err)
            })
          } else {
            video.pause()
          }
        })
      },
      {
        threshold: 0.6, // 60% visible before playing
      }
    )

    observer.observe(video)

    const handleEnded = () => {
      setShowGameOver(true)
    }

    const handleKeyDown = (e) => {
      if (e.key === "r" || e.key === "R") {
        video.currentTime = 0
        video.play()
        setShowGameOver(false)
      }
    }

    video.addEventListener("ended", handleEnded)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      observer.disconnect()
      video.removeEventListener("ended", handleEnded)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <section id="gameplay" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="font-[var(--font-orbitron)] text-4xl md:text-5xl font-bold text-center mb-16 text-glow-red">
          Gameplay
        </h2>

        {/* Video container */}
        <div className="relative aspect-video bg-[#13131A] rounded-lg overflow-hidden border border-[#2A2A3A]">
          {/* Video placeholder - replace src with actual video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://i.ibb.co/LzKZhDfv/Capture.png"
            playsInline
            autoPlay
          >
            {/* Updated Video URL */}
            <source src="https://res.cloudinary.com/dtju3tdng/video/upload/f_auto:video/Gameplay_mfc4ib?_s=vp-3.13.1" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Game Over overlay */}
          {showGameOver && (
            <div className="absolute inset-0 bg-[#0D0D12]/90 flex flex-col items-center justify-center">
              <p className="font-[var(--font-orbitron)] text-4xl md:text-6xl font-bold text-[#FF2D55] animate-glitch mb-4">
                GAME OVER
              </p>
              <p className="font-[var(--font-orbitron)] text-xl md:text-2xl text-[#8A8FA3]">
                Press R to Restart
              </p>
            </div>
          )}
        </div>

        {/* Instruction text */}
        <p className="text-center text-[#8A8FA3] mt-6 text-sm">
          Press <span className="font-[var(--font-orbitron)] text-[#00F0FF] px-2 py-1 bg-[#13131A] rounded border border-[#2A2A3A]">R</span> to restart.
        </p>
      </div>
    </section>
  )
}