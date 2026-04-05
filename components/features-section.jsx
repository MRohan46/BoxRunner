"use client"

import { Zap, Skull, Circle, Target } from "lucide-react"
import { TiltCard, ParallaxLayer } from "./tilt-card"

const features = [
  {
    icon: Zap,
    title: "Procedural Level Generation",
    description: "Every run is different. The challenge never repeats.",
    color: "#FF2D55",
  },
  {
    icon: Skull,
    title: "One Mistake = Game Over",
    description: "No checkpoints. No mercy.",
    color: "#FF2D55",
  },
  {
    icon: Circle,
    title: "Blue Orb Power-Up",
    description: "Collect the blue orb to become invincible for 5 seconds. Smash through obstacles without fear.",
    color: "#00F0FF",
  },
  {
    icon: Target,
    title: "Skill-Based Survival",
    description: "Speed increases over time. The longer you survive, the harder it gets.",
    color: "#FF2D55",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2 className="font-[var(--font-orbitron)] text-4xl md:text-5xl font-bold text-center mb-16 text-glow-red">
          Features
        </h2>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <TiltCard 
                key={index} 
                glowColor={feature.color}
                className="h-full"
              >
                <div className="relative p-8 h-full">
                  {/* Animated background gradient that responds to hover */}
                  <ParallaxLayer depth={0} className="absolute inset-0">
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(circle at 20% 20%, ${feature.color}15 0%, transparent 50%)`,
                      }}
                    />
                  </ParallaxLayer>

                  {/* Grid pattern overlay */}
                  <ParallaxLayer depth={0.5} className="absolute inset-0">
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `
                          linear-gradient(${feature.color} 1px, transparent 1px),
                          linear-gradient(90deg, ${feature.color} 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </ParallaxLayer>

                  {/* Icon with parallax */}
                  <ParallaxLayer depth={2} className="relative">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300"
                      style={{ 
                        backgroundColor: `${feature.color}15`,
                        boxShadow: `0 0 20px ${feature.color}30`,
                      }}
                    >
                      <IconComponent
                        className="w-7 h-7 transition-transform duration-300"
                        style={{ color: feature.color }}
                      />
                    </div>
                  </ParallaxLayer>

                  {/* Title with parallax */}
                  <ParallaxLayer depth={2.5}>
                    <h3 className="font-[var(--font-orbitron)] text-xl font-bold mb-3 text-[#E6E6E6]">
                      {feature.title}
                    </h3>
                  </ParallaxLayer>

                  {/* Description with parallax */}
                  <ParallaxLayer depth={1.5}>
                    <p className="text-[#8A8FA3] leading-relaxed">
                      {feature.description}
                    </p>
                  </ParallaxLayer>

                  {/* Corner accent with parallax */}
                  <ParallaxLayer depth={3} className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div
                      className="absolute top-0 right-0 w-32 h-1 origin-top-right rotate-45 translate-x-8 -translate-y-4"
                      style={{ 
                        backgroundColor: feature.color,
                        boxShadow: `0 0 10px ${feature.color}`,
                      }}
                    />
                  </ParallaxLayer>

                  {/* Bottom accent line */}
                  <ParallaxLayer depth={1} className="absolute bottom-0 left-8 right-8">
                    <div 
                      className="h-px opacity-30"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                      }}
                    />
                  </ParallaxLayer>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
