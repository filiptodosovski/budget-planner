import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {IExpense, IGroupedExpense} from "../_models/expense";

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  addExpense(expense: IExpense): Observable<IExpense> {
    return this.http.post<IExpense>(this.baseUrl + 'expense', expense);
  }

  getGroupedExpenses(): Observable<IGroupedExpense[]> {
    return this.http.get<IGroupedExpense[]>(this.baseUrl + 'expense/grouped');
  }

  deleteExpense(id: number): Observable<IExpense> {
    return this.http.delete<IExpense>(`${this.baseUrl + 'expense'}/${id}`);
  }

  updateExpense(id: number, expense: IExpense): Observable<IExpense> {
    return this.http.put<IExpense>(`${this.baseUrl + 'expense'}/${id}`, expense);
  }
}
