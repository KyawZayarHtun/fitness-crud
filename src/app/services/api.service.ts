import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "http://localhost:3000/enquiry"

  constructor(private http: HttpClient) { }

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  getRegistration() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  findRegistrationById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  updateRegistration(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistration(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }





}
