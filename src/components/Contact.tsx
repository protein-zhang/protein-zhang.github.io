import useReveal from '../hooks/useReveal.ts'

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="contact">
      <div className="wrap reveal" ref={ref}>
        <h2 className="sec-title">联系</h2>
        <div className="sec-line"></div>
        <div className="card contact-card">
          <p className="c-tip">邮箱 · 微信 · 即刻 · B站</p>
          <div className="c-links">
            <a href="#">Email</a><a href="#">GitHub</a><a href="#">RSS</a>
          </div>
          <p className="c-note">（替换成你的真实联系方式）</p>
        </div>
      </div>
      <style>{`
        .contact-card{text-align:center;padding:36px}
        .c-tip{color:var(--muted);margin-bottom:6px}
        .c-links{display:flex;justify-content:center;gap:18px;margin:0}
        .c-links a{color:var(--muted);text-decoration:none;font-size:14px;transition:.2s}
        .c-links a:hover{color:var(--accent)}
        .c-note{color:var(--muted);font-size:13px;margin-top:14px}
      `}</style>
    </section>
  )
}