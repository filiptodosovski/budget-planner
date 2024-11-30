import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {IExpense} from "../_models/expense";

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  addExpense(expense: IExpense): Observable<IExpense> {
    return this.http.post<IExpense>(this.baseUrl + 'expense', expense);
  }
}
