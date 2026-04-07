"use client"

import { useEffect, useRef } from "react"
import { HeroSection } from "@/components/hero-section"
import { GameplaySection } from "@/components/gameplay-section"
import { FeaturesSection } from "@/components/features-section"
import { PowerUpSection } from "@/components/powerup-section"
import { DownloadSection } from "@/components/download-section"
import { DownloadCountSection } from "../components/download-count-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const sectionsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    const sections = sectionsRef.current?.querySelectorAll(".fade-section")
    sections?.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main ref={sectionsRef} className="min-h-screen bg-[#0D0D12] overflow-x-hidden">
      <HeroSection />
      
      <div className="fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <DownloadCountSection />
      </div>

      <div className="fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <GameplaySection />
      </div>
      
      <div className="fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
        <FeaturesSection />
      </div>
      
      <div className="fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
        <PowerUpSection />
      </div>
      
      <div className="fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300">
        <DownloadSection />
      </div>
      
      <Footer />
    </main>
  )
}
