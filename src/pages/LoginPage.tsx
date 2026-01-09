import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Login com email/senha
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // redireciona após login
    } catch (err: any) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  // Login com Google
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Erro Google login:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError("Domínio não autorizado. Configure o domínio no Firebase Console.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError("Login cancelado pelo usuário.");
      } else {
        setError(`Falha no login com Google: ${err.message || 'Verifique a configuração.'}`);
      }
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4 text-center">Login</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100 mb-3 btn-entrar">
          Entrar
        </Button>
      </Form>

      <Button className="w-100 btn-google" onClick={handleGoogleLogin}>
        Entrar com Google
      </Button>

      <div className="text-center mt-3">
        <Link to="/forgot-password" className="forgot-password-link">
          Esqueci minha senha
        </Link>
      </div>
    </Container>
  );
};

export default LoginPage;
