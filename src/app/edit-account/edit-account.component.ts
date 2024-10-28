import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    MatSnackBarModule,
    AsyncPipe,
    NgIf,
    NgFor,
  ],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent {
  user$!: Observable<User>;
  url!: string | null;
  serverErrors: string[] | null = null;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  onSubmit(form: NgForm) {
    this.serverErrors = null;
    if (form.invalid) {
      this.showSnackBar('The username and the name are required');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    const password = form.value.password ? form.value.password : null;
    this.userService
      .editMyAccount(
        form.value.email,
        form.value.fName,
        form.value.lName,
        form.value.position,
        this.url
      )
      .subscribe({
        next: (resp) => {
          const newToken = resp?.token;
          if (newToken) {
            this.authService.logout();
            localStorage.setItem('auth_token', newToken);
          }
          this.showSnackBar('Compte modifié avec succès.');
          this.router.navigate(['/account']);
          this.authService.authStateSubject.next(true);
        },
        error: (err) => {
          this.serverErrors = err.error.errors;
        },
      });
  }

  ngOnInit(): void {
    this.user$ = this.userService.getMyAccount();
    this.user$.subscribe({
      next: (user) => {
        if (user.profilePhoto) {
          this.url = 'data:image/jpeg;base64,' + user.profilePhoto;
        }
      },
      error: (err) => {
        console.error('Une erreur est survenue', err);
      },
    });
  }
}
