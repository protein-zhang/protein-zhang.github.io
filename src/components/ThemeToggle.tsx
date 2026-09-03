import type { Theme } from '../hooks/useTheme.ts'

interface Props {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <>
      <button className="theme-toggle" onClick={onToggle} aria-label="切换配色风格" title="切换配色风格">
        <span className={`tt-orb ${theme}`} />
      </button>
      <style>{`
        .theme-toggle{position:fixed;top:16px;right:16px;z-index:60;width:42px;height:42px;border-radius:50%;
          border:1px solid var(--border);background:var(--surface);backdrop-filter:blur(10px);cursor:pointer;
          display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);
          transition:transform .25s,border-color .25s,background .3s}
        .theme-toggle:hover{transform:scale(1.08);border-color:var(--accent)}
        .tt-orb{width:20px;height:20px;border-radius:50%;transition:background .35s}
        .tt-orb.dark{background:conic-gradient(from 210deg,#0d0f14 0 55%,#7aa2ff 55% 100%)}
        .tt-orb.dusk{background:conic-gradient(from 210deg,#2a1f2e 0 55%,#f0a35e 55% 100%)}
        @media(max-width:480px){.theme-toggle{top:12px;right:12px;width:38px;height:38px}}
      `}</style>
    </>
  )
}
