import { useEffect, useRef } from 'react'
import type { Post } from '../content/site.ts'

interface Props {
  post: Post
  index: number
  onClose: () => void
}

// 文章详情：以弹窗形式浮于当前页面之上，不改变页面滚动位置，保留 hash 路由可分享直达
export default function PostDetail({ post, index, onClose }: Props) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current() }
    window.addEventListener('keydown', onKey)
    if (panelRef.current) panelRef.current.scrollTop = 0
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [index])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" ref={panelRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="关闭">×</button>
        <button className="back-btn" onClick={onClose}>← 返回文章列表</button>
        <div className="post-meta">{post.date} · 第 {index + 1} 篇</div>
        <h2 className="detail-title">{post.title}</h2>
        <p className="intro">{post.intro}</p>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
        <button className="back-btn bottom" onClick={onClose}>← 返回文章列表</button>
      </div>
      <style>{`
        .modal-overlay{position:fixed;inset:0;z-index:50;background:rgba(8,9,12,.6);backdrop-filter:blur(8px);
          display:flex;align-items:flex-start;justify-content:center;padding:clamp(16px,5vh,48px) 16px;
          overflow-y:auto;animation:fadeIn .25s ease}
        .modal-panel{width:min(780px,100%);max-height:92vh;overflow-y:auto;background:var(--surface-solid);
          border:1px solid var(--border);border-radius:var(--radius);padding:clamp(20px,4vw,34px);
          box-shadow:var(--shadow);position:relative;animation:popIn .3s cubic-bezier(.2,.8,.2,1)}
        .modal-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;border:1px solid var(--border);
          background:var(--surface);color:var(--muted);font-size:20px;line-height:1;cursor:pointer;transition:.2s;font-family:inherit}
        .modal-close:hover{border-color:var(--accent);color:var(--text);transform:rotate(90deg)}
        .back-btn{display:inline-flex;align-items:center;gap:6px;cursor:pointer;background:none;border:1px solid var(--border);
          color:var(--muted);font-size:13.5px;padding:8px 16px;border-radius:10px;transition:.2s;font-family:inherit;margin-bottom:14px}
        .back-btn:hover{border-color:var(--accent);color:var(--text);transform:translateY(-1px)}
        .back-btn.bottom{margin:18px 0 0}
        .post-meta{font-size:12.5px;color:var(--muted);letter-spacing:.02em;margin-bottom:10px}
        .detail-title{font-size:clamp(22px,3.4vw,30px);font-weight:700;line-height:1.3;margin-bottom:10px;padding-right:36px}
        .modal-panel .intro{color:var(--muted);font-size:14.5px;margin-bottom:16px}
        .modal-panel .post-body{display:block;color:var(--text);font-size:15px;line-height:1.9;border-top:1px dashed var(--border);padding-top:18px}
        .modal-panel .post-body p{margin-bottom:14px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:none}}
        @media(max-width:640px){
          .modal-overlay{padding:0;align-items:stretch}
          .modal-panel{width:100%;max-height:100vh;border-radius:0;border:none}
          .modal-panel .post-body{font-size:15.5px;line-height:1.85}
          .back-btn{padding:10px 18px;font-size:14px}
        }
      `}</style>
    </div>
  )
}
