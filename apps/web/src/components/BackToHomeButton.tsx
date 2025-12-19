import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';

const BackToHomeButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTopAndNavigate = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <Button
      variant="primary"
      onClick={scrollToTopAndNavigate}
      className={`position-fixed bottom-0 end-0 m-4 d-flex align-items-center gap-2 shadow-lg rounded-circle p-3 transition-all ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        zIndex: 1000,
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        transition: 'all 0.3s ease-in-out'
      }}
      title="Voltar ao Início"
    >
      <House size={20} />
      <span className="d-none d-md-inline">Início</span>
    </Button>
  );
};

export default BackToHomeButton;
