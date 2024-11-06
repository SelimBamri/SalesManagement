import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly API_URL = 'https://localhost:7176/api';
  constructor(private http: HttpClient) {}

  addSupplier(name: string): Observable<any> {
    return this.http.post(`${this.API_URL}/suppliers`, {
      name,
    });
  }

  updateSupplier(id: Number, name: string): Observable<any> {
    return this.http.put(`${this.API_URL}/suppliers/${id}`, {
      name,
    });
  }

  deleteSupplier(id: Number): Observable<any> {
    return this.http.delete(`${this.API_URL}/suppliers/${id}`);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.API_URL}/suppliers`).pipe(
      map((clients: any[]) =>
        clients.map((client) => ({
          id: client.id,
          name: client.name,
          numberOfExchanges: client.numberOfExchanges,
          exchangeSize: client.exchangeSize,
        }))
      )
    );
  }
}
