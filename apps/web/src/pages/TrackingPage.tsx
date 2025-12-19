import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Badge, ProgressBar, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { FiDownload, FiCalendar, FiBarChart2, FiTrendingUp, FiShoppingCart } from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import toast from 'react-hot-toast';

interface MonthlyStat {
  month: string;
  found: number;
  lost: number;
}

interface CategoryStat {
  category: string;
  found: number;
  lost: number;
}

interface ReportData {
  totalItems: number;
  foundItems: number;
  lostItems: number;
  boughtItems: number;
  monthlyStats: MonthlyStat[];
  categoryStats: CategoryStat[];
}

const TrackingPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [reportData, setReportData] = useState<ReportData>({
    totalItems: 0,
    foundItems: 0,
    lostItems: 0,
    boughtItems: 0,
    monthlyStats: [],
    categoryStats: []
  });

  // CORREÇÃO: Função handleExportReport organizada corretamente
  const handleExportReport = () => {
    if (reportData.categoryStats.length === 0) {
      toast.error("Não há dados para exportar!");
      return;
    }

    try {
      // Cabeçalho com suporte a acentuação (UTF-8 BOM)
      let csvContent = "\uFEFFCategoria;Encontrados;Perdidos;Total;Taxa de Sucesso\n";

      reportData.categoryStats.forEach(stat => {
        const total = stat.found + stat.lost;
        const rate = total > 0 ? Math.round((stat.found / total) * 100) : 0;
        csvContent += `${stat.category};${stat.found};${stat.lost};${total};${rate}%\n`;
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `relatorio_finderbox_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Relatório gerado com sucesso!", {
        duration: 4000,
        icon: '📊',
      });
    } catch (error) {
      console.error(error);
      toast.error("Falha ao exportar relatório.");
    }
  };

  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const items = querySnapshot.docs.map(doc => doc.data());

        const total = items.length;
        const found = items.filter((i: any) => i.status === 'found' || i.status === 'encontrado').length;
        const lost = items.filter((i: any) => i.status === 'lost' || i.status === 'perdido').length;
        const bought = items.filter((i: any) => i.status === 'bought').length;

        const catMap: { [key: string]: { found: number, lost: number } } = {};
        items.forEach((item: any) => {
          const cat = item.category || "Geral";
          if (!catMap[cat]) catMap[cat] = { found: 0, lost: 0 };
          if (item.status === 'found' || item.status === 'encontrado') catMap[cat].found++;
          if (item.status === 'lost' || item.status === 'perdido') catMap[cat].lost++;
        });

        const categoryStats = Object.keys(catMap).map(cat => ({
          category: cat,
          found: catMap[cat].found,
          lost: catMap[cat].lost
        }));

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const monthMap: { [key: string]: { found: number, lost: number } } = {};

        items.forEach((item: any) => {
          if (item.createdAt) {
            const date = item.createdAt.toDate ? item.createdAt.toDate() : new Date(item.createdAt);
            const monthLabel = monthNames[date.getMonth()];
            if (!monthMap[monthLabel]) monthMap[monthLabel] = { found: 0, lost: 0 };
            if (item.status === 'found' || item.status === 'encontrado') monthMap[monthLabel].found++;
            if (item.status === 'lost' || item.status === 'perdido') monthMap[monthLabel].lost++;
          }
        });

        const monthlyStats = monthNames
          .map(month => ({
            month,
            found: monthMap[month]?.found || 0,
            lost: monthMap[month]?.lost || 0
          }))
          .filter(stat => stat.found > 0 || stat.lost > 0);

        setReportData({
          totalItems: total,
          foundItems: found,
          lostItems: lost,
          boughtItems: bought,
          categoryStats,
          monthlyStats: monthlyStats.length > 0 ? monthlyStats : [{ month: 'Sem dados', found: 0, lost: 0 }]
        });

      } catch (error) {
        console.error("Erro ao processar estatísticas:", error);
      }
    };

    if (user) fetchRealStats();
  }, [user]);

  const successRate = reportData.totalItems > 0 
    ? Math.round((reportData.foundItems / reportData.totalItems) * 100) 
    : 0;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Rastreamento</h1>
      {user ? (
        <>
          <Card className="shadow-sm p-4 mb-4">
            <h2>Rastreamento e Estatísticas</h2>
            <p className="text-muted">Acompanhe o desempenho do FinderBox com métricas detalhadas</p>
          </Card>

          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiBarChart2 className="mb-2" size={24} color="#e0d534" />
                <h4 className="mb-1">{reportData.totalItems}</h4>
                <p className="text-muted mb-0">Total de Itens</p>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiTrendingUp className="mb-2" size={24} color="#28a745" />
                <h4 className="mb-1">{reportData.foundItems}</h4>
                <p className="text-muted mb-0">Encontrados</p>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiCalendar className="mb-2" size={24} color="#dc3545" />
                <h4 className="mb-1">{reportData.lostItems}</h4>
                <p className="text-muted mb-0">Perdidos</p>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiShoppingCart className="mb-2" size={24} color="#6f42c1" />
                <h4 className="mb-1">{reportData.boughtItems}</h4>
                <p className="text-muted mb-0">Comprados</p>
              </Card>
            </Col>
          </Row>

          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Taxa de Sucesso Geral</h5>
                <Badge bg="success">{successRate}%</Badge>
              </div>
              <ProgressBar now={successRate} variant="success" style={{ height: '8px' }} />
            </Card.Body>
          </Card>

          <Row className="mb-4">
            <Col md={12}>
              <h5 className="mb-3">Ações Rápidas</h5>
              <div className="d-flex gap-2">
                <Button className="btn-secondary" onClick={handleExportReport}>
                  <FiDownload className="me-2" />
                  Exportar Relatório
                </Button>
              </div>
            </Col>
          </Row>

          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Estatísticas Mensais</h5>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Encontrados</th>
                    <th>Perdidos</th>
                    <th>Total</th>
                    <th>Taxa de Sucesso</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.monthlyStats.map((stat, index) => {
                    const total = stat.found + stat.lost;
                    const rate = total > 0 ? Math.round((stat.found / total) * 100) : 0;
                    return (
                      <tr key={index}>
                        <td>{stat.month}</td>
                        <td><Badge bg="success">{stat.found}</Badge></td>
                        <td><Badge bg="danger">{stat.lost}</Badge></td>
                        <td>{total}</td>
                        <td>
                          <ProgressBar now={rate} variant="success" style={{ height: '8px' }} label={`${rate}%`} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Estatísticas por Categoria</h5>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Encontrados</th>
                    <th>Perdidos</th>
                    <th>Total</th>
                    <th>Taxa de Sucesso</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.categoryStats.map((stat, index) => {
                    const total = stat.found + stat.lost;
                    const rate = total > 0 ? Math.round((stat.found / total) * 100) : 0;
                    return (
                      <tr key={index}>
                        <td>{stat.category}</td>
                        <td><Badge bg="success">{stat.found}</Badge></td>
                        <td><Badge bg="danger">{stat.lost}</Badge></td>
                        <td>{total}</td>
                        <td>
                          <ProgressBar now={rate} variant="success" style={{ height: '8px' }} label={`${rate}%`} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Container className="py-5 text-center">
          <h2>Faça login para acessar o rastreamento</h2>
          <Button href="/login" className="btn-entrar mt-3">
            Fazer Login
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default TrackingPage;
