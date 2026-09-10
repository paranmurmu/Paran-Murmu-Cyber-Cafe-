import { useEffect, useState } from 'react'
import './App.css'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Services', '#services'],
  ['Work', '#work'],
  ['Gallery', '#gallery'],
]

const services = [
  ['01', 'Acting & Performance', 'Character-driven storytelling for film, stage, and digital formats.'],
  ['02', 'Digital Marketing', 'Strategy, content, and campaigns that turn attention into momentum.'],
  ['03', 'Music & Sound', 'An independent musical practice shaped by feeling, rhythm, and culture.'],
  ['04', 'Brand Partnerships', 'Thoughtful collaborations for brands with something real to say.'],
  ['05', 'YouTube & Media', 'Building communities through consistent, human-first digital stories.'],
  ['06', 'Entrepreneurship', 'Ideas made tangible through curiosity, discipline, and action.'],
]

const projects = [
  { number: '01 / FILM', title: 'On Screen', text: 'A growing filmography built around honest performances and memorable characters.', image: '/paran-portrait.png' },
  { number: '02 / DIGITAL', title: 'The Creator Studio', text: 'A creative practice at the intersection of personal brand, culture, and digital impact.', image: '/paran-portrait.png' },
]

const socials = [
  ['Instagram', 'instagram.com/paran.murmu1', 'https://www.instagram.com/paran.murmu1'],
  ['LinkedIn', 'linkedin.com/in/paran-murmu', 'https://www.linkedin.com/in/paran-murmu-5b2497194'],
  ['IMDb', 'imdb.com/name/nm13899871', 'https://www.imdb.com/name/nm13899871/'],
  ['YouTube', 'Independent channel', '#contact'],
]

function App() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 700)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div className="site-shell">
      <div className={`loader ${loaded ? 'is-hidden' : ''}`} aria-hidden={loaded}>
        <div className="loader-inner"><strong>PARAN<br />MURMU</strong><span /></div>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className="nav wrap">
        <a href="#top" className="brand">PARAN MURMU</a>
        <nav aria-label="Main navigation"><ul>{links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></nav>
        <a className="outline-button" href="#contact">Let&apos;s talk ↗</a>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-orb" />
          <div className="hero-title" aria-label="Paran Murmu"><span>PARAN</span><span>MURMU</span></div>
          <div className="hero-copy reveal"><p className="eyebrow">Independent creator · West Bengal, India</p><h1>Actor. Artist.<br />Entrepreneur.</h1><p>Indian creative professional building a personal brand across acting, music, digital marketing, entrepreneurship, YouTube, and social media.</p><a className="solid-button" href="#about">Explore profile ↗</a></div>
          <div className="hero-links reveal"><a href="https://www.linkedin.com/in/paran-murmu-5b2497194" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.imdb.com/name/nm13899871/" target="_blank" rel="noreferrer">IMDb</a><a href="https://www.instagram.com/paran.murmu1" target="_blank" rel="noreferrer">Instagram</a></div>
        </section>

        <section className="stats"><div><strong>01</strong><span>Personal brand</span></div><div><strong>06+</strong><span>Creative roles</span></div><div><strong>03</strong><span>Film credits listed</span></div><div><strong>24/7</strong><span>Digital mindset</span></div></section>

        <section className="manifesto section wrap"><h2>I don&apos;t just build a profile.<br />I build a <em>personal brand</em>.<br />Where creativity meets<br />digital <em>impact</em>.</h2></section>

        <section className="about section" id="about"><div className="about-image"><img src="/paran-portrait.png" alt="Portrait of Paran Murmu" /></div><div className="about-copy"><p className="eyebrow">The person behind the work</p><h2>Built from<br /><span>many worlds.</span></h2><p>Paran Murmu is an Indian actor, artist, entrepreneur, digital marketer, musical artist, YouTuber, and social media influencer.</p><p>His work is guided by a simple belief: the most powerful personal brands are built with substance, not noise.</p><div className="facts"><div><span>Based in</span><b>West Bengal, India</b></div><div><span>Focus</span><b>Storytelling + impact</b></div><div><span>Availability</span><b>Selected collaborations</b></div></div></div></section>

        <section className="services section wrap" id="services"><p className="eyebrow">What I do</p><h2>Multiple<br />disciplines.</h2><div className="service-grid">{services.map(([num, title, copy]) => <article key={num}><span className="service-num">{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="work section" id="work"><div className="wrap"><p className="eyebrow">Selected work</p><h2>Make it<br />meaningful.</h2>{projects.map((project) => <article className="project" key={project.number}><img src={project.image} alt="Cinematic portrait from Paran Murmu's creative portfolio" /><div><p className="eyebrow">{project.number}</p><h3>{project.title}</h3><p>{project.text}</p><a className="text-link" href="#contact">Discover more ↗</a></div></article>)}</div></section>

        <section className="gallery section wrap" id="gallery"><p className="eyebrow">The gallery</p><h2>Frames of<br />the journey.</h2><div className="gallery-grid"><img src="/paran-portrait.png" alt="Paran Murmu portrait" /><div className="gallery-card"><span>01</span><strong>Presence<br />over polish.</strong></div><div className="gallery-card red"><span>02</span><strong>Stories<br />with soul.</strong></div></div></section>

        <section className="skills section" id="skills"><div className="wrap"><p className="eyebrow">The toolkit</p><h2>Skills with<br />range.</h2><div className="skill-list">{['Acting & character work', 'Content strategy', 'Social media direction', 'Music & performance', 'Brand storytelling'].map((skill, i) => <div className="skill-row" key={skill}><span>0{i + 1}</span><h3>{skill}</h3><p>Curiosity, communication, and a commitment to making the work matter.</p></div>)}</div></div></section>

        <section className="journey section wrap" id="education"><p className="eyebrow">The journey</p><h2>Still<br />becoming.</h2><div className="timeline"><article><span>Now</span><h3>Independent creator</h3><p>Growing a multidisciplinary practice across film, music, digital, and entrepreneurship.</p></article><article><span>In motion</span><h3>Building a personal brand</h3><p>Connecting creative work with audiences and opportunities that create lasting impact.</p></article><article><span>Always</span><h3>Learning in public</h3><p>Every project is another chance to experiment, collaborate, and tell a better story.</p></article></div></section>

        <section className="connect section" id="contact"><div className="wrap"><p className="eyebrow">Let&apos;s connect</p><h2>Have a story<br />to tell?</h2><div className="connect-grid">{socials.map(([name, detail, href]) => <a key={name} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><small>{name}</small><b>{name} ↗</b><span>{detail}</span></a>)}</div><p className="contact-meta">For collaborations, creative work, and conversations about making something meaningful.<br /><a href="mailto:hello@paranmurmu.com">hello@paranmurmu.com</a></p></div></section>
      </main>
      <footer><span>© 2026 Paran Murmu</span><span>Made with intention · India</span></footer>
    </div>
  )
}

export default App
