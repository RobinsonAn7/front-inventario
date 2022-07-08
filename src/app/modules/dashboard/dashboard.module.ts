import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HometComponent } from './components/homet/homet.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoriaModule } from '../categoria/categoria.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HometComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoriaModule
  ]
})
export class DashboardModule { }
