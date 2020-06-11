import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Contacto } from '../components/agenda/agenda.component';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendaServiceService {
  agenda: any[] = [];
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://localhost:44349/api/contacto`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get(url, { headers });
  }

  getAgenda() {
    const url = `https://localhost:44349/api/contacto`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get(url, { headers });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error}`;
    } else {
      // server-side error

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  postAgenda(contacto: Contacto) {
    const url = `https://localhost:44349/api/contacto`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.post(url, contacto, { headers }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.handleError)
    );
  }
}
