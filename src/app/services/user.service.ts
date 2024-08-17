import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:3000/signupUsers';

  constructor(private http: HttpClient) { }

  // Method to check if email is unique
  checkEmailExists(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}`);
  }

  // Method to create a new user
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }

    // Method to verify user credentials
    verifyUser(email: string, password: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`);
    }


}
