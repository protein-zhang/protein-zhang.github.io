import useSectionFade from '../hooks/useSectionFade.ts'

interface ContactItem {
  label: string
  value: string
  href?: string
}

const contacts: ContactItem[] = [
  { label: '微信', value: 'z1099281623' },
  { label: 'QQ', value: '1099281623' },
  { label: '邮箱', value: '1099281623@qq.com', href: 'mailto:1099281623@qq.com' },
  { label: 'GitHub', value: 'github.com/protein-zhang', href: 'https://github.com/protein-zhang' }
]

export default function Contact() {
  const ref = useSectionFade<HTMLElement>()
  return (
    <section id="contact" ref={ref}>
      <div className="wrap">
        <h2 className="sec-title">联系</h2>
        <div className="sec-line"></div>
        <div className="card contact-card">
          <p className="c-tip">欢迎通过以下方式找到我</p>
          <div className="c-grid">
            {contacts.map((c) => (
              <div className="c-item" key={c.label}>
                <span className="c-label">{c.label}</span>
                {c.href ? (
                  <a className="c-value" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{c.value}</a>
                ) : (
                  <span className="c-value">{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .contact-card{text-align:left;padding:clamp(20px,4vw,30px) clamp(18px,4vw,34px)}
        .c-tip{color:var(--muted);margin-bottom:clamp(14px,2.5vw,18px);font-size:14px}
        .c-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,2vw,14px)}
        .c-item{display:flex;align-items:center;gap:12px;padding:clamp(10px,2vw,12px) 16px;border-radius:12px;
          background:var(--surface);border:1px solid var(--border)}
        .c-label{flex-shrink:0;font-size:13px;color:var(--muted);width:44px}
        .c-value{font-size:14.5px;color:var(--text);word-break:break-all}
        a.c-value{text-decoration:none;transition:.2s}
        a.c-value:hover{color:var(--accent)}
        @media(max-width:640px){.c-grid{grid-template-columns:1fr}}
      `}</style>
    </section>
  )
}