import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {IGroupedRevenue, IRevenue} from "../_models/revenue";

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  addRevenue(revenue: IRevenue): Observable<IRevenue> {
    return this.http.post<IRevenue>(this.baseUrl + 'revenue', revenue);
  }

  getGroupedRevenues(): Observable<IGroupedRevenue[]> {
    return this.http.get<IGroupedRevenue[]>(this.baseUrl + 'revenue/grouped');
  }

  deleteRevenue(id: number): Observable<IRevenue> {
    return this.http.delete<IRevenue>(`${this.baseUrl + 'revenue'}/${id}`);
  }

  updateRevenue(id: number, revenue: IRevenue): Observable<IRevenue> {
    return this.http.put<IRevenue>(`${this.baseUrl + 'revenue'}/${id}`, revenue);
  }
}
