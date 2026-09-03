import { profile } from '../content/site.js'
import useReveal from '../hooks/useReveal.js'

export default function About() {
  const ref = useReveal()
  return (
    <section id="about">
      <div className="wrap reveal" ref={ref}>
        <h2 className="sec-title">关于我</h2>
        <div className="sec-line"></div>
        <div className="about-grid">
          <div className="avatar"><span>{profile.handle}</span></div>
          <div>
            {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
            <div className="skills">
              {profile.skills.map(s => <span className="skill" key={s}>{s}</span>)}
            </div>
            <div className="info-line">{profile.meta}</div>
          </div>
        </div>
      </div>
      <style>{`
        .about-grid{display:grid;grid-template-columns:260px 1fr;gap:28px;align-items:start}
        .avatar{aspect-ratio:1;border-radius:24px;background:linear-gradient(135deg,#1c2230,#0d0f14);
          border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:84px;font-weight:700;overflow:hidden}
        .avatar span{background:linear-gradient(120deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
        .about p{color:var(--muted);margin-bottom:12px}
        .skills{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
        .skill{font-size:12.5px;padding:5px 12px;border-radius:8px;background:rgba(122,162,255,.12);border:1px solid rgba(122,162,255,.25);color:#bcd0ff}
        .info-line{font-size:13.5px;color:var(--muted);margin-top:14px;border-top:1px dashed var(--border);padding-top:14px}
      `}</style>
    </section>
  )
}