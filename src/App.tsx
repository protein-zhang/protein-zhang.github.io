import ParticleBackground from './components/ParticleBackground.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Posts from './components/Posts.tsx'
import PostDetail from './components/PostDetail.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import useHashRoute from './hooks/useHashRoute.ts'
import { posts } from './content/site.ts'

export default function App() {
  const { route, navigate } = useHashRoute()
  const current =
    route.name === 'post' && route.index !== null ? posts[route.index] : undefined

  return (
    <>
      <ParticleBackground />
      <Hero />
      <About />
      {current && route.index !== null ? (
        <PostDetail
          post={current}
          index={route.index}
          onBack={() => navigate({ name: 'home', index: null })}
        />
      ) : (
        <Posts onOpen={(i) => navigate({ name: 'post', index: i })} />
      )}
      <Contact />
      <Footer />
    </>
  )
}