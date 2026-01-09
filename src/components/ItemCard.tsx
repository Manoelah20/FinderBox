import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { getItemIcon } from "../utils/itemIcons";
import { Item } from "../types/Item";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const itemName = item.name || item.nome || "Item sem nome";
  const itemDesc = item.descricao || "Descrição não disponível";
  const itemStatus = item.status || "perdido";

  return (
    <Card className="mb-4 h-100 shadow-sm">
      {item.imageUrl && (
        <Card.Img
          variant="top"
          src={item.imageUrl}
          alt={`Imagem do item ${itemName}`}
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}
      <Card.Body className="text-center py-4">
        <div className="mb-3">{getItemIcon(item.category || item.categoria || "")}</div>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text className="text-muted">{itemDesc}</Card.Text>
        <Badge pill bg={itemStatus === "encontrado" ? "success" : "danger"}>
          {itemStatus === "encontrado" ? "Encontrado" : "Perdido"}
        </Badge>
        <div className="mt-3">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={() => navigate(`/item/${item.id}`)}
          >
            Ver detalhes
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;

