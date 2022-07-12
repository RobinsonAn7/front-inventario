import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HometComponent } from './components/homet/homet.component';
import { CategoriaComponent } from '../categoria/components/categoria/categoria.component';
import { ProductComponent } from '../product/product/product.component';

const Childroutes: Routes = [
    { path: '', component: HometComponent},
    { path: 'home', component: HometComponent },
    { path: 'categoria', component: CategoriaComponent },
    { path: 'producto', component: ProductComponent }
]

@NgModule({
    imports: [RouterModule.forChild(Childroutes)],
    exports: [RouterModule],
   
})
export class RouterChildModule { }
