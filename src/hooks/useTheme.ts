import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'dusk'

const KEY = 'dbj-theme'

function getInitialTheme(): Theme {
  try {
    if (localStorage.getItem(KEY) === 'dusk') return 'dusk'
  } catch { /* 隐私模式等场景下忽略 */ }
  return 'dark'
}

// 主题状态：写入 <html data-theme> 驱动 CSS 变量，并持久化到 localStorage
export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem(KEY, theme) } catch { /* 忽略 */ }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'dusk' : 'dark'))

  return { theme, toggle }
}
