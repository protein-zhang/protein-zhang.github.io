export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <small>© <span>{new Date().getFullYear()}</span> 蛋白酱 DBJ · Vite + React · 零服务器部署 · 开源精神</small>
      </div>
      <style>{`
        footer{padding:40px 0 60px;border-top:1px solid var(--border);margin-top:20px}
        footer small{color:var(--muted);font-size:12.5px}
      `}</style>
    </footer>
  )
}