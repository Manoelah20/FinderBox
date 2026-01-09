import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import useFirestore from "../hooks/useFirestore";
import SearchResults from "../pages/SearchResults";
import { Item } from "../types/Item"; // importando tipo global
import { FiHome } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import SearchForm from "../components/SearchForm";
import HeroSection from "../components/HeroSection";
import FeaturedItems from "../components/FeaturedItems";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { searchItems } = useFirestore();

  const handleSearch = async (term: string, filter: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    setLoading(true);

    try {
      const results = await searchItems({
        collectionName: "items",
        term,
        filterField: "name",
      });
      setSearchResults(results as Item[]);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <HeroSection />
      <div className="my-5 pt-3">
        <h1 className="text-center fw-bold text-dark mb-4">
          Busque Suas Encomendas ou Reporte Itens Perdidos.
        </h1>
        <p className="text-center text-muted mb-4 fs-5">
          Seu ponto de encontro para rastreamento de encomendas e itens achados.
          Use a busca abaixo para começar.
        </p>
        <div className="p-4 bg-white shadow-lg rounded-4 mb-4">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      <hr className="my-5" />
      {loading ? (
        <div className="mt-5 pt-5 text-center d-flex flex-column align-items-center">
          <Spinner animation="border" variant="primary" className="mb-4" />
          <p className="mt-3 text-primary fw-bold fs-5">Buscando resultados...</p>
          <small className="text-muted">Aguarde um momento.</small>
        </div>
      ) : hasSearched ? (
        <SearchResults results={searchResults} />
      ) : (
        <FeaturedItems />
      )}
<div className="btn-home-fixed">
  <Button className="btn-home" onClick={() => navigate("/")}>
    <FiHome className="me-2" /> Início
  </Button>
</div>

    </Container>
  );
};

export default HomePage;
