import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
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
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }

    this.productService
      .addProduct(form.value.name, form.value.description, form.value.ref)
      .subscribe({
        next: (resp) => {
          this.products$ = this.productService.getProducts();
          this.showSnackBar('Produit ajouté.');
        },
        error: (err) => {
          console.error('Adding product failed', err);
        },
      });
  }

  onSubmitEdit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('Tous les champs sont requis.');
      return;
    }

    this.productService
      .updateProduct(
        form.value.id,
        form.value.name2,
        form.value.description2,
        form.value.ref2
      )
      .subscribe({
        next: (resp) => {
          this.products$ = this.productService.getProducts();
          this.showSnackBar('Produit modifié.');
        },
        error: (err) => {
          this.showSnackBar('Aucun produit avec cet ID.');
          console.error('Updating product failed', err);
        },
      });
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  deleteProduct(id: Number): void {
    this.productService.deleteProduct(id).subscribe();
    this.products$ = this.productService.getProducts();
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
