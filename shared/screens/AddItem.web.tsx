import React, { useState } from 'react';
import { Container, Title, Card, Input, Button } from '../components/WebStyles';
import { FiArrowLeft, FiPlus, FiPackage, FiMapPin, FiTag } from 'react-icons/fi';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    date: '',
    contact: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.description) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setIsSubmitting(true);
    
    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Item cadastrado com sucesso!\n\nEm breve estará disponível na busca.');
      setFormData({
        name: '',
        category: '',
        description: '',
        location: '',
        date: '',
        contact: ''
      });
    }, 2000);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <Title>Cadastrar Item</Title>
      <Card>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '600'
            }}>
              <FiPackage size={16} style={{ marginRight: '8px' }} />
              Nome do Item *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: iPhone 13, Carteira, Chaves"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '600'
            }}>
              <FiTag size={16} style={{ marginRight: '8px' }} />
              Categoria *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '16px',
                backgroundColor: 'white'
              }}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Eletrônico">Eletrônico</option>
              <option value="Documentos">Documentos</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Bolsa">Bolsa</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '600'
            }}>
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descreva o item em detalhes (cor, marca, características especiais)..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '16px',
                minHeight: '100px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '600'
            }}>
              <FiMapPin size={16} style={{ marginRight: '8px' }} />
              Local onde foi encontrado/perdido
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Ex: Estação Central, Shopping Center, Rua XV de Novembro"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '600'
            }}>
              Data
            </label>
            <Input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '600'
            }}>
              Contato
            </label>
            <Input
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Email ou telefone para contato"
            />
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting}
            style={{ 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid #667eea',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Cadastrando...
              </>
            ) : (
              <>
                <FiPlus size={20} />
                Cadastrar Item
              </>
            )}
          </Button>
        </form>
        
        <Button 
          onClick={handleBack}
          style={{ 
            width: '100%',
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
