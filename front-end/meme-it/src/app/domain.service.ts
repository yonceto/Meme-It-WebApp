import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from './domain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private domainsUrl='https://meme-it-platform-service-api.herokuapp.com/'

  constructor(private http: HttpClient) { }

  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.domainsUrl + "domain");
  }
}
