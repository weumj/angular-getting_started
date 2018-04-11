import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class ProductService {
    productUrl = "./api/products/products.json";

    constructor(
        private http: HttpClient,
    )
    {
    }

    getProduects(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
            .pipe(
                tap(data => console.log(`All: ${JSON.stringify(data)}`)),
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        console.log(error.message);
        return Observable.throw(error.message);
    }
}