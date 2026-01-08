import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { NewsletterSubscription, NewsletterResponse } from '../../models/Newsletter/newsletter.model';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private apiUrl = `${environment.apiUrl}/newsletter/subscribe`;
  constructor(private http: HttpClient) { }

  subscribe(data: NewsletterSubscription): Observable<NewsletterResponse> {
    return this.http.post<NewsletterResponse>(this.apiUrl, data);
  }
}