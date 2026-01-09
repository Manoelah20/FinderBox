import React from 'react';
import { Container, Title, Subtitle, Button, Card } from '../components/WebStyles';
import { FiSearch, FiPlus, FiPackage, FiArrowDown, FiUser, FiLogIn } from 'react-icons/fi';
import FeaturedItems from '../components/FeaturedItems.web';
import { FaWhatsapp } from 'react-icons/fa';

export default function Home() {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('featured-items');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Menu de Navegação */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '12px 20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: '1000'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#667eea',
            flex: '1 1 auto'
          }}>
            FinderBox 🚀
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap',
            flex: '0 0 auto'
          }}>
            <Button 
              onClick={() => handleNavigation('/login')}
              style={{ 
                background: '#667eea',
                color: 'white',
                padding: '6px 12px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <FiLogIn size={14} />
              Login
            </Button>
            
            <Button 
              onClick={() => handleNavigation('/register')}
              style={{ 
                background: '#28a745',
                color: 'white',
                padding: '6px 12px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <FiUser size={14} />
              Registrar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div style={{
        paddingTop: '100px', // Aumentado para não cortar o menu
        paddingBottom: '80px', // Espaço para o rodapé
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Container style={{ 
          minHeight: 'auto', 
          justifyContent: 'flex-start',
          padding: '20px',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            width: '100%',
            padding: '0 20px',
            boxSizing: 'border-box'
          }}>
            <Title style={{ marginBottom: '10px' }}>FinderBox 🚀</Title>
            <Subtitle style={{ marginBottom: '20px' }}>Bem-vinda à versão Web 🌐</Subtitle>
          </div>

          {/* Content Card */}
          <Card style={{ 
            textAlign: 'left', 
            padding: '30px',
            maxWidth: '700px',
            width: '100%',
            boxSizing: 'border-box',
            margin: '0 auto 40px auto'
          }}>
            <h2 style={{ fontSize: '1.8em', color: '#333', marginBottom: '15px' }}>
              FinderBox é uma plataforma moderna e intuitiva para ajudar você a encontrar o que perdeu ou encontrar quem perdeu algo que você achou!
            </h2>
            <p style={{ fontSize: '1.1em', color: '#666', lineHeight: '1.6' }}>
              <span style={{ fontWeight: 'bold', color: '#667eea' }}>🎯 Nossa Missão:</span> Conectar pessoas e itens, transformando a frustração da perda em alegria do reencontro. Simplificamos o processo de busca e devolução, tornando-o rápido, seguro e eficiente.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', marginTop: '24px' }}>
              <Button 
                onClick={() => handleNavigation('/tracking')}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}
              >
                <FiSearch size={20} />
                Rastrear Encomenda
              </Button>
              
              <Button 
                onClick={() => handleNavigation('/about')}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}
              >
                <FiPackage size={20} />
                Sobre o FinderBox
              </Button>
              
              <Button 
                onClick={() => handleNavigation('/add-item')}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FiPlus size={20} />
                Cadastrar Item
              </Button>
            </div>
          </Card>
          
          <Button 
            onClick={scrollToFeatures}
            style={{ 
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Ver Itens em Destaque
            <FiArrowDown size={16} />
          </Button>
        </Container>
        
        <FeaturedItems />
      </div>
      
      {/* Rodapé */}
      <footer style={{
        background: '#2c3e50',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginTop: '80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '30px'
          }}>
            <div>
              <h4 style={{ marginBottom: '16px', color: '#fff' }}>FinderBox</h4>
              <p style={{ lineHeight: '1.6', color: '#b8c5d6' }}>
                Plataforma moderna para rastreamento de encomendas e localização de itens perdidos e achados.
              </p>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '16px', color: '#fff' }}>Links Rápidos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="/tracking" style={{ color: '#b8c5d6', textDecoration: 'none' }}>Rastrear Encomenda</a>
                <a href="/add-item" style={{ color: '#b8c5d6', textDecoration: 'none' }}>Cadastrar Item</a>
                <a href="/about" style={{ color: '#b8c5d6', textDecoration: 'none' }}>Sobre Nós</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '16px', color: '#fff' }}>Contato</h4>
              <p style={{ 
                color: '#b8c5d6',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <a 
                  href="mailto:contato@finderbox.com"
                  style={{ 
                    color: '#b8c5d6', 
                    textDecoration: 'none',
                    ':hover': { textDecoration: 'underline' }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  📧 contato@finderbox.com
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '20px' }}>
                  📞 (11) 1234-5678
                  <a 
                    href="https://wa.me/551112345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#25d366',
                      textDecoration: 'none',
                      fontSize: '16px'
                    }}
                    title="Contato via WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </p>
              <p style={{ color: '#b8c5d6' }}>
                🕐 Seg-Sex, 9h-18h
              </p>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #4a5568',
            paddingTop: '20px',
            color: '#b8c5d6',
            fontSize: '14px'
          }}>
            2025 FinderBox. Todos os direitos reservados. 
Feito com ❤️ por Manoela Harrison para ajudar você a encontrar o que perdeu ou comprou.
          </div>
        </div>
      </footer>
    </>
  );
}
