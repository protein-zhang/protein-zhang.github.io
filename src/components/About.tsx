import { profile } from '../content/site.ts'
import useSectionFade from '../hooks/useSectionFade.ts'

export default function About() {
  const ref = useSectionFade<HTMLElement>()
  return (
    <section id="about" ref={ref}>
      <div className="wrap">
        <h2 className="sec-title">关于我</h2>
        <div className="sec-line"></div>
        <div className="about-grid">
          <div className="avatar"><span>{profile.handle}</span></div>
          <div>
            {profile.bio.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
            <div className="skills">
              {profile.skills.map(s => <span className="skill" key={s}>{s}</span>)}
            </div>
            <div className="info-line">{profile.meta}</div>
          </div>
        </div>
      </div>
      <style>{`
        .about-grid{display:grid;grid-template-columns:260px 1fr;gap:clamp(18px,3.5vw,28px);align-items:start}
        .avatar{aspect-ratio:1;border-radius:24px;background:linear-gradient(135deg,var(--avatar-a),var(--avatar-b));
          border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:clamp(48px,12vw,84px);font-weight:700;overflow:hidden}
        .avatar span{background:linear-gradient(120deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
        .about p{color:var(--muted);margin-bottom:12px}
        .about a{color:var(--accent);text-decoration:none;transition:.2s}
        .about a:hover{text-decoration:underline}
        .skills{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
        .skill{font-size:12.5px;padding:5px 12px;border-radius:8px;background:var(--skill-bg);border:1px solid var(--skill-border);color:var(--skill-text)}
        .info-line{font-size:13.5px;color:var(--muted);margin-top:14px;border-top:1px dashed var(--border);padding-top:14px}
        /* 移动端单列：必须与 .about-grid 同源声明，否则会被上面两列规则覆盖 */
        @media(max-width:680px){
          .about-grid{grid-template-columns:1fr}
          .avatar{width:112px}
        }
      `}</style>
    </section>
  )
}