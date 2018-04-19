import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductGuardService } from './product-guard.service';
import { ProductListComponent } from './product-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        canActivate: [ProductGuardService],
      },
  ]),
  ],
  declarations: [],
  exports: [
    RouterModule,
  ]
})
export class ProductRoutingModule { }
