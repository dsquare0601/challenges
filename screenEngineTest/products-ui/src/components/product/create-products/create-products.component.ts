import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent {
  productForm: FormGroup;
  products!: Product[];
  mfgModel: NgbDateStruct = { year: 2023, month: 4, day: 20 };
  expModel: NgbDateStruct = { year: 2023, month: 4, day: 20 };

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {
    // set form
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      cost: [null, Validators.required],
      mfgDate: [null],
      expiryDate: [null],
    });
  }
  ngOnInit() {}

  // submit data
  onSubmit() {
    console.log('this.productForm.valid', this.productForm.valid);
    if (!this.productForm.valid) return;

    this.productForm.controls['mfgDate'].setValue(
      moment()
        .year(this.mfgModel.year)
        .month(this.mfgModel.month)
        .day(this.mfgModel.day)
        .format()
    );
    this.productForm.controls['expiryDate'].setValue(
      moment()
        .year(this.expModel.year)
        .month(this.expModel.month)
        .day(this.expModel.day)
        .format()
    );
    this.productService
      .createProducts(this.productForm.value)
      .subscribe((response) => {
        console.log(response, 'res');
        this.modal.close('Save click');
      });
  }
}
