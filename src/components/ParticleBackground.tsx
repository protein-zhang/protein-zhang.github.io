import { useEffect, useRef } from 'react'

interface Part {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

export default function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf = 0
    const parts: Part[] = []
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * 2 * Math.PI
      const r = Math.sqrt(Math.random()) * Math.min(W, H) * 0.5
      parts.push({
        x: W / 2 + Math.cos(a) * r, y: H / 2 + Math.sin(a) * r * 0.6,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4, a: Math.random() * Math.PI * 2
      })
    }
    let last = 0
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      ctx.clearRect(0, 0, W, H)
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.a += 0.004
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140,175,255,${0.25 * (0.5 + 0.5 * Math.sin(p.a))})`
        ctx.fill()
      }
      if (t - last > 80) { drawLines(); last = t }
    }
    function drawLines() {
      for (let i = 0; i < parts.length; i++)
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j]
          const dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy
          if (d < 16000) {
            ctx.strokeStyle = `rgba(150,170,230,${(1 - Math.sqrt(d) / 127) * 0.16})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return (
    <>
      <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: -2, display: 'block' }} />
      <div className="vignette" />
      <style>{`.vignette{position:fixed;inset:0;z-index:-1;pointer-events:none;
        background:radial-gradient(120% 90% at 50% 0%,rgba(122,162,255,.08),transparent 60%),
                   radial-gradient(120% 90% at 50% 100%,rgba(168,230,207,.06),transparent 60%);}`}</style>
    </>
  )
}