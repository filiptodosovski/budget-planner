import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Can be removed if not used
})
export class HomeComponent implements OnInit {
  userName: string | null = '';

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userName = parsedUser.userName
    }
  }

  logout(): void {
    this.accountService.logout()
    this.router.navigate(['/login']);
  }
}
