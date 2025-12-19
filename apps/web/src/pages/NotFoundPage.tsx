import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-4 fw-bold text-primary">404</h1>
      <p className="lead mb-4">
        Ops! A página que você procura não foi encontrada.
      </p>
      <Button as={Link} to="/" variant="primary">
        Voltar para Início
      </Button>
    </Container>
  );
};

export default NotFoundPage;
