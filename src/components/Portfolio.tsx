import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLanguage, translations } from '../contexts/LanguageContext';

interface Project {
  id: number;
  title: {
    en: string;
    fr: string;
    cn: string;
  };
  description: {
    en: string;
    fr: string;
    cn: string;
  };
  image: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: {
      en: 'Shookapic Platform',
      fr: 'Plateforme Shookapic',
      cn: 'Shookapic平台'
    },
    description: {
      en: 'A comprehensive web application for photo management and sharing.',
      fr: 'Une application web complète pour la gestion et le partage de photos.',
      cn: '用于照片管理和共享的综合Web应用程序。'
    },
    image: 'https://via.placeholder.com/800x500.png?text=Project+1',
    technologies: ['React', 'Firebase', 'TypeScript'],
  },
  {
    id: 2,
    title: {
      en: 'Cybersecurity Dashboard',
      fr: 'Tableau de Bord de Cybersécurité',
      cn: '网络安全仪表板'
    },
    description: {
      en: 'An innovative security monitoring platform with real-time threat detection.',
      fr: 'Une plateforme innovante de surveillance de la sécurité avec détection de menaces en temps réel.',
      cn: '具有实时威胁检测的创新安全监控平台。'
    },
    image: 'https://via.placeholder.com/800x500.png?text=Project+2',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
  },
  {
    id: 3,
    title: {
      en: 'Machine Learning Platform',
      fr: 'Plateforme d\'Apprentissage Automatique',
      cn: '机器学习平台'
    },
    description: {
      en: 'A cutting-edge machine learning platform for predictive analytics.',
      fr: 'Une plateforme d\'apprentissage automatique de pointe pour l\'analyse prédictive.',
      cn: '用于预测分析的尖端机器学习平台。'
    },
    image: 'https://via.placeholder.com/800x500.png?text=Project+3',
    technologies: ['React Native', 'TensorFlow', 'Python'],
  },
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ContentWrapper>
        <Title>{translations[language].portfolio}</Title>
        <ProjectContainer>
          <ArrowButton onClick={prevProject} left>
            <FaArrowLeft />
          </ArrowButton>
          <Content>
            <ProjectCard
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectImageWrapper>
                <ProjectImage 
                  src={projects[currentIndex].image} 
                  alt={projects[currentIndex].title[language]} 
                  loading="lazy"
                />
              </ProjectImageWrapper>
              <ProjectInfo>
                <ProjectTitle>{projects[currentIndex].title[language]}</ProjectTitle>
                <ProjectDescription>{projects[currentIndex].description[language]}</ProjectDescription>
                <TechStack>
                  {projects[currentIndex].technologies.map((tech, index) => (
                    <TechBadge key={index}>{tech}</TechBadge>
                  ))}
                </TechStack>
              </ProjectInfo>
            </ProjectCard>
          </Content>
          <ArrowButton onClick={nextProject}>
            <FaArrowRight />
          </ArrowButton>
        </ProjectContainer>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #00ff95;
  margin-bottom: 3rem;
  text-align: center;
  width: 100%;
`;

const ProjectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const ArrowButton = styled.button<{ left?: boolean }>`
  background: none;
  border: none;
  color: #00ff95;
  font-size: 2rem;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  z-index: 1;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const Content = styled.div`
  width: 800px;
  height: 500px;
  position: relative;
  overflow: hidden;
`;

const ProjectCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ProjectImageWrapper = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #00ff95;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechBadge = styled.span`
  background: rgba(0, 255, 149, 0.1);
  color: #00ff95;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

export default Portfolio;
