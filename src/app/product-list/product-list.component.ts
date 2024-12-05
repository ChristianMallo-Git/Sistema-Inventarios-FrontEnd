import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[];

  constructor(private productsService: ProductService, private router: Router){}
    
    ngOnInit(){
      //Cargamos los productos
      this.getProducts();
    }

    private getProducts(){
      //Consumimos los datos del observable
      this.productsService.getProductsList().subscribe(
        (data=>{
          this.products = data;
        })
      );
    }

    editProduct(id:number){
      this.router.navigate(['edit-product',id]);
    }

    deleteProduct(id: number){
      this.productsService.deleteProduct(id).subscribe(
        {
          next : (data) => this.getProducts(),
          error : (errors) => console.log(errors)
        }
      );
    }
  }