import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier',
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
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
})
export class SupplierComponent implements OnInit {
  suppliers$!: Observable<Supplier[]>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private supplierService: SupplierService
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }

    this.supplierService.addSupplier(form.value.name).subscribe({
      next: (resp) => {
        this.suppliers$ = this.supplierService.getSuppliers();
        this.showSnackBar('Fournisseur ajouté.');
      },
      error: (err) => {
        console.error('Adding Supplier failed', err);
      },
    });
  }

  onSubmitEdit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }

    this.supplierService
      .updateSupplier(form.value.id, form.value.name2)
      .subscribe({
        next: (resp) => {
          this.suppliers$ = this.supplierService.getSuppliers();
          this.showSnackBar('Fournisseur modifié.');
        },
        error: (err) => {
          this.showSnackBar('Aucun fournisseur avec cet ID.');
          console.error('Updating product failed', err);
        },
      });
  }

  ngOnInit(): void {
    this.suppliers$ = this.supplierService.getSuppliers();
  }

  deleteSupplier(id: Number): void {
    this.supplierService.deleteSupplier(id).subscribe({
      next: (resp) => {
        this.suppliers$ = this.supplierService.getSuppliers();
      },
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
