import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {WalletComponent} from "./wallet/wallet.component";
import {CostComponent} from "./cost/cost.component";
import {SummaryComponent} from "./summary/summary.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'wallet', component:WalletComponent},
  {path: 'wallet/:id/summary', component:SummaryComponent},
  {path: 'wallet/:id', component:CostComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
