export class Produto {
  constructor(
    public id: number,
    public nome: string,
    public valor: number,
    public categoria: string // Adiciona a categoria
  ) {}
}
