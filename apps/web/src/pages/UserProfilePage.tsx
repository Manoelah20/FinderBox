// src/pages/UserProfilePage.tsx
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const UserProfilePage: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  if (!user) {
    return (
      <Container className="py-5">
        <h1>Meu Perfil</h1>
        <p className="text-muted">Você precisa estar logado para ver seu perfil.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Meu Perfil</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{user.displayName || "Usuário FinderBox"}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email} <br />
            <strong>UID:</strong> {user.uid}
          </Card.Text>
          <Button variant="primary">Editar Perfil</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfilePage;

