export class Invoice {
  constructor(
    public id: Number,
    public actorName: string,
    public productName: string,
    public issueDate: Date,
    public numberOfUnits: Number,
    public unitPrice: Number,
    public totalAmount: Number
  ) {}
}
