import { useState } from 'react'
import { posts } from '../content/site.js'
import useReveal from '../hooks/useReveal.js'

export default function Posts() {
  const ref = useReveal()
  const [open, setOpen] = useState(null)
  return (
    <section id="posts">
      <div className="wrap reveal" ref={ref}>
        <h2 className="sec-title">文章</h2>
        <div className="sec-line"></div>
        {posts.length === 0 && <div className="empty">还没有文章。</div>}
        {posts.map((p, i) => (
          <article key={p.title} className={`card post${open === i ? ' open' : ''}`}>
            <div className="post-meta">{p.date}</div>
            <h3 onClick={() => setOpen(open === i ? null : i)}>
              {p.title}
              {p.body && <span className="hint">展开 ▾</span>}
            </h3>
            <p className="intro">{p.intro}</p>
            {p.body && <div className="post-body" dangerouslySetInnerHTML={{ __html: p.body }} />}
          </article>
        ))}
      </div>
      <style>{`
        .post{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;padding:22px 24px}
        .post-meta{font-size:12.5px;color:var(--muted);letter-spacing:.02em}
        .post h3{font-size:19px;font-weight:600;cursor:pointer}
        .post h3:hover{color:var(--accent)}
        .post .hint{font-size:12px;color:var(--accent);margin-left:6px}
        .post .intro{color:var(--muted);font-size:14px}
        .post .post-body{display:none;color:var(--text);font-size:14.5px;margin-top:6px;padding-top:12px;border-top:1px dashed var(--border)}
        .post.open .post-body{display:block}
        .empty{color:var(--muted);font-size:14px;padding:12px 0}
      `}</style>
    </section>
  )
}