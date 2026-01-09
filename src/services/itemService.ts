// src/services/itemService.ts
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { gerarImagem } from "./imageGenerator";

export async function cadastrarItem(item: { nome: string; descricao: string; categoria: string }) {
  // Gera imagem automática com base na descrição
  const imagemUrl = await gerarImagem(item.descricao);

  // Salva no Firestore
  await addDoc(collection(db, "itens"), {
    ...item,
    imagem: imagemUrl,
    status: "Perdido",
    data: new Date().toISOString()
  });
}
