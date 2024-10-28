import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.authState$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.subscriptions.add(
            this.userService.getMyAccount().subscribe((user) => {
              this.user = user;
            })
          );
        } else {
          this.user = null;
        }
      })
    );
  }
}
