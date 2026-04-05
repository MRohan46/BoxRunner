"use client"

import { useRef, useState } from "react"

export function TiltCard({ children, className = "", glowColor = "#FF2D55" }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    scale: 1,
  })
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate mouse position relative to center (-1 to 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)

    // Calculate rotation (max 15 degrees)
    const rotateY = mouseX * 15
    const rotateX = -mouseY * 15

    // Calculate glow position (0-100%)
    const glowX = ((e.clientX - rect.left) / rect.width) * 100
    const glowY = ((e.clientY - rect.top) / rect.height) * 100

    setTransform({
      rotateX,
      rotateY,
      translateZ: 30,
      scale: 1.02,
    })
    setGlowPosition({ x: glowX, y: glowY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTransform({
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      scale: 1,
    })
    setGlowPosition({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Main card with 3D transform */}
      <div
        className="relative h-full rounded-lg border border-[#2A2A3A] overflow-hidden"
        style={{
          transform: `
            perspective(1000px)
            rotateX(${transform.rotateX}deg)
            rotateY(${transform.rotateY}deg)
            translateZ(${transform.translateZ}px)
            scale(${transform.scale})
          `,
          transition: isHovering 
            ? "transform 0.1s ease-out" 
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
          boxShadow: isHovering
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${glowColor}30`
            : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Background layer */}
        <div 
          className="absolute inset-0 bg-[#13131A]"
          style={{
            transform: `translateZ(-10px)`,
          }}
        />

        {/* Dynamic light reflection / holographic sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}25 0%, transparent 50%)`
              : "transparent",
            transition: isHovering ? "none" : "background 0.5s ease-out",
          }}
        />

        {/* Moving reflection highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovering
              ? `linear-gradient(
                  ${105 + transform.rotateY}deg,
                  transparent 0%,
                  transparent 40%,
                  rgba(255, 255, 255, 0.1) 45%,
                  rgba(255, 255, 255, 0.2) 50%,
                  rgba(255, 255, 255, 0.1) 55%,
                  transparent 60%,
                  transparent 100%
                )`
              : "transparent",
            opacity: isHovering ? 1 : 0,
            transition: isHovering ? "opacity 0.2s ease-out" : "opacity 0.5s ease-out",
          }}
        />

        {/* Content wrapper with parallax */}
        <div 
          className="relative z-10 h-full"
          style={{
            transform: `translateZ(20px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>

        {/* Border glow effect */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: isHovering
              ? `inset 0 0 30px ${glowColor}15, 0 0 20px ${glowColor}20`
              : "none",
            transition: "box-shadow 0.3s ease-out",
          }}
        />
      </div>
    </div>
  )
}

// Parallax layer component for content inside cards
export function ParallaxLayer({ children, depth = 1, className = "" }) {
  return (
    <div 
      className={className}
      style={{
        transform: `translateZ(${depth * 15}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}
