import { Component, OnInit } from '@angular/core';
import { IExpense, IExpenseInGrouped, IGroupedExpense } from "../_models/expense";
import { ExpenseService } from "../_services/expense.service";
import { CategoryService } from "../_services/category.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {IGroupedRevenue, IRevenueInGrouped} from "../_models/revenue";
import {RevenueService} from "../_services/revenue.service";

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
})
export class TotalComponent implements OnInit {
  expenses: IGroupedExpense[] = [];
  revenues: IGroupedRevenue[] = [];
  revenueCategories: string[] = [];
  categories: string[] = [];

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private revenueService: RevenueService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadExpenses();
    this.loadCategories();
    this.loadRevenues();
    this.loadRevenueCategories();

    this.revenueService.dataUpdated$.subscribe(() => {
      this.loadRevenues();
    });
    this.expenseService.dataUpdated$.subscribe(() => {
      this.loadExpenses();
    });
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

  loadRevenues(): void {
    this.revenueService.getGroupedRevenues().pipe(
      catchError(error => {
        console.error('Error loading revenues', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.revenues = data;
    });
  }

  loadRevenueCategories(): void {
    this.categoryService.getRevenueCategories().pipe(
      catchError(error => {
        console.error('Error loading categories', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.revenueCategories = data.map((category) => category.name);
    });
  }

  getExpenseForCategoryAndType(groupedExpense: IGroupedExpense, category: string, type: string): IExpenseInGrouped | null {
    return groupedExpense.expenses?.find(
      (expense: IExpenseInGrouped) => expense.category === category && expense.type === type
    ) || null;
  }

  calculateTotalExpense(groupedExpense: IGroupedExpense, type: string): number {
    return groupedExpense.expenses
      .filter((expense: IExpenseInGrouped) => expense.type === type)
      .reduce((sum: number, expense: IExpenseInGrouped) => sum + expense.amount, 0);
  }

  getRevenueForCategoryAndType(groupedRevenue: IGroupedRevenue, category: string, type: string): IRevenueInGrouped | null {
    return groupedRevenue.revenues?.find(
      (revenue: IRevenueInGrouped) => revenue.category === category && revenue.type === type
    ) || null;
  }

  calculateTotalRevenue(groupedRevenue: IGroupedRevenue, type: string): number {
    return groupedRevenue.revenues
      .filter((revenue: IRevenueInGrouped) => revenue.type === type)
      .reduce((sum: number, revenue: IRevenueInGrouped) => sum + revenue.amount, 0);
  }

  calculateOverallBalanceForGrouped(type: string, groupedRevenue: any): number {
    const totalRevenue = this.calculateTotalRevenue(groupedRevenue, type);
    const totalExpenses = this.expenses.reduce((sum, groupedExpense) => {
      return sum + this.calculateTotalExpense(groupedExpense, type);
    }, 0);

    return totalRevenue - totalExpenses;
  }
}
