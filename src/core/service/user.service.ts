import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { User } from '../data/model/user';
import { AddUserRequest } from '../data/model/add-user.request';
import { Constants } from '../common/constants';

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
    let s = this.httpClient.post(`${this.usersApiURL}`, user)
    .pipe(map((response: any) => response));
    console.log(s);
    
    return s;
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.usersApiURL}/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.usersApiURL}/${id}`, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.usersApiURL}/${id}`);
  }
}
