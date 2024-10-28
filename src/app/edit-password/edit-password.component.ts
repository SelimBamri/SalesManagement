import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    MatSnackBarModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent {
  serverErrors: string[] | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm) {
    this.serverErrors = null;
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }
    if (form.value.newPassword !== form.value.confirmPassword) {
      this.showSnackBar('Les deux mots de passe ne correspondent pas.');
      return;
    }
    this.userService
      .editMyPassword(form.value.oldPassword, form.value.newPassword)
      .subscribe({
        next: (resp) => {
          const newToken = resp?.token;
          if (newToken) {
            this.authService.logout();
            localStorage.setItem('auth_token', newToken);
          }
          this.router.navigate(['/account']);
          this.showSnackBar('Password updated successfully.');
        },
        error: (err) => {
          console.error('Login failed', err);
          this.serverErrors = err.error.errors;
        },
      });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
