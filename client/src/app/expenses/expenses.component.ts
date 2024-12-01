import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExpense, IExpenseInGrouped, IGroupedExpense } from "../_models/expense";
import { environment } from "../../environments/environment";
import { ExpenseService } from "../_services/expense.service";
import { CategoryService } from "../_services/category.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-expense',
  templateUrl: './expenses.component.html',
})
export class ExpenseComponent implements OnInit {
  expenses: IGroupedExpense[] = [];
  isModalOpen = false;
  modalTitle = '';
  currentExpense: IExpense = this.initializeExpense();
  isEditMode = false;
  categories: string[] = [];

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadExpenses();
    this.loadCategories();
  }

  loadExpenses(): void {
    this.expenseService.getGroupedExpenses().pipe(
      catchError(error => {
        console.error('Error loading expenses', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.expenses = data
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().pipe(
      catchError(error => {
        console.error('Error loading categories', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.categories = data.map((category) => category.name);
    });
  }

  getExpenseForCategoryAndType(groupedExpense: IGroupedExpense, category: string, type: string): IExpenseInGrouped | null {
    return groupedExpense.expenses?.find(
      (expense: IExpenseInGrouped) => expense.category === category && expense.type === type
    ) || null;
  }

  calculateTotal(groupedExpense: IGroupedExpense, type: string): number {
    return groupedExpense.expenses
      .filter((expense: IExpenseInGrouped) => expense.type === type)
      .reduce((sum: number, expense: IExpenseInGrouped) => sum + expense.amount, 0);
  }

  addExpense(): void {
    this.modalTitle = 'Add Expense';
    this.currentExpense = this.initializeExpense();
    this.isModalOpen = true;
    this.isEditMode = false;
  }

  editExpense(expense: IExpenseInGrouped, year: number, month: string): void {
    this.modalTitle = 'Edit Expense';
    console.log(expense)
    this.currentExpense = { ...expense, year, month };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).pipe(
      catchError(error => {
        console.error('Error deleting expense', error);
        return of(null);
      })
    ).subscribe(() => {
      this.loadExpenses();
    });
  }

  deleteBothExpenses(groupedExpense: IGroupedExpense, category: string): void {
    const plannedExpense = this.getExpenseForCategoryAndType(groupedExpense, category, 'planned');
    const actualExpense = this.getExpenseForCategoryAndType(groupedExpense, category, 'actual');

    if (plannedExpense) {
      this.deleteExpense(plannedExpense.id);
    }

    if (actualExpense) {
      this.deleteExpense(actualExpense.id);
    }
  }

  onSave(expense: IExpense): void {
    console.log(expense);
    if (expense.id) {
      this.updateExpense(expense);
    } else {
      this.addNewExpense(expense);
    }
  }

  private updateExpense(expense: IExpense): void {
   if(expense.id) {
     this.expenseService.updateExpense(expense.id, expense).pipe(
       catchError(error => {
         console.error('Error updating expense', error);
         return of(null);
       })
     ).subscribe(() => {
       this.isModalOpen = false;
       this.loadExpenses();
     });
   }
  }

  private addNewExpense(expense: IExpense): void {
    this.expenseService.addExpense(expense).pipe(
      catchError(error => {
        console.error('Error adding new expense', error);
        return of(null);
      })
    ).subscribe(() => {
      this.isModalOpen = false;
      this.loadExpenses();
      this.loadCategories()
    });
  }

  onCancel(): void {
    this.isModalOpen = false;
  }

  private initializeExpense(): IExpense {
    return {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      category: 'Food',
      amount: 0.0,
      type: 'actual',
    };
  }
}
