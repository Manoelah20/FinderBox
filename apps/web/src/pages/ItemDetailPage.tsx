import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Badge, Spinner, Alert, Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getItemIcon } from "../utils/itemIcons";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cache local para dados mock
  const mockCache = new Map<string, any>();

  // Função de fallback com dados mock variados
  const getMockItemData = (itemId: string) => {
    const mockItems = {
      '1': {
        id: '1',
        title: "Chaves",
        description: "Conjunto de chaves com chaveiro de time de futebol. Perdidas no estacionamento.",
        category: "Chaves",
        location: "Estacionamento - Shopping Tijuca",
        status: "lost",
        date: "14/12/2025",
        imageUrl: null
      },
      '2': {
        id: '2',
        title: "Carteira",
        description: "Carteira de couro preta perdida no refeitório. Contém documentos e cartões.",
        category: "Carteira/Documentos",
        location: "Bilheteria do MetrôRio - Estação Uruguaiana",
        status: "lost",
        date: "15/12/2025",
        imageUrl: null
      },
      '3': {
        id: '3',
        title: "Óculos",
        description: "Óculos com armação metálica encontrados na sala de aula. Grau aproximado -2.0.",
        category: "Óculos",
        location: "Sala de Aula 203 - Do Senac Centro RJ - Unidade Santa Luzia",
        status: "found",
        date: "16/12/2025",
        imageUrl: null
      },
      '4': {
        id: '4',
        title: "Fone de Ouvido",
        description: "Fone de ouvido sem fio encontrado no laboratório de informática. Cor preta.",
        category: "Fone de Ouvido",
        location: "Laboratório de Informática - da Universidade do Estado do Rio de Janeiro",
        status: "found",
        date: "17/12/2025",
        imageUrl: null
      },
      '5': {
        id: '5',
        title: "Mochila",
        description: "Mochila azul encontrada na biblioteca. Contém livros e material escolar.",
        category: "Mochila",
        location: "Biblioteca Pública",
        status: "found",
        date: "18/12/2025",
        imageUrl: null
      }
    };

    // Retorna o item correspondente ou um padrão se não encontrado
    return mockItems[itemId as keyof typeof mockItems] || {
      id: itemId,
      title: "Item Desconhecido",
      description: "Item não encontrado no sistema mock. Verifique o ID.",
      category: "Outro",
      location: "Localização desconhecida",
      status: "lost",
      date: "18/12/2025",
      imageUrl: null
    };
  };

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Verificar cache primeiro
        if (mockCache.has(id)) {
          console.log('Item encontrado no cache:', id);
          setItem(mockCache.get(id));
          setLoading(false);
          return;
        }

        // Usar dados mock diretamente para performance
        console.log('Carregando dados mock para item:', id);
        const mockData = getMockItemData(id);
        setItem(mockData);
        mockCache.set(id, mockData); // Cache para próximas consultas
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
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
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
      <Card className="shadow-lg">
        {item.imageUrl && (
          <Card.Img variant="top" src={item.imageUrl} alt={item.title} />
        )}
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="fw-bold">{item.title}</Card.Title>
            <Badge bg={item.status === "lost" ? "danger" : "success"}>
              {item.status === "lost" ? "Perdido" : "Achado"}
            </Badge>
          </div>
          <Card.Subtitle className="mb-3 text-muted">
            Categoria: {item.category}
          </Card.Subtitle>
          <Card.Text>
            <div className="d-flex align-items-center mb-3">
              {getItemIcon(item.category, item.description)}
              <p className="mb-0">{item.description}</p>
            </div>
            <small className="d-block">Local: {item.location}</small>
            <small className="d-block">Data: {item.date || item.dateFoundOrLost}</small>
          </Card.Text>
        </Card.Body>
      </Card>
      
      {/* Botão para voltar na parte inferior */}
      <div className="text-center mt-4">
        <Button 
          className="btn-secondary"
          size="lg"
          onClick={() => navigate(-1)}
          style={{padding: '10px 20px'}}
        >
          ← Voltar
        </Button>
      </div>
    </Container>
  );
};

export default ItemDetailPage;

