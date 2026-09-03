import { useEffect, useState } from 'react'
import { typePhrases, profile } from '../content/site.ts'

function useTypewriter(phrases: string[], { typing = 72, deleting = 42, hold = 1500 } = {}) {
  const [text, setText] = useState('')
  useEffect(() => {
    let pi = 0, ci = 0, isDeleting = false, timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const cur = phrases[pi]
      ci = isDeleting ? ci - 1 : ci + 1
      setText(cur.slice(0, ci))
      let delay: number
      if (!isDeleting && ci === cur.length) { delay = hold; isDeleting = true }
      else if (isDeleting && ci === 0) { isDeleting = false; pi = (pi + 1) % phrases.length; delay = 400 }
      else delay = isDeleting ? deleting : typing
      timer = setTimeout(tick, delay)
    }
    tick()
    return () => clearTimeout(timer)
  }, [phrases, typing, deleting, hold])
  return text
}

export default function Hero() {
  const text = useTypewriter(typePhrases)
  return (
    <header className="hero">
      <div className="wrap">
        <div className="chip"><span className="dot" />Hi，我是 · Hello, I&apos;m</div>
        <h1>{profile.name}<span className="accent"> / {profile.handle}</span></h1>
        <p className="sub"><span>{text}</span><span className="cursor" /></p>
        <div className="role-tags">
          {profile.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        <div className="cta">
          <a className="btn primary" href="#posts">阅读文章</a>
          <a className="btn" href="#about">关于我</a>
          <a className="btn" href="#contact">联系</a>
        </div>
      </div>
      <style>{`
        header.hero{min-height:88vh;display:flex;flex-direction:column;justify-content:center;padding-top:40px}
        .chip{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;
          border:1px solid var(--border);background:var(--surface);color:var(--muted);font-size:13.5px;width:fit-content;backdrop-filter:blur(8px)}
        .chip .dot{width:8px;height:8px;border-radius:50%;background:var(--accent2);animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        h1{font-size:clamp(44px,8vw,78px);font-weight:700;letter-spacing:-.02em;margin:26px 0 6px;line-height:1.05}
        h1 .accent{background:linear-gradient(120deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
        .sub{font-size:clamp(17px,2.4vw,21px);color:var(--muted);min-height:1.6em;font-weight:400}
        .cursor{display:inline-block;width:2px;background:var(--accent);animation:blink .9s steps(1) infinite;margin-left:2px}
        @keyframes blink{50%{opacity:0}}
        .role-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:clamp(22px,4vw,34px)}
        .tag{padding:8px 15px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:13.5px;color:var(--muted);backdrop-filter:blur(8px)}
        .cta{display:flex;gap:14px;margin-top:clamp(24px,4.5vw,38px);flex-wrap:wrap}
        .btn{padding:12px 22px;border-radius:14px;border:1px solid var(--border);background:var(--surface);color:var(--text);text-decoration:none;font-size:14.5px;transition:.25s;backdrop-filter:blur(8px)}
        .btn:hover{border-color:var(--accent);transform:translateY(-2px)}
        .btn.primary{background:linear-gradient(120deg,var(--accent),var(--accent2));color:#0d0f14;font-weight:600;border:none}
        .btn.primary:hover{filter:brightness(1.07)}
        @media(max-width:640px){
          header.hero{min-height:82vh;padding-top:20px}
          .chip{font-size:12.5px;padding:6px 13px}
          .tag{font-size:12.5px;padding:7px 13px}
          .cta{gap:12px}
          .btn{flex:1 1 130px;justify-content:center;text-align:center}
        }
      `}</style>
    </header>
  )
}