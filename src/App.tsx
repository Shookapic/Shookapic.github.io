import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import GlobalStyle from './styles/GlobalStyle';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { Language, LanguageProvider, useLanguage, translations, languageFlags } from './contexts/LanguageContext';
import { CountryFlagEmoji } from './components/CountryFlagEmoji';

const App = () => {
  const [glitchEffect, setGlitchEffect] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const homeRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const { language, setLanguage } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  const particlesInit = async (main: any) => {
    await loadSlim(main);
  };

  const particlesLoaded = async (container: ParticlesContainer | undefined) => {
    if (container) {
      console.log("Particles loaded", container);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlitchEffect(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!homeRef.current || !portfolioRef.current || !contactRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      const contactTop = contactRef.current.offsetTop;

      if (scrollPosition >= contactTop - 100) {
        setActiveSection('contact');
      } else if (scrollPosition >= portfolioRef.current.offsetTop - 100) {
        setActiveSection('portfolio');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct section on page load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1
          },
          background: {
            color: {
              value: "#000000"
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push"
              },
              onHover: {
                enable: true,
                mode: "repulse"
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: "#ffffff"
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce"
              },
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: "circle"
            },
            size: {
              value: { min: 1, max: 3 }
            }
          },
          detectRetina: true
        }}
      />
      <Header>
        <DevText>&lt;Shookapic/&gt;</DevText>
        <Nav>
          <NavButton 
            onClick={() => scrollToSection(homeRef)}
          >
            {translations[language].home}
          </NavButton>
          <NavButton 
            onClick={() => scrollToSection(portfolioRef)}
            active={activeSection === 'portfolio'}
          >
            {translations[language].portfolio}
          </NavButton>
          <NavButton 
            onClick={() => scrollToSection(contactRef)}
            active={activeSection === 'contact'}
          >
            {translations[language].contact}
          </NavButton>
          <LanguageSwitcherContainer>
            <LanguageSwitcher 
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <CountryFlagEmoji code={languageFlags[language]} />
            </LanguageSwitcher>
            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <LanguageDropdown
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {Object.keys(languageFlags).map(lang => (
                    <LanguageOption 
                      key={lang}
                      onClick={() => handleLanguageChange(lang as Language)}
                    >
                      <CountryFlagEmoji code={languageFlags[lang as Language]} /> {lang.toUpperCase()}
                    </LanguageOption>
                  ))}
                </LanguageDropdown>
              )}
            </AnimatePresence>
          </LanguageSwitcherContainer>
        </Nav>
      </Header>
      <Main>
        <Section ref={homeRef}>
          <Home glitchEffect={glitchEffect} />
        </Section>
        <Section ref={portfolioRef}>
          <Portfolio />
        </Section>
        <Section ref={contactRef}>
          <Contact />
        </Section>
      </Main>
    </Container>
  );
};

const glitchAnimation = keyframes`
  0%, 100% { 
    transform: translate(0, 0);
    opacity: 1;
  }
  5% {
    transform: translate(-2px, 0);
    opacity: 0.8;
  }
  10% {
    transform: translate(2px, 0);
    opacity: 0.8;
  }
  15% {
    transform: translate(-1px, -2px);
    opacity: 0.9;
  }
  20% {
    transform: translate(1px, 2px);
    opacity: 0.9;
  }
`;

const DevText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #00ff95;
  position: relative;
  display: inline-block;
  animation: ${glitchAnimation} 2s infinite linear alternate;
  
  &::before,
  &::after {
    content: "<Shookapic/>";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #00ff95;
    opacity: 0.7;
  }

  &::before {
    left: -1px;
    text-shadow: 1px 0 red;
    transform: skew(-10deg);
    animation: ${glitchAnimation} 2s infinite linear alternate-reverse;
  }

  &::after {
    left: 1px;
    text-shadow: -1px 0 blue;
    transform: skew(10deg);
    animation: ${glitchAnimation} 2s infinite linear alternate;
  }
`;

const Container = styled.div`
  position: relative;
  color: white;
  overflow-x: hidden;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button<{ active?: boolean }>`
  position: relative;
  background: none;
  border: none;
  color: ${props => props.active ? '#00ff95' : 'white'};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #00ff95;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Main = styled.main`
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #000;
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff95;
    border-radius: 4px;
  }
`;

const Section = styled.section`
  scroll-snap-align: start;
  height: 100vh;
`;

const LanguageSwitcherContainer = styled.div`
  position: relative;
`;

const LanguageSwitcher = styled.button`
  background: transparent;
  border: 2px solid #00ff95;
  color: #00ff95;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 149, 0.1);
    transform: scale(1.1);
  }
`;

const LanguageDropdown = styled(motion.div)`
  position: absolute;
  top: 110%;
  right: 0;
  background: #1a1a1a;
  border: 2px solid #00ff95;
  border-radius: 8px;
  padding: 0.5rem;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  color: #00ff95;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 255, 149, 0.1);
  }
`;

// Wrap App with LanguageProvider
const AppWithLanguage = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default AppWithLanguage;
