import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    _listFilter = 'cart';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    errorMessage: string;

    constructor(
        private productService: ProductService
    ) {
        // this.listFilter = 'cart';
    }

    ngOnInit(): void {
        this.productService.getProduects()
            .subscribe(
                products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                error => this.errorMessage = <any>error,
            );
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Priduct List: ${message}`;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filter: string): IProduct[] {
        const filterBy = filter.toLowerCase();

        return this.products.filter(
            (product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy),
        );
    }
}