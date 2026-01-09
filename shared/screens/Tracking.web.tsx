import React, { useState } from 'react';
import { Container, Title, Card, Input, Button } from '../components/WebStyles';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = () => {
    if (!trackingCode.trim()) {
      alert('Por favor, digite um código de rastreamento!');
      return;
    }

    setIsSearching(true);
    
    // Simulação de busca
    setTimeout(() => {
      setIsSearching(false);
      alert(`Encomenda ${trackingCode} encontrada!\n\nStatus: Em trânsito\nPrevisão: 3-5 dias úteis`);
    }, 2000);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <Title>Rastreamento de Encomendas</Title>
      <Card>
        <Input 
          placeholder="Digite o código de rastreamento"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        
        <Button 
          onClick={handleTrack}
          disabled={isSearching}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}
        >
          {isSearching ? (
            <>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid #667eea',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Buscando...
            </>
          ) : (
            <>
              <FiSearch size={20} />
              Rastrear Encomenda
            </>
          )}
        </Button>
        
        <Button 
          onClick={handleBack}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#f8f9fa',
            color: '#667eea'
          }}
        >
          <FiArrowLeft size={20} />
          Voltar para Início
        </Button>
      </Card>
    </Container>
  );
}
