import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { GunListComponent } from "./gun-list/gun-list.component";
import { BrandListComponent } from "./brand-list/brand-list.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { TypeListComponent } from "./type-list/type-list.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'models', component: GunListComponent},
  {path: 'brands', component: BrandListComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'types', component: TypeListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
