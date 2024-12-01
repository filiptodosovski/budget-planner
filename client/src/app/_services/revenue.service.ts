import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import { environment } from '../../environments/environment';
import {IGroupedRevenue, IRevenue} from "../_models/revenue";

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private baseUrl = environment.apiUrl

  private dataUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  get dataUpdated$(): Observable<void> {
    return this.dataUpdated.asObservable();
  }

  addRevenue(revenue: IRevenue): Observable<IRevenue> {
    return this.http.post<IRevenue>(this.baseUrl + 'revenue', revenue).pipe(
      tap(() => {
        this.dataUpdated.next();
      })
    );
  }

  getGroupedRevenues(): Observable<IGroupedRevenue[]> {
    return this.http.get<IGroupedRevenue[]>(this.baseUrl + 'revenue/grouped');
  }

  deleteRevenue(id: number): Observable<IRevenue> {
    return this.http.delete<IRevenue>(`${this.baseUrl + 'revenue'}/${id}`).pipe(
      tap(() => {
        this.dataUpdated.next();
      })
    );
  }

  updateRevenue(id: number, revenue: IRevenue): Observable<IRevenue> {
    return this.http.put<IRevenue>(`${this.baseUrl + 'revenue'}/${id}`, revenue).pipe(
      tap(() => {
        this.dataUpdated.next();
      })
    );
  }
}
