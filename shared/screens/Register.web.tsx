import React, { useState } from 'react';
import { Container, Title, Card, Input, Button } from '../components/WebStyles';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (value) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('Conta criada com sucesso!\n\nBem-vinda ao FinderBox! 🎉');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      color: 'white'
    }}>
      <Card style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Button 
            onClick={handleBack}
            style={{ 
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              padding: '8px 12px',
              fontSize: '14px'
            }}
          >
            <FiArrowLeft size={16} />
            Voltar
          </Button>
        </div>

        <Title style={{ marginBottom: '30px' }}>Criar Conta</Title>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
              <FiUser size={16} style={{ marginRight: '8px' }} />
              Nome Completo
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome completo"
              required
            />
            {errors.name && <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>{errors.name}</div>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
              <FiMail size={16} style={{ marginRight: '8px' }} />
              Email
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              required
            />
            {errors.email && <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
              <FiLock size={16} style={{ marginRight: '8px' }} />
              Senha
            </label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
            {errors.password && <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
              <FiLock size={16} style={{ marginRight: '8px' }} />
              Confirmar Senha
            </label>
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Digite a senha novamente"
              required
            />
            {errors.confirmPassword && <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>{errors.confirmPassword}</div>}
          </div>

          <Button 
            type="submit"
            style={{ 
              width: '100%',
              fontSize: '16px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Criar Conta
          </Button>
        </form>
      </Card>
    </div>
  );
}
