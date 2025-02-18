import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { useLanguage, translations } from '../contexts/LanguageContext';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ContentWrapper>
        <Title>{t.contact}</Title>
        <Description>
          {language === 'en' && "Feel free to reach out through any of these platforms"}
          {language === 'fr' && "N'hésitez pas à me contacter via l'une de ces plateformes"}
          {language === 'cn' && "您可以通过以下任何平台联系我"}
        </Description>
        <SocialLinks>
          <SocialLink 
            href="mailto:cedric.roulof@epitech.eu" 
            target="_blank"
            whileHover={{ y: -5 }}
          >
            <FaEnvelope />
            <span>{language === 'en' ? "Email" : language === 'fr' ? "Courriel" : "电子邮件"}</span>
          </SocialLink>
          <SocialLink 
            href="https://github.com/Shookapic" 
            target="_blank"
            whileHover={{ y: -5 }}
          >
            <FaGithub />
            <span>{language === 'en' ? "GitHub" : language === 'fr' ? "GitHub" : "GitHub"}</span>
          </SocialLink>
          <SocialLink 
            href="https://www.linkedin.com/in/cédric-roulof-494026258/" 
            target="_blank"
            whileHover={{ y: -5 }}
          >
            <FaLinkedin />
            <span>{language === 'en' ? "LinkedIn" : language === 'fr' ? "LinkedIn" : "LinkedIn"}</span>
          </SocialLink>
          <SocialLink 
            href="https://x.com/cedric_rlf" 
            target="_blank"
            whileHover={{ y: -5 }}
          >
            <SiX />
            <span>{language === 'en' ? "Twitter" : language === 'fr' ? "Twitter" : "Twitter"}</span>
          </SocialLink>
        </SocialLinks>
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
  text-align: center;
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
  margin-bottom: 1rem;
  width: 100%;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 3rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  span {
    font-size: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: radial-gradient(circle, #00ff9530 0%, transparent 70%);
    transition: width 0.3s ease, height 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    color: #00ff95;

    &::before {
      width: 200px;
      height: 200px;
    }
  }
`;

const BackToTopButton = styled(motion.button)`
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

export default Contact;
