import React from 'react';
import { Container, Title, Card, Subtitle, Button } from '../components/WebStyles';
import { FiArrowLeft } from 'react-icons/fi';

export default function About() {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <Title>Sobre o FinderBox</Title>
      <Card>
        <Subtitle>
          FinderBox é uma aplicação moderna para rastreamento de encomendas, 
          construída com React e tecnologias web.
        </Subtitle>
        
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>🚀 Recursos Principais:</h4>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Rastreamento de encomendas em tempo real</li>
            <li>Interface intuitiva e responsiva</li>
            <li>Cadastro de itens perdidos e achados</li>
            <li>Sistema de busca avançada</li>
            <li>Compatibilidade web e mobile</li>
          </ul>
          
          <h4 style={{ color: '#333', marginTop: '20px', marginBottom: '10px' }}>🛠️ Tecnologias:</h4>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>React 18 com TypeScript</li>
            <li>React Router para navegação</li>
            <li>Vite para desenvolvimento rápido</li>
            <li>Bootstrap para estilização</li>
            <li>Firebase para autenticação e dados</li>
          </ul>
        </div>
        
        <Button 
          onClick={handleBack}
          style={{ 
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <FiArrowLeft size={20} />
          Voltar para Início
        </Button>
      </Card>
    </Container>
  );
}
