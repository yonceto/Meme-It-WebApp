import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Meme } from './meme'
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  memesUrl: string;

  constructor(private http: HttpClient) { }

  public findAll() : Observable<Meme[]> {
    return this.http.get<Meme[]>(this.memesUrl);
  }

  public save(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>(this.memesUrl, meme);
  }

  public delete(meme: Meme | number) {
    const id = typeof meme === 'number' ? meme : meme.id;
    const url = `${this.memesUrl}/${id}`;
   
    return this.http.delete(url).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  public updateMeme(meme: Meme) {
    const id = meme.id;
    const url = `${this.memesUrl}/${id}`;
    return this.http.put(url, meme).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  public getMeme(id: number): Observable<Meme> {
    const url = `${this.memesUrl}/${id}`;
    return this.http.get<Meme>(url);
  }

  public findClosestSearchTerm(term: string) {
    const url = `${this.memesUrl}/search/${term}`;
    return this.http.get(url, {responseType: 'text' });
  }
}
