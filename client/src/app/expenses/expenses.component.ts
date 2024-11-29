import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense',
  templateUrl: './expenses.component.html',
})
export class ExpenseComponent implements OnInit {
  expenses: any[] = [];
  isModalOpen: boolean = false;
  modalTitle: string = '';
  currentExpense: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.http.get<any[]>('/api/expenses').subscribe((data) => {
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

  onSave(expense: any): void {
    if (expense.id) {
      this.http.put(`/api/expenses/${expense.id}`, expense).subscribe(() => {
        this.isModalOpen = false;
        this.loadExpenses();
      });
    } else {
      this.http.post('/api/expenses', expense).subscribe(() => {
        this.isModalOpen = false;
        this.loadExpenses();
      });
    }
  }

  onCancel(): void {
    this.isModalOpen = false;
  }
}
