import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { CreatePostResponse, GetPostResponse, PostRequest } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class TimelineService extends BaseService {

  constructor(http: HttpClient) {
    super(http)
  }

  public getPosts(): Observable<GetPostResponse> {
    const epochNow = (new Date).getTime();
    const bearerToken = localStorage.getItem('bearerToken');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${bearerToken}` });
    return this.http.get<GetPostResponse>(`${this.baseUrl}/posts/poll?since=${epochNow}`, {
      headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  public async createPost(type: string, text: string, video_url?: string, picture_url?: string): Promise<Observable<CreatePostResponse>> {
    const bearerToken = localStorage.getItem('bearerToken');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${bearerToken}` });
    const requestBody: PostRequest = {
      type,
      text,
      video_url,
      picture_url
    }
    return await this.http.post<CreatePostResponse>(`${this.baseUrl}/posts`, requestBody, {
      headers
    });
  }
}
