import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = 'https://localhost:7176/api';
  constructor(private http: HttpClient) {}

  addProduct(
    name: string,
    description: string,
    reference: string
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/product`, {
      name,
      description,
      reference,
    });
  }

  updateProduct(
    id: Number,
    name: string,
    description: string,
    reference: string
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/product/${id}`, {
      name,
      description,
      reference,
    });
  }

  deleteProduct(id: Number): Observable<any> {
    return this.http.delete(`${this.API_URL}/product/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/product`).pipe(
      map((products: any[]) =>
        products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          reference: product.reference,
          numberOfSoldUnits: product.numberOfSoldUnits,
          numberOfBoughtUnits: product.numberOfBoughtUnits,
          totalCost: product.totalCost,
          totalProfit: product.totalProfit,
          balance: product.balance,
        }))
      )
    );
  }
  getProductById(id: Number): Observable<Product> {
    return this.http.get<any>(`${this.API_URL}/users/${id}`).pipe(
      map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        reference: product.reference,
        numberOfSoldUnits: product.numberOfSoldUnits,
        numberOfBoughtUnits: product.numberOfBoughtUnits,
        totalCost: product.totalCost,
        totalProfit: product.totalProfit,
        balance: product.balance,
      }))
    );
  }
}
