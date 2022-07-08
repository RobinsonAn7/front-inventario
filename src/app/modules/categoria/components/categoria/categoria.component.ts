import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoriaComponent } from '../new-categoria/new-categoria.component';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCategoria();
  }

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource<CategoriaElement>();

  getCategoria() {
    this.categoriaService.getCategoria().subscribe(
      (data) => {
        console.log('respuesta categoria', data);
        this.procesCategoria(data);
      },
      (error: any) => {
        console.log('Error: ', error);
      }
    );
  }
  procesCategoria(resp: any) {
    const dataCategoria: CategoriaElement[] = [];
    if (resp.metadata[0].code == '00') {
      let listCategoria = resp.categoriaResponse.categoria;
      listCategoria.forEach((element: CategoriaElement) => {
        dataCategoria.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoriaElement>(dataCategoria);
    }
  }
//metodo modulo de formulario agregar categoria
  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoriaComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('categoria agregada', 'Exitosamente');
        this.getCategoria();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error', 'Error');
      }
    });
  }
// metodo editar
  edit(id: number, nombre: string, descripcion: string) {
    const dialogRef = this.dialog.open(NewCategoriaComponent, {
      width: '450px',
      data: { id: id, nombre: nombre, descripcion: descripcion },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('categoria actulizada', 'Exitosamente');
        this.getCategoria();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error actulizar', 'Error');
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
}

export interface CategoriaElement {
  descripcion: string;
  id: number;
  nombre: string;
}
