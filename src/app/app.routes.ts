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

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'utilisateurs', component: HomeComponent },
  { path: 'profile', component: MyAccountComponent },
  { path: 'modifier-profile', component: EditAccountComponent },
  { path: 'modifier-mot-de-passe', component: EditPasswordComponent },
  { path: 'produits', component: ProductComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'fournisseurs', component: SupplierComponent },
  { path: 'factures', component: InvoiceComponent },
  { path: 'commandes', component: OrderComponent },
];
