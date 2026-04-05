"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Smartphone } from "lucide-react"
import { TiltCard, ParallaxLayer } from "./tilt-card"

const platforms = [
  {
    icon: Monitor,
    title: "Windows Version",
    format: ".EXE File",
    subtitle: "Optimized for PC",
    color: "#FF2D55",
    buttonText: "Download for Windows",
    // Added EXE link
    downloadUrl: "https://github.com/MRohan46/BoxRunner/releases/download/v1.0.0/BoxRunner_x64_Setup.exe",
  },
  {
    icon: Smartphone,
    title: "Android Version",
    format: ".APK File",
    subtitle: "Play anywhere",
    color: "#00F0FF",
    buttonText: "Download for Android",
    // Added APK link
    downloadUrl: "https://github.com/MRohan46/BoxRunner/releases/download/v1.0.0/BoxRunner.apk",
  },
]

export function DownloadSection() {
  return (
    <section id="download" className="py-24 px-4 bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="font-[var(--font-orbitron)] text-4xl md:text-5xl font-bold text-center mb-16 text-glow-red">
          Download Now
        </h2>

        {/* Download panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon
            return (
              <TiltCard key={index} glowColor={platform.color} className="h-full">
                <div className="relative p-8 h-full">
                  {/* Background gradient with parallax */}
                  <ParallaxLayer depth={0} className="absolute inset-0">
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${platform.color}20 0%, transparent 60%)`,
                      }}
                    />
                  </ParallaxLayer>

                  {/* Floating particles */}
                  <ParallaxLayer depth={0.5} className="absolute inset-0 overflow-hidden">
                    <div 
                      className="absolute w-2 h-2 rounded-full opacity-30"
                      style={{
                        backgroundColor: platform.color,
                        top: "20%",
                        left: "15%",
                        boxShadow: `0 0 10px ${platform.color}`,
                      }}
                    />
                    <div 
                      className="absolute w-1 h-1 rounded-full opacity-40"
                      style={{
                        backgroundColor: platform.color,
                        top: "60%",
                        right: "20%",
                        boxShadow: `0 0 8px ${platform.color}`,
                      }}
                    />
                    <div 
                      className="absolute w-1.5 h-1.5 rounded-full opacity-25"
                      style={{
                        backgroundColor: platform.color,
                        bottom: "30%",
                        left: "25%",
                        boxShadow: `0 0 8px ${platform.color}`,
                      }}
                    />
                  </ParallaxLayer>

                  <div className="relative z-10 text-center">
                    {/* Icon with parallax */}
                    <ParallaxLayer depth={2.5}>
                      <div 
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300"
                        style={{ 
                          backgroundColor: `${platform.color}15`,
                          boxShadow: `0 0 30px ${platform.color}30`,
                        }}
                      >
                        <IconComponent 
                          className="w-10 h-10 transition-transform duration-300" 
                          style={{ color: platform.color }}
                        />
                      </div>
                    </ParallaxLayer>
                    
                    {/* Title with parallax */}
                    <ParallaxLayer depth={2}>
                      <h3 className="font-[var(--font-orbitron)] text-2xl font-bold mb-2 text-[#E6E6E6]">
                        {platform.title}
                      </h3>
                    </ParallaxLayer>
                    
                    {/* Subtitle with parallax */}
                    <ParallaxLayer depth={1.5}>
                      <p className="text-[#8A8FA3] mb-2">{platform.format}</p>
                      <p className="text-[#8A8FA3] text-sm mb-8">{platform.subtitle}</p>
                    </ParallaxLayer>
                    
                    {/* Button with parallax and direct link */}
                    <a 
                      href={platform.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                    <ParallaxLayer depth={3}>
                        <Button
                          size="lg"
                          className="w-full font-bold py-6 text-lg transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: platform.color,
                            color: platform.color === "#00F0FF" ? "#0D0D12" : "#FFFFFF",
                            boxShadow: `0 0 20px ${platform.color}50`,
                          }}
                        >
                          {platform.buttonText}
                        </Button>
                    </ParallaxLayer>
                    </a>
                  </div>

                  {/* Corner decorations */}
                  <ParallaxLayer depth={1} className="absolute top-4 left-4">
                    <div 
                      className="w-8 h-8"
                      style={{
                        borderTop: `2px solid ${platform.color}40`,
                        borderLeft: `2px solid ${platform.color}40`,
                      }}
                      />
                  </ParallaxLayer>
                  <ParallaxLayer depth={1} className="absolute bottom-4 right-4">
                    <div 
                      className="w-8 h-8"
                      style={{
                        borderBottom: `2px solid ${platform.color}40`,
                        borderRight: `2px solid ${platform.color}40`,
                      }}
                    />
                  </ParallaxLayer>
                </div>
              </TiltCard>
            )
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#8A8FA3] mt-12 text-sm">
          No ads. No tracking. Just gameplay.
        </p>
      </div>
    </section>
  )
}