import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    MatSnackBarModule,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }
    console.log(form.value.id1);
    this.userService
      .addUser(
        form.value.email,
        form.value.position,
        form.value.firstName,
        form.value.lastName,
        form.value.password,
        null
      )
      .subscribe({
        next: (resp) => {
          this.users$ = this.userService.getUsers();
          this.showSnackBar('Utilisateur ajouté.');
        },
        error: (err) => {
          console.error('Adding user failed', err);
        },
      });
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
