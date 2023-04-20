import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/models/transaction.model';
import { ProductService } from 'src/services/product.service';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.scss'],
})
export class CreateTransactionsComponent {
  transactionsForm: FormGroup;
  transactions!: Transaction[];
  products: any[] = [];

  constructor(
    private transactionsService: TransactionService,
    private productsService: ProductService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private _chRef: ChangeDetectorRef
  ) {
    // set form
    this.transactionsForm = this.fb.group({
      note: ['', Validators.required],
      sellingCost: [null, Validators.required],
      qty: [null, Validators.required],
      productId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }

  onChangeProduct(event: any) {
    console.log('event.target.value :>> ', event.target.value);
    this.transactionsForm.controls['productId'].setValue(
      parseInt(event.target.value)
    );
    this.transactionsForm.controls['sellingCost'].setValue(
      this.products.find((ele) => event.target.value == ele.id).cost
    );
    this.transactionsForm.controls['sellingCost'].disable();
  }

  getAllProducts() {
    this.productsService.getProductsDropdown().subscribe(
      (res: any) => {
        this.products = res;
        if (this.products.length) {
          this.transactionsForm.controls['productId'].setValue(
            parseInt(this.products[0].id)
          );
          this.transactionsForm.controls['sellingCost'].setValue(
            this.products[0].cost
          );
          this.transactionsForm.controls['sellingCost'].disable();
        }
        this._chRef.detectChanges();
      },
      (err) => {
        alert('Something went wrong while fetching transactions');
      }
    );
  }

  // submit data
  onSubmit() {
    console.log(this.transactionsForm, 'form', this.transactionsForm.valid);
    if (!this.transactionsForm.valid) return;

    this.transactionsService
      .addTransactions(this.transactionsForm.getRawValue())
      .subscribe((response) => {
        this.modal.close('Save click');
      });
  }
}
