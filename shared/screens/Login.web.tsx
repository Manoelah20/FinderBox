import React, { useState } from 'react';
import { Container, Title, Card, Input, Button } from '../components/WebStyles';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

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
      email: '',
      password: ''
    };

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

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulação de login
      setTimeout(() => {
        setIsLoading(false);
        
        // Simular login bem-sucedido
        const userData = {
          email: formData.email,
          name: formData.email.split('@')[0], // Extrair nome do email
          loginTime: new Date().toLocaleString('pt-BR')
        };
        
        // Salvar no localStorage (simulação)
        localStorage.setItem('finderbox_user', JSON.stringify(userData));
        
        alert(`Login realizado com sucesso!\n\nBem-vindo de volta, ${userData.name}! 🎉\n\nData: ${userData.loginTime}`);
        
        setFormData({
          email: '',
          password: ''
        });
        
        // Redirecionar para página inicial após o usuário clicar em "OK"
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }, 2000);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleRegister = () => {
    window.location.href = '/register';
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

        <Title style={{ marginBottom: '30px' }}>Login</Title>
        
        <form onSubmit={handleSubmit}>
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
              disabled={isLoading}
            />
            {errors.email && <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
          </div>

          <div style={{ marginBottom: '24px' }}>
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
              disabled={isLoading}
            />
            {errors.password && <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>}
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%',
              fontSize: '16px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Entrando...
              </>
            ) : (
              <>
                <FiLock size={20} />
                Entrar
              </>
            )}
          </Button>
        </form>

        <div style={{ 
          marginTop: '20px', 
          paddingTop: '20px', 
          borderTop: '1px solid #e9ecef' 
        }}>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '10px' }}>
            Não tem uma conta?
          </p>
          <Button 
            onClick={handleRegister}
            style={{ 
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              width: '100%'
            }}
          >
            Criar Conta
          </Button>
        </div>
      </Card>
    </div>
  );
}
