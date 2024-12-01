import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {ICategory} from "../_models/category";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseUrl + 'categories');
  }

  addCategory(data: {name:string}): Observable<any> {
    return this.http.post(this.baseUrl + 'categories', data);
  }

  getRevenueCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseUrl + 'revenuecategories');
  }

  addRevenueCategory(data: {name:string}): Observable<any> {
    return this.http.post(this.baseUrl + 'revenuecategories', data);
  }
}
