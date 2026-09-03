import ParticleBackground from './components/ParticleBackground.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Posts from './components/Posts.tsx'
import PostDetail from './components/PostDetail.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import useHashRoute from './hooks/useHashRoute.ts'
import useTheme from './hooks/useTheme.ts'
import { posts } from './content/site.ts'

export default function App() {
  const { route, navigate } = useHashRoute()
  const { theme, toggle } = useTheme()
  const current =
    route.name === 'post' && route.index !== null ? posts[route.index] : undefined

  return (
    <>
      <ParticleBackground theme={theme} />
      <ThemeToggle theme={theme} onToggle={toggle} />
      <Hero />
      <About />
      <Posts onOpen={(i) => navigate({ name: 'post', index: i })} />
      <Contact />
      <Footer />
      {current && route.index !== null ? (
        <PostDetail
          post={current}
          index={route.index}
          onClose={() => navigate({ name: 'home', index: null })}
        />
      ) : null}
    </>
  )
}
