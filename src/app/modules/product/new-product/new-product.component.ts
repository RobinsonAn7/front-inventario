import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../shared/services/categoria.service';
import { ProductoService } from '../../shared/services/producto.service';

export interface Categoria {
  descripcion: string;
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  public productoForm: FormGroup;
  estadoForm: string = '';
  categoria: Categoria[] = [];
  selectedFile: any;
  nameImg: string = '';

  constructor(
    private fb: FormBuilder,
    private servicioCategoria: CategoriaService,
    private servicioProducto: ProductoService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.estadoForm = 'Agregar ';
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoria: ['', Validators.required],
      picture: ['', Validators.required],
    });

    if (data != null) {
      this.updateForm(data);
      this.estadoForm = 'Actualizar ';
    }
  }

  ngOnInit(): void {
    this.getCategoria();
  }
  onSave() {
    let data = {
      nombre: this.productoForm.get('nombre')?.value,
      precio: this.productoForm.get('precio')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      picture: this.selectedFile,
    };

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('nombre', data.nombre);
    uploadImageData.append('precio', data.precio);
    uploadImageData.append('cantidad', data.cantidad);
    uploadImageData.append('categoria', data.categoria);

    if (this.data != null) {
      //update the products
      this.servicioProducto.updateProducts(uploadImageData,this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //call the service to save a product
      this.servicioProducto.saveProducts(uploadImageData).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    }
  }
  onCancel() {
    this.dialogRef.close(3);
  }

  getCategoria() {
    this.servicioCategoria.getCategoria().subscribe(
      (data: any) => {
        this.categoria = data.categoriaResponse.categoria;
        console.log(this.categoria);
      },
      (error: any) => {
        console.log('error al consultar categoria');
      }
    );
  }
  onFileChanged(evento: any) {
    this.selectedFile = evento.target.files[0];
    console.log(this.selectedFile);

    this.nameImg = evento.target.files[0].name;
  }
  updateForm(data: any) {
    this.productoForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      precio: [data.precio, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      categoria: [data.categoria.id, Validators.required],
      picture: ['', Validators.required],
    });
  }
}
