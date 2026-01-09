import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Badge, Spinner, Alert, Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getItemIcon } from "../utils/itemIcons";
import { Item } from "../types/Item";
import { FiHome } from "react-icons/fi";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() } as Item);
        } else {
          setItem({
            id,
            name: "Item Desconhecido",
            descricao: "Item não encontrado no sistema.",
            category: "Outro",
            status: "perdido",
            date: new Date().toLocaleDateString(),
          });
        }
      } catch (err) {
        console.error("Erro ao buscar item:", err);
        setError("Não foi possível carregar os detalhes do item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando detalhes...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" className="mt-3" onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="py-5 text-center">
        <h2>Item não encontrado</h2>
        <p>Este item não existe ou foi removido.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0">
        {item.imageUrl && (
          <Card.Img
            variant="top"
            src={item.imageUrl}
            alt={item.name || item.nome}
            className="rounded-top"
          />
        )}
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="fw-bold">{item.name || item.nome}</Card.Title>
            <Badge bg={item.status === "encontrado" ? "success" : "danger"}>
              {item.status === "encontrado" ? "Encontrado" : "Perdido"}
            </Badge>
          </div>
          <Card.Subtitle className="mb-3 text-muted">
            Categoria: {item.category || item.categoria}
          </Card.Subtitle>
          <Card.Text>
            <div className="d-flex align-items-center mb-3">
              {getItemIcon(item.category || "", item.descricao)}
              <p className="mb-0 ms-2">{item.descricao}</p>
            </div>
            <small className="d-block">Data: {item.date}</small>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Botão arredondado com ícone */}
      <div className="text-center mt-4">
        <Button className="btn-home" size="lg" onClick={() => navigate("/search")}>
          <FiHome className="me-2" />
          Início
        </Button>
      </div>
    </Container>
  );
};

export default ItemDetailPage;



