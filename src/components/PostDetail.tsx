import { useEffect } from 'react'
import type { Post } from '../content/site.ts'

interface Props {
  post: Post
  index: number
  onBack: () => void
}

// 文章详情：镶嵌在整体网页中的独立视图，带返回按钮，通过 hash 路由直达
export default function PostDetail({ post, index, onBack }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])

  return (
    <section id="post-detail">
      <div className="wrap">
        <div className="card post-detail-card">
          <button className="back-btn" onClick={onBack}>← 返回文章列表</button>
          <div className="post-meta">{post.date} · 第 {index + 1} 篇</div>
          <h2 className="detail-title">{post.title}</h2>
          <p className="intro">{post.intro}</p>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
          <button className="back-btn bottom" onClick={onBack}>← 返回文章列表</button>
        </div>
      </div>
      <style>{`
        #post-detail{padding:8px 0 20px}
        .post-detail-card{display:flex;flex-direction:column;gap:clamp(12px,2.5vw,16px);padding:clamp(18px,4vw,30px);margin-bottom:16px}
        .back-btn{align-self:flex-start;cursor:pointer;background:none;border:1px solid var(--border);
          color:var(--muted);font-size:13.5px;padding:8px 16px;border-radius:10px;transition:.2s;font-family:inherit}
        .back-btn:hover{border-color:var(--accent);color:var(--text);transform:translateY(-1px)}
        .back-btn.bottom{margin-top:8px}
        .detail-title{font-size:clamp(22px,3.4vw,30px);font-weight:700;line-height:1.3}
        .post-detail-card .intro{color:var(--muted);font-size:14.5px}
        .post-detail-card .post-body{display:block;color:var(--text);font-size:15px;line-height:1.9;
          border-top:1px dashed var(--border);padding-top:18px}
        .post-detail-card .post-body p{margin-bottom:14px}
        @media(max-width:640px){
          .post-detail-card .post-body{font-size:15.5px;line-height:1.85}
          .back-btn{padding:10px 18px;font-size:14px}
        }
      `}</style>
    </section>
  )
}