export class Product {
  constructor(
    public id: Number,
    public name: string,
    public description: string,
    public reference: string,
    public numberOfSoldUnits: Number,
    public numberOfBoughtUnits: Number,
    public totalCost: Number,
    public totalProfit: Number,
    public balance: Number
  ) {}
}
