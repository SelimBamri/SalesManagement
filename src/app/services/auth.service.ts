import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'https://localhost:7063/api';
  authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState$ = this.authStateSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/accounts/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          this.storeToken(response.token);
          this.authStateSubject.next(true);
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.authStateSubject.next(false);
  }

  deleteMyAccount(): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/accounts`);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken: any = this.getDecodedToken();
    if (!decodedToken || !decodedToken.exp) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      this.removeToken();
      this.authStateSubject.next(false);
      return false;
    }
    return true;
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUsername(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
  }

  updateUser(user: User): void {
    this.currentUserSubject.next(user);
  }
}
