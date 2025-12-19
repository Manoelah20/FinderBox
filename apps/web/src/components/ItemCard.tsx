import React from "react";
import { Card, Badge } from "react-bootstrap";
import { getItemIcon } from "../utils/itemIcons";

interface Item {
  id?: string;
  name?: string;
  nome?: string;
  status?: string;
  category?: string;
  categoria?: string;
  descricao?: string;
  date?: string;
}

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const itemName = item.name || item.nome || "Item sem nome";
  const itemDesc = item.descricao || "Descrição não disponível";
  const itemStatus = item.status || "perdido";

  return (
    <Card className="mb-4 h-100">
      <Card.Body className="text-center py-4">
        <div className="mb-3">
          {getItemIcon(item.category || item.categoria || "")}
        </div>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text className="text-muted">{itemDesc}</Card.Text>
        <Badge bg={itemStatus === 'encontrado' ? 'success' : 'danger'}>
          {itemStatus === 'encontrado' ? 'Encontrado' : 'Perdido'}
        </Badge>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
