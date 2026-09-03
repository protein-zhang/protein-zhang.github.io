import { useEffect, useState } from 'react'

export interface Route {
  name: 'home' | 'post'
  index: number | null
}

// 解析 location.hash：支持 #/post/<index> 直达详情，#/ 或空为首页
function parseHash(): Route {
  const m = /^#\/post\/(\d+)$/.exec(location.hash)
  if (m) return { name: 'post', index: Number(m[1]) }
  return { name: 'home', index: null }
}

// 极简 hash 路由：GitHub Pages 纯静态托管不支持 history 路由刷新，
// hash 路由无需服务端配合，刷新/分享/前进后退都可用
export default function useHashRoute() {
  const [route, setRoute] = useState<Route>(parseHash)

  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (r: Route) => {
    location.hash = r.name === 'post' && r.index !== null ? `#/post/${r.index}` : '#/'
  }

  return { route, navigate }
}