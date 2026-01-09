import React from "react";
import { Container, Card } from "react-bootstrap";

const TermosPage: React.FC = () => {
  return (
    <Container className="py-5">
      <Card className="legal-card shadow-lg">
        <Card.Body>
          <h2 className="mb-4">Termos de Uso</h2>
          <p>
            Bem-vindo ao FinderBox. Ao acessar e utilizar nossos serviços, você
            concorda com os seguintes termos:
          </p>
          <ul>
            <li>
              O FinderBox é uma plataforma destinada ao rastreamento de
              encomendas e ao registro de itens perdidos ou encontrados.
            </li>
            <li>
              O usuário é responsável pelas informações que publica, devendo
              garantir que sejam verdadeiras e não violem direitos de terceiros.
            </li>
            <li>
              É proibido utilizar a plataforma para fins ilegais, fraudulentos
              ou que causem danos a outros usuários.
            </li>
            <li>
              O FinderBox reserva-se o direito de atualizar estes termos a
              qualquer momento, sendo responsabilidade do usuário consultá-los
              periodicamente.
            </li>
          </ul>
          <p className="mt-3">
            Ao continuar utilizando nossos serviços, você confirma que leu e
            concorda com estes Termos de Uso.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermosPage;


