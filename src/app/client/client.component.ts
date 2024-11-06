import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
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
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  clients$!: Observable<Client[]>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private clientService: ClientService
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }

    this.clientService.addClient(form.value.name).subscribe({
      next: (resp) => {
        this.clients$ = this.clientService.getClients();
        this.showSnackBar('Client ajouté.');
      },
      error: (err) => {
        console.error('Adding Client failed', err);
      },
    });
  }

  onSubmitEdit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }

    this.clientService.updateClient(form.value.id, form.value.name2).subscribe({
      next: (resp) => {
        this.clients$ = this.clientService.getClients();
        this.showSnackBar('Client modifié.');
      },
      error: (err) => {
        this.showSnackBar('Aucun client avec cet ID.');
        console.error('Updating product failed', err);
      },
    });
  }

  ngOnInit(): void {
    this.clients$ = this.clientService.getClients();
  }

  deleteClient(id: Number): void {
    this.clientService.deleteClient(id).subscribe({
      next: (resp) => {
        this.clients$ = this.clientService.getClients();
      },
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
