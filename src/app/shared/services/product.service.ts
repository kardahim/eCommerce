import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private file_path = 'data/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.file_path);
  }
}
