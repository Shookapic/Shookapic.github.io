import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLanguage, translations } from '../contexts/LanguageContext';

// Technology Logo Imports
import CPlusPlusLogo from '../assets/logos/cpp.svg';
import CMakeLogo from '../assets/logos/cmake.svg';
import ReactLogo from '../assets/logos/react.svg';
import NodeJsLogo from '../assets/logos/nodejs.svg';
import PostgreSQLLogo from '../assets/logos/postgresql.svg';
import CLogo from '../assets/logos/c.svg';
import MakefileLogo from '../assets/logos/makefile.svg';

interface TechnologyLogoMap {
  [key: string]: string;
}

const TechnologyLogos: TechnologyLogoMap = {
  'C++': CPlusPlusLogo,
  'CMake': CMakeLogo,
  'React': ReactLogo,
  'NodeJs Express': NodeJsLogo,
  'PostgreSQL': PostgreSQLLogo,
  'C': CLogo,
  'Makefile': MakefileLogo
};

interface Project {
  id: number;
  title: {
    en: string;
    fr: string;
    cn: string;
    kr: string;
  };
  description: {
    en: string;
    fr: string;
    cn: string;
    kr: string;
  };
  image: string;
  technologies: string[];
  githubLink: string;
  projectLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: {
      en: 'Ascii Art',
      fr: 'Ascii Art',
      cn: 'Ascii Art',
      kr: 'Ascii 아트'
    },
    description: {
      en: 'A C++ application to generate ASCII art from video or webcam input.',
      fr: 'Une application C++ pour générer de l\'art ASCII depuis la vidéo ou la webcam.',
      cn: '一个使用视频或摄像头输入生成 ASCII 文本的 C++ 应用程序。',
      kr: 'C++ 프로그램을 사용한 ASCII 아트 생성 프로그램.'
    },
    image: 'https://raw.githubusercontent.com/dawsonbooth/ascii-art/master/logo.png',
    technologies: ['C++', 'CMake'],
    githubLink: 'https://github.com/Shookapic/ASCII_Art'
  },
  {
    id: 2,
    title: {
      en: 'Flowfy',
      fr: 'Flowfy',
      cn: 'Flowfy',
      kr: 'Flowfy'
    },
    description: {
      en: 'An alternative to the famous tool Zapier !',
      fr: 'Une alternative au fameux outil Zapier !',
      cn: '一个对zapier的替代品。',
      kr: 'Zapier의 대신의 약플.'
    },
    image: 'https://cdn.prod.website-files.com/60c0cec90f57824353f55893/63440d4add9f1c05273c8978_11%20best%20task%20automation%20tools%20to%20speed%20up%20your%20scut%20work.webp',
    technologies: ['React', 'NodeJs Express', 'PostgreSQL'],
    githubLink: 'https://github.com/Shookapic/Flowfy'
  },
  {
    id: 3,
    title: {
      en: 'Minishell',
      fr: 'Minishell',
      cn: 'Minishell',
      kr: 'Minishell'
    },
    description: {
      en: 'A minimalistic shell with support for built-in commands and environment variables.',
      fr: 'Un shell minimaliste avec prise en charge des commandes built-in et des variables d\'environnement.',
      cn: '一个具有内置命令和环境变量支持的最小化 shell。',
      kr: '데이터를 가지고 있는 브로드에 따라서 진행되는 브로드의 브로드을 이용한 브로드.'
    },
    image: 'https://bashlogo.com/img/symbol/jpg/full_colored_light.jpg',
    technologies: ['C', 'Makefile'],
    githubLink: 'https://github.com/Shookapic/Minishell'
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

  const handleProjectTitleClick = (githubLink: string) => {
    window.open(githubLink, '_blank', 'noopener,noreferrer');
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
                <ProjectTitle 
                  onClick={() => handleProjectTitleClick(projects[currentIndex].githubLink)}
                >
                  {projects[currentIndex].title[language]}
                </ProjectTitle>
                <ProjectDescription>{projects[currentIndex].description[language]}</ProjectDescription>
                <TechStack>
                  {projects[currentIndex].technologies.map((tech, index) => (
                    <TechBadge key={index}>
                      {TechnologyLogos[tech] && (
                        <TechnologyLogo 
                          src={TechnologyLogos[tech]} 
                          alt={`${tech} logo`} 
                        />
                      )}
                      {tech}
                    </TechBadge>
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
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #00ffcc;
    text-decoration: underline;
  }
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
  display: flex;
  align-items: center;
  background: rgba(0, 255, 149, 0.1);
  color: #00ff95;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  gap: 0.5rem;
`;

const TechnologyLogo = styled.img`
  width: 20px;
  height: 20px;
`;

export default Portfolio;
