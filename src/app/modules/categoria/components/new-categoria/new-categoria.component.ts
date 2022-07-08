import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../../shared/services/categoria.service';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.css'],
})
export class NewCategoriaComponent implements OnInit {
  public categoryForm: FormGroup;
  estadoForm: string = "";
  
  constructor(
    private fb: FormBuilder,
    private servicio: CategoriaService,
    private dialogRef: MatDialogRef<NewCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log(data);
    this.estadoForm = "Agregar"

    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    if (data != null) {
      this.updateForm(data);
      this.estadoForm = "Actulizar";
    }
  }

  ngOnInit(): void { }

  onSave() {
    let data = {
      nombre: this.categoryForm.get('nombre')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value
    };

    if (this.data != null) {
      //update registry
      this.servicio.updateCategoria(data, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
    } else {

      //create new category
      this.servicio.saveCategoria(data).subscribe(
        (data) => {
          console.log(data);
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

  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
    });
  }
}
