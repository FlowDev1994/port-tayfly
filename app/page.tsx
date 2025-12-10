"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import GalaxyCanvas from "@/components/galaxy-canvas"
import MouseSpotlight from "@/components/mouse-spotlight"
import ContactModal from "@/components/contact-modal"
import PaperPlaneIcon from "@/components/paper-plane-icon"

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection("home")
      } else if (scrollPosition < windowHeight * 1.5) {
        setActiveSection("about")
      } else if (scrollPosition < windowHeight * 2.5) {
        setActiveSection("projects")
      } else {
        setActiveSection("services")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  const handleProjectHover = (projectType: string | null) => {
    setActiveProject(projectType)
  }

  const handleContactClick = () => {
    setIsContactModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MouseSpotlight />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <nav className="fixed top-0 left-0 w-full bg-black/50 z-50 backdrop-blur-sm shadow-md">
        <div className="flex justify-between items-center p-4 md:p-5">
          <div className="flex items-center">
            <PaperPlaneIcon width={32} height={32} className="md:w-10 md:h-10 text-white" />
          </div>

          <div className="hidden md:flex gap-6 lg:gap-10">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("home")
              }}
              className={`px-4 lg:px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm lg:text-base ${
                activeSection === "home" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
              }`}
            >
              Início
            </Link>
            <Link
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("about")
              }}
              className={`px-4 lg:px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm lg:text-base ${
                activeSection === "about" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
              }`}
            >
              Sobre Mim
            </Link>
            <Link
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("projects")
              }}
              className={`px-4 lg:px-5 py-2 rounded-lg transition-all uppercase tracking-wider text-sm lg:text-base ${
                activeSection === "projects" ? "bg-white/10 transform -translate-y-0.5" : "hover:bg-white/5"
              }`}
            >
              Projetos
            </Link>
            <button
              onClick={handleContactClick}
              className="px-4 lg:px-5 py-2 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm lg:text-base bg-white text-black hover:bg-gray-200 hover:transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
            >
              Contato
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white focus:outline-none"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("home")
                }}
                className={`px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-sm ${
                  activeSection === "home" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                Início
              </Link>
              <Link
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
                className={`px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-sm ${
                  activeSection === "about" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                Sobre Mim
              </Link>
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("projects")
                }}
                className={`px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-sm ${
                  activeSection === "projects" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                Projetos
              </Link>
              <button
                onClick={handleContactClick}
                className="px-4 py-3 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm bg-white text-black hover:bg-gray-200 text-left"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative h-screen flex items-center justify-center px-4">
        <GalaxyCanvas id="homeCanvas" withConstellations={true} />
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="mb-6 animate-pulse" style={{ animationDuration: "3s" }}>
            <PaperPlaneIcon
              width={80}
              height={80}
              className="sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-white"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium font-poppins animate-title px-4">
            Tayara Romero
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 font-light font-poppins mt-2 px-4">
            {"{TayFly}"}
          </p>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-8 h-8 md:w-10 md:h-10 border-r-2 border-b-2 border-white rotate-45 animate-bounce opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Rolar para baixo"
        />
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 py-20"
      >
        <GalaxyCanvas id="aboutCanvas" withConstellations={true} />
        <div className="relative z-10 max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-white font-poppins animate-title text-center">
            Sobre Mim
          </h2>

          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-full blur-2xl"></div>
              <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/30 shadow-glow">
                <Image
                  src="/images/tayara-photo.jpeg"
                  alt="Tayara Zampim Romero - Tayfly"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="w-full space-y-4 md:space-y-6">
              <div className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-glow hover:border-white/30 transition-all duration-300">
                <div className="space-y-4 text-gray-100 font-open-sans text-base sm:text-lg leading-relaxed">
                  <p>
                    Meu nome é <span className="text-white font-semibold">Tayara Zampim Romero</span>, mas no mundo da
                    tecnologia sou conhecida como <span className="text-white font-semibold">Tayfly</span> — um apelido
                    que carrego com orgulho, lembrando minha primeira formação em{" "}
                    <span className="text-white font-semibold">Aviação Civil</span>. Embora não tenha seguido carreira
                    nos ares, essa fase despertou em mim o gosto por desafios, precisão e trabalho em equipe — valores
                    que encontrei novamente na programação.
                  </p>
                  <p>
                    Sou formada em <span className="text-white font-semibold">Recursos Humanos</span> pela Faculdade
                    Claretiano, e essa base me trouxe empatia, organização e uma comunicação clara — habilidades que
                    aplico todos os dias como desenvolvedora{" "}
                    <span className="text-white font-semibold">Fullstack JavaScript</span>.
                  </p>
                  <p>
                    Tenho conhecimento nas tecnologias do ecossistema JavaScript, como{" "}
                    <span className="text-white font-semibold">HTML, CSS, JavaScript, TypeScript, React e Node.js</span>
                    , além de ter conhecimentos em <span className="text-white font-semibold">Python e Java</span>.
                    Tenho experiência com projetos reais, criados para clientes e empresas, sempre buscando unir
                    performance e experiência do usuário.
                  </p>
                  <p>
                    Entre 2013 e 2022, trabalhei na <span className="text-white font-semibold">Ouro Verdde</span> como
                    Auxiliar de Escritório, onde desenvolvi disciplina e atenção aos detalhes.
                  </p>
                  <p>
                    De 2022 a 2025, atuei como <span className="text-white font-semibold">Gerente de Projetos</span> na{" "}
                    <span className="text-white font-semibold">Onebitcode</span>, uma escola de programação que me
                    aproximou definitivamente da área tech — liderando pessoas, coordenando entregas e aprendendo
                    diariamente com o universo do código.
                  </p>
                  <p>
                    Hoje, sou <span className="text-white font-semibold">desenvolvedora Fullstack Júnior</span>,
                    criadora de uma empresa de marketing digital e apaixonada por unir tecnologia e criatividade para
                    gerar impacto real.
                  </p>
                  <p className="text-white font-semibold italic">
                    Meu objetivo é crescer profissionalmente em ambientes que valorizem a inovação, o aprendizado
                    contínuo e a colaboração.
                  </p>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-glow hover:border-white/30 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white font-poppins">Habilidades Técnicas</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Node.js",
                    "Python",
                    "Java",
                    "Git",
                    "Marketing Digital",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white font-open-sans hover:bg-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative min-h-screen py-16 md:py-20">
        <GalaxyCanvas id="projectsCanvas" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-white font-poppins animate-title text-center">
            Projetos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <ProjectCard
              title="HubNeoSoma"
              description="Minha empresa de marketing digital e tecnologia. Transformamos negócios através de estratégias humanizadas, automação inteligente e branding consciente."
              imagePath="/images/hubneosoma.jpeg"
              imageAlt="Website HubNeoSoma"
              websiteUrl="https://www.hubneosoma.com.br"
            />
            <ProjectCard
              title="Cristiane Melo"
              description="Psicoterapia e acolhimento emocional para mulheres. Se você se sente perdida, desconectada ou presa em ciclos emocionais dolorosos, aqui você encontra apoio para se reencontrar, curar feridas e reconstruir sua essência."
              imagePath="/images/crismelo.png"
              imageAlt="Website Cristiane Melo"
              websiteUrl="https://www.cristianemelo.com.br"
            />
            <ProjectCard
              title="J'adore Cosméticos"
              description="E-commerce completo para loja de cosméticos com mais de 5.000 produtos. Sistema de catálogo, carrinho de compras e integração com meios de pagamento."
              imagePath="/images/jadore.jpeg"
              imageAlt="Website J'adore Cosméticos"
              websiteUrl="https://www.jadorecosmeticos.com.br"
            />
            <ProjectCard
              title="Focus Tools"
              description="Website institucional para empresa de ferramentas industriais. Catálogo de produtos, sistema de orçamentos e área administrativa."
              imagePath="/images/focustools.jpeg"
              imageAlt="Website Focus Tools"
              websiteUrl="https://www.focustools.com.br"
            />
          </div>

          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-white font-poppins animate-title text-center">
              Conecte-se Comigo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <SocialCard
                title="GitHub"
                description="Confira meus repositórios e projetos open source. Acompanhe meu desenvolvimento e contribuições para a comunidade."
                icon="github"
                url="https://github.com/FlowDev1994"
              />
              <SocialCard
                title="LinkedIn"
                description="Conecte-se comigo profissionalmente. Veja minha trajetória, experiências e conquistas na área de tecnologia."
                icon="linkedin"
                url="https://www.linkedin.com/in/tayara-romero/"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-black/80 py-6 md:py-8 px-4 text-center">
        <div className="container mx-auto flex flex-col items-center">
          <PaperPlaneIcon width={40} height={40} className="md:w-12 md:h-12 mb-4 text-white" />
          <p className="text-white/70 text-xs sm:text-sm px-4">
            © {new Date().getFullYear()} Tayara Romero {"{TayFly}"}. Todos os direitos reservados.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-white/70 text-xs sm:text-sm">
            <a href="mailto:tzampim@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all">tzampim@gmail.com</span>
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://wa.me/5519996107311"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              (19) 99610-7311
            </a>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
            <a
              href="https://github.com/FlowDev1994"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tayara-romero/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  imagePath: string
  imageAlt: string
  websiteUrl: string
}

function ProjectCard({ title, description, imagePath, imageAlt, websiteUrl }: ProjectCardProps) {
  return (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-black/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow"
    >
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <Image
          src={imagePath || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 md:mb-3 text-white font-poppins group-hover:text-gray-100 transition-colors">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 font-open-sans leading-relaxed mb-3 md:mb-4">{description}</p>
        <div className="inline-flex items-center text-sm sm:text-base text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
          Visitar Site →
        </div>
      </div>
    </a>
  )
}

interface SocialCardProps {
  title: string
  description: string
  icon: "github" | "linkedin"
  url: string
}

function SocialCard({ title, description, icon, url }: SocialCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-black/50 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow"
    >
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-shrink-0">
          {icon === "github" ? (
            <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 md:mb-3 text-white font-poppins group-hover:text-gray-100 transition-colors">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 font-open-sans leading-relaxed mb-3 md:mb-4">
            {description}
          </p>
          <div className="inline-flex items-center text-sm sm:text-base text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
            Conectar →
          </div>
        </div>
      </div>
    </a>
  )
}
