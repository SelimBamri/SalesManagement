import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API_URL = 'https://localhost:7176/api';
  constructor(private http: HttpClient) {}

  addClient(name: string): Observable<any> {
    return this.http.post(`${this.API_URL}/clients`, {
      name,
    });
  }

  updateClient(id: Number, name: string): Observable<any> {
    return this.http.put(`${this.API_URL}/clients/${id}`, {
      name,
    });
  }

  deleteClient(id: Number): Observable<any> {
    return this.http.delete(`${this.API_URL}/clients/${id}`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.API_URL}/clients`).pipe(
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
