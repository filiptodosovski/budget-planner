import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Months} from "../_models/months";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class MonthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMonths(): Observable<Months> {
    return this.http.get<Months>(this.baseUrl + 'month');
  }
}
