import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ProductCrudService} from "../../service/crud/product-crud.service";
import {ProductModel} from "../../model/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: MatTableDataSource<ProductModel>;
  pageSizeOption = [5, 3, 12];
  NB_OF_ELEMENT_TO_PRINT = this.pageSizeOption[0];
  displayedColumns: string[] = ['name', 'description', 'unitPrice', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private router:Router,
              private productCrud: ProductCrudService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productCrud.getAll().subscribe(
      (products: any) => {
        console.log(products);
        this.products = new MatTableDataSource<ProductModel>(products.results);
        this.products.paginator = this.paginator;
      },
      error => {
        alert('Erreur lors du chargement des produits');
        console.log(error);
      }
    );
  }

  onDetails(product) {
    console.log(product.id);
    return this.router.navigate(['/main/product-details', product.id]);
  }

  onDelete(product: ProductModel) {
    if(confirm('Are you sure to delete the product '+product.name+ ' ?')) {
      this.productCrud.delete(product.id).subscribe(
        (response)=> {
          this.loadProducts();
        },
        error => {
          alert('Echec de la suppression du Produit');
          console.log(error);
        }
      );
    }
  }

  onSizeChange(pe : PageEvent) {
    this.NB_OF_ELEMENT_TO_PRINT = pe.pageSize;
  }

}
