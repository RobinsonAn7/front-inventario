import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.getCategoria();
  }

  displayedColumns: string[] = ['id','nombre','descripcion','actions'];
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
  procesCategoria(resp:any){
    
    const dataCategoria: CategoriaElement[] = [];
    if (resp.metadata[0].code == "00") {
      
      let listCategoria = resp.categoriaResponse.categoria;
      listCategoria.forEach((element: CategoriaElement) => {
        dataCategoria.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoriaElement>(dataCategoria);
    }
  }
}

export interface CategoriaElement {
  descripcion: string;
  id: number;
  nombre: string;
}
