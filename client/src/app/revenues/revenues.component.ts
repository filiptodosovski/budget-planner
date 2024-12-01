import { Component, OnInit } from '@angular/core';
import { IRevenue, IRevenueInGrouped, IGroupedRevenue } from "../_models/revenue";
import { RevenueService } from "../_services/revenue.service";
import { CategoryService } from "../_services/category.service";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenues.component.html',
})
export class RevenuesComponent implements OnInit {
  revenues: IGroupedRevenue[] = [];
  isModalOpen = false;
  modalTitle = '';
  currentRevenue: IRevenue = this.initializeRevenue();
  isEditMode = false;
  categories: string[] = [];

  constructor(
    private revenueService: RevenueService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadRevenues();
    this.loadCategories();
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

  loadCategories(): void {
    this.categoryService.getRevenueCategories().pipe(
      catchError(error => {
        console.error('Error loading categories', error);
        return of([]);
      })
    ).subscribe((data) => {
      this.categories = data.map((category) => category.name);
    });
  }

  getRevenueForCategoryAndType(groupedRevenue: IGroupedRevenue, category: string, type: string): IRevenueInGrouped | null {
    return groupedRevenue.revenues?.find(
      (revenue: IRevenueInGrouped) => revenue.category === category && revenue.type === type
    ) || null;
  }

  calculateTotal(groupedRevenue: IGroupedRevenue, type: string): number {
    return groupedRevenue.revenues
      .filter((revenue: IRevenueInGrouped) => revenue.type === type)
      .reduce((sum: number, revenue: IRevenueInGrouped) => sum + revenue.amount, 0);
  }

  addRevenue(): void {
    this.modalTitle = 'Add Revenue';
    this.currentRevenue = this.initializeRevenue();
    this.isModalOpen = true;
    this.isEditMode = false;
  }

  editRevenue(revenue: IRevenueInGrouped, year: number, month: string): void {
    this.modalTitle = 'Edit Revenue';
    this.currentRevenue = { ...revenue, year, month };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  deleteRevenue(id: number): void {
    this.revenueService.deleteRevenue(id).pipe(
      catchError(error => {
        console.error('Error deleting revenue', error);
        return of(null);
      })
    ).subscribe(() => {
      this.loadRevenues();
    });
  }

  deleteBothRevenues(groupedRevenue: IGroupedRevenue, category: string): void {
    const plannedRevenue = this.getRevenueForCategoryAndType(groupedRevenue, category, 'planned');
    const actualRevenue = this.getRevenueForCategoryAndType(groupedRevenue, category, 'actual');

    if (plannedRevenue) {
      this.deleteRevenue(plannedRevenue.id);
    }

    if (actualRevenue) {
      this.deleteRevenue(actualRevenue.id);
    }
  }

  onSave(revenue: IRevenue): void {
    if (revenue.id) {
      this.updateRevenue(revenue);
    } else {
      this.addNewRevenue(revenue);
    }
  }

  private updateRevenue(revenue: IRevenue): void {
    if(revenue.id) {
      this.revenueService.updateRevenue(revenue.id, revenue).pipe(
        catchError(error => {
          console.error('Error updating revenue', error);
          return of(null);
        })
      ).subscribe(() => {
        this.isModalOpen = false;
        this.loadRevenues();
      });
    }
  }

  private addNewRevenue(revenue: IRevenue): void {
    this.revenueService.addRevenue(revenue).pipe(
      catchError(error => {
        console.error('Error adding new revenue', error);
        return of(null);
      })
    ).subscribe(() => {
      this.isModalOpen = false;
      this.loadRevenues();
      this.loadCategories();
    });
  }

  onCancel(): void {
    this.isModalOpen = false;
  }

  private initializeRevenue(): IRevenue {
    return {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      category: '',
      amount: 0.0,
      type: 'actual',
    };
  }
}
