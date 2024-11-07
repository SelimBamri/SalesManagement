import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly API_URL = 'https://localhost:7176/api';
  constructor(private http: HttpClient) {}
  addOrder(
    actorId: Number,
    productId: Number,
    unitPrice: Number,
    numberOfUnits: Number,
    issueDate: Date
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/orders`, {
      actorId,
      productId,
      unitPrice,
      numberOfUnits,
      issueDate,
    });
  }

  deleteOrder(id: Number): Observable<any> {
    return this.http.delete(`${this.API_URL}/orders/${id}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/orders`).pipe(
      map((orders: any[]) =>
        orders.map((order) => ({
          id: order.id,
          actorName: order.actorName,
          productName: order.productName,
          issueDate: order.issueDate,
          numberOfUnits: order.numberOfUnits,
          unitPrice: order.unitPrice,
          totalAmount: order.totalAmount,
        }))
      )
    );
  }
}
