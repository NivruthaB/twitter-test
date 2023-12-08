import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RegistrationRequest, UserRequest, UserResponse } from '../interfaces/user';
import { TokenResponse } from '../interfaces/token';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(http: HttpClient) {
        super(http)
    }

    public async getUserName(userID: number): Promise<Observable<UserResponse>> {
        const bearerToken = localStorage.getItem('bearerToken');
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${bearerToken}` });
        return await this.http.get<UserResponse>(`${this.baseUrl}/users/${userID}`, { headers });
    }

    public async login(email: string, password: string): Promise<Observable<TokenResponse>> {
        const requestBody: UserRequest = {
            email,
            password
        }
        return await this.http.post<TokenResponse>(`${this.baseUrl}/auth/login`, requestBody);
    }

    public async register(username: string, email: string, password: string): Promise<Observable<TokenResponse>> {
        const requestBody: RegistrationRequest = {
            name: username,
            email: email,
            password: password
        }
        return await this.http.post<TokenResponse>(`${this.baseUrl}/auth/register`, requestBody);
    }
}
