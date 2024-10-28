import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import * as feather from 'feather-icons';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  ngAfterViewInit(): void {
    feather.replace();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.showSnackBar('Utilisateur déconnecté.');
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
