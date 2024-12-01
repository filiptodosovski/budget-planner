import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import { environment } from '../../environments/environment';
import {IExpense, IGroupedExpense} from "../_models/expense";

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = environment.apiUrl

  private dataUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  get dataUpdated$(): Observable<void> {
    return this.dataUpdated.asObservable();
  }

  addExpense(expense: IExpense): Observable<IExpense> {
    return this.http.post<IExpense>(this.baseUrl + 'expense', expense).pipe(
      tap(() => {
        this.dataUpdated.next();
      })
    );
  }

  getGroupedExpenses(): Observable<IGroupedExpense[]> {
    return this.http.get<IGroupedExpense[]>(this.baseUrl + 'expense/grouped');
  }

  deleteExpense(id: number): Observable<IExpense> {
    return this.http.delete<IExpense>(`${this.baseUrl + 'expense'}/${id}`).pipe(
      tap(() => {
        this.dataUpdated.next();
      })
    );
  }

  updateExpense(id: number, expense: IExpense): Observable<IExpense> {
    return this.http.put<IExpense>(`${this.baseUrl + 'expense'}/${id}`, expense).pipe(
      tap(() => {
        this.dataUpdated.next();
      })
    );
  }
}
