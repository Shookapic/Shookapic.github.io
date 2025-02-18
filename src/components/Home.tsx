import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage, translations } from '../contexts/LanguageContext';

interface HomeProps {
  glitchEffect: boolean;
}

const Home = ({ glitchEffect }: HomeProps) => {
  const { language } = useLanguage();

  const downloadCV = async () => {
    try {
      const cvUrl = 'https://drive.google.com/uc?export=download&id=1RMNLaz9FrxSQzTxRI38WuWSaBeQGQUeZ';
      
      const response = await fetch(cvUrl);
      const blob = await response.blob();
      
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Cedric_Roulof_CV.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback to direct link if fetch fails
      window.open('https://drive.google.com/file/d/1RMNLaz9FrxSQzTxRI38WuWSaBeQGQUeZ/view?usp=drive_link', '_blank');
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Content>
        <NameWrapper className={glitchEffect ? 'glitch' : ''}>
          <CodeTag>&lt;h1&gt;</CodeTag>
          <Name>Cédric Roulof</Name>
          <CodeTag>&lt;/h1&gt;</CodeTag>
        </NameWrapper>
        <Title>{translations[language].title}</Title>
        <Description>
          {translations[language].description}
        </Description>
        <DownloadButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadCV}
        >
          {translations[language].downloadCV}
        </DownloadButton>
      </Content>
    </Container>
  );
};

const glitchAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(10px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const Content = styled.div`
  z-index: 1;
`;

const NameWrapper = styled.div`
  margin-bottom: 1rem;
  &.glitch {
    animation: ${glitchAnimation} 0.5s linear infinite;
  }
`;

const CodeTag = styled.span`
  color: #00ff95;
  font-family: 'Courier New', monospace;
  margin: 0 0.5rem;
`;

const Name = styled.span`
  font-size: 4rem;
  font-weight: bold;
  display: inline-block;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #00ff95;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #ccc;
`;

const DownloadButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #00ff95;
  color: #00ff95;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00ff9520;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${scrollAnimation} 2s infinite;
  width: max-content;
`;

const ScrollText = styled.span`
  color: #00ff95;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 100%;
`;

const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid #00ff95;
  border-bottom: 2px solid #00ff95;
  transform: rotate(45deg);
`;

export default Home;
