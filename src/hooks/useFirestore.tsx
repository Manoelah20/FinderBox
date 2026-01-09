// src/hooks/useFirestore.ts
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Item } from "../types/Item";

interface SearchParams {
  collectionName: string;
  term: string;
  filterField: string;
}

const useFirestore = () => {
  const searchItems = async ({
    collectionName,
    term,
    filterField,
  }: SearchParams): Promise<Item[]> => {
    try {
      const q = query(
        collection(db, collectionName),
        where(filterField, ">=", term),
        where(filterField, "<=", term + "\uf8ff") // busca prefixada
      );

      const querySnapshot = await getDocs(q);

      const results: Item[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Item[];

      return results;
    } catch (error) {
      console.error("Erro ao buscar itens no Firestore:", error);
      return [];
    }
  };

  return { searchItems };
};

export default useFirestore;
