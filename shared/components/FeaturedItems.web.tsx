import React, { useState } from 'react';
import { Container, Title, Card, Button } from './WebStyles';
import { getItemIcon } from '../../src/utils/itemIcons';
import { FiMapPin, FiCalendar, FiX } from 'react-icons/fi';

// Dados Mockados para Exemplo
const mockFeaturedItems = [
  { 
    id: "1", 
    name: "Chaves com Chaveiro", 
    category: "Chaves", 
    location: "Estacionamento - Bloco A", 
    status: "lost", 
    date: "14/12/2025",
    description: "Chaves com chaveiro da Toyota, encontradas no estacionamento próximo ao bloco A. Contém 3 chaves e um controle remoto.",
    contact: "joao@email.com",
    phone: "(11) 98765-4321"
  },
  { 
    id: "2", 
    name: "Carteira Preta", 
    category: "Carteira/Documentos", 
    location: "Refeitório - Próximo às mesas", 
    status: "lost", 
    date: "15/12/2025",
    description: "Carteira preta da Nike, contém documentos, cartões e um pouco de dinheiro. Perdida durante o almoço.",
    contact: "maria@email.com",
    phone: "(11) 91234-5678"
  },
  { 
    id: "3", 
    name: "Óculos de Grau", 
    category: "Óculos", 
    location: "Sala de Aula 203", 
    status: "found", 
    date: "16/12/2025",
    description: "Óculos de grau com armação preta, grau aproximado de -2.5. Encontrados na sala 203 após a aula.",
    contact: "pedro@email.com",
    phone: "(11) 97654-3210"
  },
  { 
    id: "4", 
    name: "Fone de Ouvido Bluetooth", 
    category: "Fone de Ouvido", 
    location: "Laboratório de Informática", 
    status: "found", 
    date: "17/12/2025",
    description: "Fone Bluetooth JBL Tune 220, cor azul. Funciona perfeitamente, encontrado no laboratório.",
    contact: "ana@email.com",
    phone: "(11) 92345-6789"
  },
  { 
    id: "5", 
    name: "Mochila Azul", 
    category: "Mochila", 
    location: "Biblioteca - Sala de Estudo", 
    status: "found", 
    date: "18/12/2025",
    description: "Mochila azul da Adidas, contém laptop, cadernos e material de estudo. Deixada na biblioteca.",
    contact: "carlos@email.com",
    phone: "(11) 98765-1234"
  },
];

const FeaturedItems: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof mockFeaturedItems[0] | null>(null);

  const handleItemClick = (item: typeof mockFeaturedItems[0]) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: '#f8f9fa'
      }}>
        <Title style={{ color: '#333', marginBottom: '40px' }}>
          ✨ Itens em Destaque
        </Title>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          padding: '0 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {mockFeaturedItems.map((item) => (
            <Card 
              key={item.id} 
              style={{ 
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => handleItemClick(item)}
            >
              {/* Ícone/Emoji Visual */}
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {getItemIcon(item.category)}
              </div>

              <div style={{ padding: '20px' }}>
                {/* Badge de Status */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: item.status === 'found' ? '#1e7e34' : '#b91c1c',
                    color: '#fff',
                    boxShadow: item.status === 'found' ? '0 2px 4px rgba(30, 167, 69, 0.3)' : '0 2px 4px rgba(220, 53, 69, 0.3)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }}>
                    {item.status === 'lost' ? '🔴 Perdido' : '🟢 Achado'}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.name}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '12px'
                }}>
                  {item.category}
                </p>
                
                <p style={{
                  fontSize: '13px',
                  color: '#333',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FiMapPin size={14} />
                  {item.location}
                </p>
                
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FiCalendar size={12} />
                  {item.date}
                </p>

                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                  style={{ 
                    width: '100%',
                    fontSize: '14px',
                    padding: '8px 16px'
                  }}
                >
                  Ver Detalhes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000',
          padding: '20px'
        }}>
          <Card style={{ 
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                zIndex: '1'
              }}
            >
              <FiX size={24} />
            </button>

            {/* Conteúdo do Modal */}
            <div style={{ padding: '20px' }}>
              {/* Ícone e Status */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                gap: '15px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {getItemIcon(selectedItem.category)}
                </div>
                <div>
                  <h2 style={{ 
                    margin: '0 0 8px 0', 
                    color: '#333',
                    fontSize: '20px'
                  }}>
                    {selectedItem.name}
                  </h2>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: selectedItem.status === 'found' ? '#1e7e34' : '#b91c1c',
                    color: '#fff'
                  }}>
                    {selectedItem.status === 'lost' ? '🔴 Perdido' : '🟢 Achado'}
                  </span>
                </div>
              </div>

              {/* Detalhes */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Descrição</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {selectedItem.description}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Localização</h4>
                <p style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiMapPin size={16} />
                  {selectedItem.location}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Data</h4>
                <p style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiCalendar size={16} />
                  {selectedItem.date}
                </p>
              </div>

              {/* Contato */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Informações de Contato</h4>
                <p style={{ 
                  color: '#666', 
                  marginBottom: '8px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  ':hover': { color: '#667eea' }
                }}>
                  <strong>Email:</strong> 
                  <a 
                    href={`mailto:${selectedItem.contact}`}
                    style={{ 
                      color: '#667eea',
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
                    {selectedItem.contact}
                  </a>
                </p>
                <p style={{ color: '#666' }}>
                  <strong>Telefone:</strong> {selectedItem.phone}
                </p>
              </div>

              {/* Botões de Ação */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                  onClick={closeModal}
                  style={{ 
                    flex: '1',
                    background: '#6c757d',
                    color: '#fff'
                  }}
                >
                  Fechar
                </Button>
                <Button 
                  onClick={() => {
                    alert(selectedItem.status === 'lost' 
                      ? 'Obrigado por informar que encontrou este item! Entraremos em contato em breve.' 
                      : 'Entraremos em contato com o dono do item em breve!');
                    closeModal();
                  }}
                  style={{ 
                    flex: '1',
                    background: '#667eea',
                    color: '#fff'
                  }}
                >
                  {selectedItem.status === 'lost' ? 'Informar que encontrei' : 'Entrar em contato'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FeaturedItems;
