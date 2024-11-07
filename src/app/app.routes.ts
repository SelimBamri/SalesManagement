import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { SupplierComponent } from './supplier/supplier.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderComponent } from './order/order.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'utilisateurs', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profile', component: MyAccountComponent, canActivate: [authGuard] },
  {
    path: 'modifier-profile',
    component: EditAccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'modifier-mot-de-passe',
    component: EditPasswordComponent,
    canActivate: [authGuard],
  },
  { path: 'produits', component: ProductComponent, canActivate: [authGuard] },
  { path: 'clients', component: ClientComponent, canActivate: [authGuard] },
  {
    path: 'fournisseurs',
    component: SupplierComponent,
    canActivate: [authGuard],
  },
  { path: 'factures', component: InvoiceComponent, canActivate: [authGuard] },
  { path: 'commandes', component: OrderComponent, canActivate: [authGuard] },
];
