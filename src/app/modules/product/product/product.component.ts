import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../shared/services/producto.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productoService: ProductoService ) { }

  ngOnInit(): void {
    this.getProducto();
  }

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'categoria','picture', 'actions'];
  dataSource = new MatTableDataSource<ProductoElemento>();
  
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  getProducto(){
    this.productoService.getProducts().subscribe((data:any) =>{
      console.log(
        "respuesta producto",data);
        this.procesProducto(data);
    },(error:any)=>{
      console.log("error en productos",error);
    })
  }
  procesProducto(resp: any) {
    const dataProduct: ProductoElemento[] = [];
    if (resp.metadata[0].code == '00') {
      let listProduct = resp.producto.productos;
      listProduct.forEach((element: ProductoElemento) => {
      element.categoria = element.categoria.nombre;
      element.picture = 'data:image/jpeg;base64,'+element.picture;
      dataProduct.push(element);
      });

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductoElemento>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

}

export interface ProductoElemento {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria: any;
  picture: any;
}
