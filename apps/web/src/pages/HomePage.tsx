// C:/.../FinderBox/apps/web/src/views/HomePage.tsx

import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import useFirestore from "../hooks/useFirestore";

// Importações dos Componentes
import SearchForm from "../components/SearchForm";
import SearchResults from "./SearchResults"; 
import HeroSection from "../components/HeroSection";
import FeaturedItems from "../components/FeaturedItems";


const HomePage = () => { 
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const { searchItems } = useFirestore();

    // Função handleSearch real usando Firebase
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
                collectionName: 'items',
                term,
                filterField: 'name'
            });
            setSearchResults(results);
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
                    {/* 🚨 TEXTO ALTERADO AQUI */}
                    Busque Suas Encomendas ou Reporte Itens Perdidos. 
                </h1>

                <p className="text-center text-muted mb-4 fs-5">
                    {/* 🚨 TEXTO ALTERADO AQUI */}
                    Seu ponto de encontro para rastreamento de encomendas e itens achados. Use a busca
                    abaixo para começar.
                </p>

                <div className="p-4 bg-white shadow-lg rounded-4 mb-4">
                    <SearchForm onSearch={handleSearch} />
                </div>
            </div>

            <hr className="my-5" />

            {loading ? (
                <div className="mt-5 pt-5 text-center d-flex flex-column align-items-center">
                    <Spinner animation="border" variant="primary" className="mb-4"/>
                    <p className="mt-3 text-primary fw-bold fs-5">
                        Buscando resultados...
                    </p>
                    <small className="text-muted">Aguarde um momento.</small>
                </div>
            ) : hasSearched ? (
                <SearchResults results={searchResults} />
            ) : (
                <FeaturedItems />
            )}
        </Container>
    );
};

export default HomePage;