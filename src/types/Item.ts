export interface Item {
  id: string;
  name?: string;
  nome?: string;
  status?: "perdido" | "encontrado";
  category?: string;
  categoria?: string;
  descricao?: string;
  date?: string;
  imageUrl?: string;
}
