import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'https://localhost:7176/api';
  constructor(private http: HttpClient) {}
  addUser(
    email: string,
    position: string,
    firstName: string,
    lastName: string,
    password: string,
    profilePhoto: string | null
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/users/register`, {
      firstName,
      lastName,
      position,
      email,
      password,
      profilePhoto,
    });
  }

  getMyAccount(): Observable<User> {
    return this.http.get<any>(`${this.API_URL}/users`).pipe(
      map((char: any) => ({
        firstName: char.firstName,
        lastName: char.lastName,
        position: char.position,
        email: char.email,
        profilePhoto: char.profilePhoto,
      }))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users/all`).pipe(
      map((users: any[]) =>
        users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          position: user.position,
          email: user.email,
          profilePhoto: user.profilePhoto,
        }))
      )
    );
  }

  editMyAccount(
    email: string,
    firstName: string,
    lastName: string,
    position: string,
    profilePhoto: string | null
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/users`, {
      email,
      firstName,
      lastName,
      position,
      profilePhoto,
    });
  }

  editMyPassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/users/password`, {
      currentPassword,
      newPassword,
    });
  }
}
