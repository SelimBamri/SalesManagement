import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly API_URL = 'https://localhost:7176/api';
  constructor(private http: HttpClient) {}

  addInvoice(
    actorId: Number,
    productId: Number,
    unitPrice: Number,
    numberOfUnits: Number,
    issueDate: Date
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/invoices`, {
      actorId,
      productId,
      unitPrice,
      numberOfUnits,
      issueDate,
    });
  }

  deleteInvoice(id: Number): Observable<any> {
    return this.http.delete(`${this.API_URL}/invoices/${id}`);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.API_URL}/invoices`).pipe(
      map((invoices: any[]) =>
        invoices.map((invoice) => ({
          id: invoice.id,
          actorName: invoice.actorName,
          productName: invoice.productName,
          issueDate: invoice.issueDate,
          numberOfUnits: invoice.numberOfUnits,
          unitPrice: invoice.unitPrice,
          totalAmount: invoice.totalAmount,
        }))
      )
    );
  }
}
