import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-5">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você procura não existe.</p>
      <Button as={Link as any} to="/" variant="primary">
        Voltar para Home
      </Button>
    </div>
  );
};

export default NotFoundPage;

