import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IExpense} from "../_models/expense";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-expense',
  templateUrl: './expenses.component.html',
})
export class ExpenseComponent implements OnInit {
  expenses: any[] = [];
  isModalOpen: boolean = false;
  modalTitle: string = '';
  currentExpense: any = {};
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.http.get<any[]>(this.baseUrl + 'expense').subscribe((data) => {
      this.expenses = data;
    });
  }

  addExpense(): void {
    this.modalTitle = 'Add Expense';
    this.currentExpense = {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      category: 'Food',
      amount: 0.0,
      type: 'actual',
    };
    this.isModalOpen = true;
  }

  editExpense(expense: any): void {
    this.modalTitle = 'Edit Expense';
    this.currentExpense = { ...expense };
    this.isModalOpen = true;
  }

  deleteExpense(id: number): void {
    this.http.delete(`/api/expenses/${id}`).subscribe(() => this.loadExpenses());
  }

  onSave(expense: IExpense): void {
    if (expense.id) {
      this.http.put(`/api/expense/${expense.id}`, expense).subscribe(() => {
        this.isModalOpen = false;
        this.loadExpenses();
      });
    } else {
      this.http.post(this.baseUrl + 'expense', expense).subscribe(() => {
        this.isModalOpen = false;
        this.loadExpenses();
      });
    }
  }

  onCancel(): void {
    this.isModalOpen = false;
  }
}
