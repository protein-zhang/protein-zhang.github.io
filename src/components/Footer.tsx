export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <small>© <span>{new Date().getFullYear()}</span> 蛋白酱 DBJ · Vite + React + TS · 零服务器部署 · 开源精神</small>
      </div>
      <style>{`
        footer{padding:clamp(28px,5vw,40px) 0 clamp(36px,7vw,60px);border-top:1px solid var(--border);margin-top:20px}
        footer small{color:var(--muted);font-size:12.5px}
        @media(max-width:640px){footer small{font-size:11.5px}}
      `}</style>
    </footer>
  )
}