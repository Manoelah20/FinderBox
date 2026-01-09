import React from 'react';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '20px',
    maxWidth: '100%',
    boxSizing: 'border-box'
  }}>
    {children}
  </div>
);

export const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 style={{
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  }}>
    {children}
  </h1>
);

export const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{
    fontSize: '20px',
    opacity: 0.9,
    marginBottom: '32px'
  }}>
    {children}
  </p>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, onClick, style, disabled, type = 'button' }) => (
  <button 
    type={type}
    style={{
      background: 'white',
      color: '#667eea',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      opacity: disabled ? 0.6 : 1,
      ...style
    }} 
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
    margin: '16px',
    boxSizing: 'border-box'
  }}>
    {children}
  </div>
);

export const Input: React.FC<{ 
  placeholder?: string; 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  required?: boolean;
}> = ({ placeholder, value, onChange, name, type = "text", required }) => (
  <input 
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    style={{
      width: '100%',
      padding: '12px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      marginBottom: '16px'
    }}
  />
);
