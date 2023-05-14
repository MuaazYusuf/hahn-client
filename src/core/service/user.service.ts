import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Constants } from '../common/constants';
import { AddUserRequest } from '../data/model/add-user.request';
import { UpdateUserRequest } from '../data/model/update-user.request';
import { User } from '../data/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private usersApiURL = Constants.USERS_API_URL;

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.usersApiURL}`);
  }

  createUser(user: AddUserRequest): Observable<User> {
    return this.httpClient.post(`${this.usersApiURL}`, user)
      .pipe(map((response: any) => response.data));
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.usersApiURL}/${id}`);
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<User> {
    return this.httpClient.put(`${this.usersApiURL}/${id}`, user).pipe(map((response: any) => response.data));
  }

  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.usersApiURL}/${id}`);
  }
}
