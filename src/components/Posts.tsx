import { posts } from '../content/site.ts'
import useSectionFade from '../hooks/useSectionFade.ts'

interface Props {
  onOpen: (index: number) => void
}

// 文章列表：瀑布流布局，点击卡片以弹窗方式打开文章详情
export default function Posts({ onOpen }: Props) {
  const ref = useSectionFade<HTMLElement>()
  return (
    <section id="posts" ref={ref}>
      <div className="wrap">
        <h2 className="sec-title">文章</h2>
        <div className="sec-line"></div>
        {posts.length === 0 && <div className="empty">还没有文章。</div>}
        <div className="masonry">
          {posts.map((p, i) => (
            <article key={p.title} className="card post" onClick={() => onOpen(i)}>
              <div className={`post-cover c${i % 4}`}><span>{p.date}</span></div>
              <h3>
                {p.title}
                <span className="hint">阅读全文 →</span>
              </h3>
              <p className="intro">{p.intro}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .masonry{columns:3;column-gap:var(--gap)}
        .post{break-inside:avoid;margin-bottom:var(--gap);cursor:pointer;display:block}
        .post:hover h3{color:var(--accent)}
        .post-cover{margin:calc(var(--card-pad) * -1) calc(var(--card-pad) * -1) 14px;
          display:flex;align-items:flex-end;padding:14px 16px;font-size:12.5px;color:rgba(255,255,255,.9);
          letter-spacing:.02em;font-weight:600}
        .post-cover.c0{height:110px;background:linear-gradient(135deg,var(--accent),transparent 75%)}
        .post-cover.c1{height:150px;background:linear-gradient(135deg,var(--accent2),transparent 75%)}
        .post-cover.c2{height:80px;background:linear-gradient(135deg,var(--accent),transparent 65%)}
        .post-cover.c3{height:130px;background:linear-gradient(135deg,var(--accent2),transparent 65%)}
        .post h3{font-size:19px;font-weight:600;display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
        .post .hint{font-size:12px;color:var(--accent);margin-left:auto}
        .post .intro{color:var(--muted);font-size:14px}
        .empty{color:var(--muted);font-size:14px;padding:12px 0}
        @media(max-width:900px){.masonry{columns:2}}
        @media(max-width:560px){
          .masonry{columns:1}
          .post h3{font-size:17px}
        }
      `}</style>
    </section>
  )
}
