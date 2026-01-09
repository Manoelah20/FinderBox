import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Badge, ProgressBar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import ItemCard from "../components/ItemCard";
import { FiPlus, FiSearch, FiHome } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Item } from "../types/Item";
import { User } from "firebase/auth";

const Dashboard: React.FC = () => {
  const [user, loading, error] = useAuthState(auth) as [User | null, boolean, Error | undefined];
  const [itens, setItens] = useState<Item[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    encontrados: 0,
    perdidos: 0,
    recentes: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const itemsRef = collection(db, "items");
        const q = query(itemsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const data: Item[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];

        setItens(data);

        const total = data.length;
        const encontrados = data.filter(
          (item) => item.status === "encontrado" || item.status === "found"
        ).length;
        const perdidos = data.filter(
          (item) => item.status === "perdido" || item.status === "lost"
        ).length;

        const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
        const recentes = data.filter((item) => {
          const itemTime = (item.createdAt as Timestamp)?.toMillis?.() ?? 0;
          return itemTime > threeDaysAgo;
        }).length;

        setStats({ total, encontrados, perdidos, recentes });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (user) {
      fetchRealData();
    }
  }, [user]);

  const successRate =
    stats.total > 0 ? Math.round((stats.encontrados / stats.total) * 100) : 0;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Dashboard</h1>
      {user ? (
        <>
          <Card className="shadow-sm p-4 mb-4 border-0">
            <h2>Bem-vindo, {user.displayName || user.email}!</h2>
            <p className="text-muted">
              Aqui você verá suas métricas e atividades reais do FinderBox.
            </p>
          </Card>

          {/* Cards de Métricas */}
          <Row className="mb-4">{/* ... seus cards de métricas ... */}</Row>

          {/* Barra de Progresso */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Taxa de Recuperação</h5>
                <Badge bg="success">{successRate}%</Badge>
              </div>
              <ProgressBar
                now={successRate}
                variant="success"
                style={{ height: "10px" }}
                animated
              />
            </Card.Body>
          </Card>

          {/* Botões de Ação */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            <Button className="btn-entrar px-4" onClick={() => navigate("/add-item")}>
              <FiPlus className="me-2" /> Novo Item
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/search")}>
              <FiSearch className="me-2" /> Buscar
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/tracking")}>
              <BsGraphUp className="me-2" /> Relatórios
            </Button>
          </div>

          {/* Lista de Itens Recentes */}
          <h5 className="mb-3">Últimas Atividades</h5>
          <Row>
            {itens.length > 0 ? (
              itens.map((item) => (
                <Col md={4} key={item.id} className="mb-4">
                  <ItemCard item={item} />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-muted">Nenhum item cadastrado ainda.</p>
              </Col>
            )}
          </Row>

          {/* Botão de voltar ao início também disponível para usuários logados */}
          <div className="text-center mt-4">
            <Button className="btn-home" onClick={() => navigate("/")}>
              <FiHome className="me-2" />
              Início
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">Faça login para acessar seu Dashboard.</p>
          <Button onClick={() => navigate("/login")}>Ir para Login</Button>

          {/* Botão de voltar ao início */}
            <div className="btn-home-fixed">
              <Button className="btn-home" size="lg" onClick={() => navigate("/")}>
                <FiHome className="me-2" />
                Início
              </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;



