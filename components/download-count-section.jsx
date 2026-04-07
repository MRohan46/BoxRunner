"use client"

import { useEffect, useState } from "react"

export function DownloadCountSection() {
  const [stats, setStats] = useState({ total: null, windows: null, android: null, stars: null })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [relRes, repoRes] = await Promise.all([
          fetch("https://api.github.com/repos/MRohan46/BoxRunner/releases"),
          fetch("https://api.github.com/repos/MRohan46/BoxRunner"),
        ])
        const releases = await relRes.json()
        const repo = await repoRes.json()

        let windows = 0, android = 0
        for (const release of releases) {
          for (const asset of release.assets ?? []) {
            if (asset.name.toLowerCase().endsWith(".exe")) windows += asset.download_count
            if (asset.name.toLowerCase().endsWith(".apk")) android += asset.download_count
          }
        }
        setStats({ total: windows + android, windows, android, stars: repo.stargazers_count ?? 0 })
      } catch {
        setStats({ total: 0, windows: 0, android: 0, stars: 0 })
      }
    }
    fetchStats()
  }, [])

  const fmt = (n) => {
    if (n === null) return "—"
    if (n >= 1000) return (n / 1000).toFixed(1) + "k"
    return n.toString()
  }

  const winPct = stats.total ? Math.round((stats.windows / stats.total) * 100) : 0
  const andPct = stats.total ? Math.round((stats.android / stats.total) * 100) : 0

  const cards = [
    { icon: "⬇", label: "Total Downloads", value: fmt(stats.total), color: "#FF2D55" },
    { icon: "🖥", label: "Windows Downloads", value: fmt(stats.windows), color: "#00F0FF" },
    { icon: "📱", label: "Android Downloads", value: fmt(stats.android), color: "#00F0FF" },
    { icon: "⭐", label: "GitHub Stars", value: fmt(stats.stars), color: "#FF2D55" },
  ]

  return (
    <section id="stats" className="py-24 px-4 bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[var(--font-orbitron)] text-4xl md:text-5xl font-bold text-center mb-4 text-glow-red">
          Download Stats
        </h2>
        <div className="relative h-1 w-20 mx-auto mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF2D55] to-transparent" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative bg-[#13131A] border border-[#2A2A3A] rounded-xl p-6 text-center overflow-hidden group hover:-translate-y-1 transition-transform duration-200"
              style={{ "--col": card.color }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-50" style={{ borderColor: card.color }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-50" style={{ borderColor: card.color }} />
              {/* Glow bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}18 0%, transparent 60%)` }} />
              <div className="text-2xl mb-3">{card.icon}</div>
              <p className="font-[var(--font-orbitron)] text-2xl md:text-3xl font-bold" style={{ color: card.color }}>
                {card.value}
              </p>
              <p className="text-[#8A8FA3] text-xs uppercase tracking-widest mt-2">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="relative bg-[#13131A] border border-[#2A2A3A] rounded-xl p-7 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 120%, #FF2D5510 0%, transparent 60%)" }} />
          <p className="font-[var(--font-orbitron)] text-xs text-[#8A8FA3] uppercase tracking-widest mb-5">
            Downloads by platform
          </p>
          {[
            { label: "Windows", pct: winPct, color: "#FF2D55" },
            { label: "Android", pct: andPct, color: "#00F0FF" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 mb-4">
              <span className="font-[var(--font-orbitron)] text-[11px] text-[#8A8FA3] w-16 text-right shrink-0">{row.label}</span>
              <div className="flex-1 h-2.5 bg-[#1E1E2A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${row.pct}%`, background: `linear-gradient(90deg, ${row.color}, ${row.color}99)` }}
                />
              </div>
              <span className="font-[var(--font-orbitron)] text-[11px] text-[#8A8FA3] w-10 shrink-0">{stats.total ? `${row.pct}%` : "—"}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-[#8A8FA3] mt-10 text-sm">
          Live data via{" "}
          <span className="font-[var(--font-orbitron)] text-[#00F0FF] text-xs bg-[#13131A] border border-[#2A2A3A] px-2 py-0.5 rounded">
            GitHub Releases API
          </span>{" "}
          — updated in real time.
        </p>
      </div>
    </section>
  )
}