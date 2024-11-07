import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Observable, combineLatest, map } from 'rxjs';
import { ClientService } from '../services/client.service';
import { ProductService } from '../services/product.service';
import { Client } from '../models/client';
import { Product } from '../models/product';

@Component({
  selector: 'app-invoice',
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
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  clients$!: Observable<Client[]>;
  products$!: Observable<Product[]>;
  combined$!: Observable<{ clients: Client[]; products: Product[] }>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private clientService: ClientService,
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }
    console.log(form.value.id1);
    this.invoiceService
      .addInvoice(
        form.value.id1,
        form.value.id2,
        form.value.up,
        form.value.nu,
        form.value.date
      )
      .subscribe({
        next: (resp) => {
          this.invoices$ = this.invoiceService.getInvoices();
          this.showSnackBar('Facture ajouté.');
        },
        error: (err) => {
          console.error('Adding invoice failed', err);
        },
      });
  }

  ngOnInit(): void {
    this.clients$ = this.clientService.getClients();
    this.products$ = this.productService.getProducts();
    this.invoices$ = this.invoiceService.getInvoices();
    this.combined$ = combineLatest([this.clients$, this.products$]).pipe(
      map(([clients, products]) => ({ clients, products }))
    );
  }

  deleteInvoice(id: Number): void {
    this.invoiceService.deleteInvoice(id).subscribe({
      next: (resp) => {
        this.invoices$ = this.invoiceService.getInvoices();
      },
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
