import { useEffect, useRef, type RefObject } from 'react'

// 滚动驱动的区块渐入渐出：进入视口从下方渐显，向上滑出顶部时原地渐淡，被下方区域覆盖（无位移动画）
export default function useSectionFade<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const fade = Math.min(vh * 0.45, 360)
      // 顶部渐隐：区块顶缘越过视口顶部后开始变淡
      const topFade = Math.min(1, Math.max(0, 1 + rect.top / fade))
      // 底部渐显：区块从视口底部进入时逐渐显现
      const bottomFade = Math.min(1, Math.max(0, (vh - rect.top) / fade))
      const opacity = Math.max(0, Math.min(topFade, bottomFade))
      el.style.opacity = opacity.toFixed(3)
      el.style.transform = 'none'
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return ref
}
