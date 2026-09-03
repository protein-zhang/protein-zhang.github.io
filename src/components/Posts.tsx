import { posts } from '../content/site.ts'
import useReveal from '../hooks/useReveal.ts'

interface Props {
  onOpen: (index: number) => void
}

export default function Posts({ onOpen }: Props) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="posts">
      <div className="wrap reveal" ref={ref}>
        <h2 className="sec-title">文章</h2>
        <div className="sec-line"></div>
        {posts.length === 0 && <div className="empty">还没有文章。</div>}
        {posts.map((p, i) => (
          <article key={p.title} className="card post">
            <div className="post-meta">{p.date}</div>
            <h3 onClick={() => onOpen(i)}>
              {p.title}
              <span className="hint">阅读全文 →</span>
            </h3>
            <p className="intro">{p.intro}</p>
          </article>
        ))}
      </div>
      <style>{`
        .post{display:flex;flex-direction:column;gap:8px;margin-bottom:clamp(12px,2.5vw,16px);padding:var(--card-pad)}
        .post-meta{font-size:12.5px;color:var(--muted);letter-spacing:.02em}
        .post h3{font-size:19px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .post h3:hover{color:var(--accent)}
        .post .hint{font-size:12px;color:var(--accent);margin-left:auto}
        .post .intro{color:var(--muted);font-size:14px}
        .empty{color:var(--muted);font-size:14px;padding:12px 0}
        @media(max-width:640px){ .post h3{font-size:17px} }
      `}</style>
    </section>
  )
}