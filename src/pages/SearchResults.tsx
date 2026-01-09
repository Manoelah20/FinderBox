import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { Item } from "../types/Item";

interface SearchResultsProps {
  results?: Item[]; // torna opcional
}

const SearchResults: React.FC<SearchResultsProps> = ({ results = [] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (results.length === 1) {
      navigate(`/item/${results[0].id}`);
    }
  }, [results, navigate]);

  if (results.length === 0) {
    return (
      <div className="finderbox-empty text-center p-4">
        <h3 className="text-secondary">Nenhum item encontrado.</h3>
        <p>Você ainda não cadastrou nenhum item.</p>
        <p>
          Clique em <strong>"+ Novo Item"</strong> para começar a registrar suas
          atividades e acompanhar suas métricas aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="row">
      {results.map((item) => (
        <div key={item.id} className="col-md-4 mb-4">
          <ItemCard item={item} />
          <div className="text-center mt-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              Ver detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

