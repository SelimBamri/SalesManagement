import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { Observable, combineLatest, map } from 'rxjs';
import { SupplierService } from '../services/supplier.service';
import { ProductService } from '../services/product.service';
import { Supplier } from '../models/supplier';
import { Product } from '../models/product';

@Component({
  selector: 'app-order',
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
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  orders$!: Observable<Order[]>;
  suppliers$!: Observable<Supplier[]>;
  products$!: Observable<Product[]>;
  combined$!: Observable<{ suppliers: Supplier[]; products: Product[] }>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private supplierService: SupplierService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }
    console.log(form.value.id1);
    this.orderService
      .addOrder(
        form.value.id1,
        form.value.id2,
        form.value.up,
        form.value.nu,
        form.value.date
      )
      .subscribe({
        next: (resp) => {
          this.orders$ = this.orderService.getOrders();
          this.showSnackBar('Commande ajoutée".');
        },
        error: (err) => {
          console.error('Adding invoice failed', err);
        },
      });
  }
  ngOnInit(): void {
    this.suppliers$ = this.supplierService.getSuppliers();
    this.products$ = this.productService.getProducts();
    this.orders$ = this.orderService.getOrders();
    this.combined$ = combineLatest([this.suppliers$, this.products$]).pipe(
      map(([suppliers, products]) => ({ suppliers, products }))
    );
  }

  deleteOrder(id: Number): void {
    this.orderService.deleteOrder(id).subscribe({
      next: (resp) => {
        this.orders$ = this.orderService.getOrders();
      },
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
