import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../../../shared/services/categoria.service';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.css'],
})
export class NewCategoriaComponent implements OnInit {
  public categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicio: CategoriaService,
    private dialogRef: MatDialogRef<NewCategoriaComponent>
  ) {
    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave() {
    let data = {
      nombre: this.categoryForm.get('nombre')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value
    };
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

  onCancel() {
    this.dialogRef.close(3);
  }
}
