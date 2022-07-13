import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../shared/services/producto.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducto();
  }

  displayedColumns: string[] = [
    'id',
    'nombre',
    'precio',
    'cantidad',
    'categoria',
    'picture',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProductoElemento>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  getProducto() {
    this.productoService.getProducts().subscribe(
      (data: any) => {
        console.log('respuesta producto', data);
        this.procesProducto(data);
      },
      (error: any) => {
        console.log('error en productos', error);
      }
    );
  }
  procesProducto(resp: any) {
    const dataProduct: ProductoElemento[] = [];
    if (resp.metadata[0].code == '00') {
      let listProduct = resp.producto.productos;
      listProduct.forEach((element: ProductoElemento) => {
        //element.categoria = element.categoria.nombre;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductoElemento>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }
  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('producto agregado', 'Exitosamente');
        this.getProducto();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al guardar producto', 'Error');
      }
    });
  }
  //alerta
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  edit(
    id: number,
    nombre: string,
    precio: number,
    cantidad: number,
    categoria: any
  ) {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        categoria: categoria
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('producto editado', 'Exitosamente');
        this.getProducto();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al editar producto', 'Error');
      }
    });
  }
  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {
        id: id, module: "producto"
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('producto eliminado', 'Exitosamente');
        this.getProducto();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al eliminar producto', 'Error');
      }
    });
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
