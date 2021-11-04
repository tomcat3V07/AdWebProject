import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray} from '@angular/forms'
import { ProductsService } from 'src/app/services/products.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  currentProduct:any;
  products:any;
  token:any;

  productForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    detail: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
  });

  constructor(public local: LocalStorageService, private ps: ProductsService) {
    this.onLoading();
   }

   get name() {return this.productForm.get('name') as FormArray;}
   get detail() {return this.productForm.get('detail') as FormArray;}
   get quantity() {return this.productForm.get('quantity') as FormArray;}
   get price() {return this.productForm.get('price') as FormArray;}
  
   ngOnInit(): void {
  }
  
  onLoading(){
    try {
      this.token = this.local.get('user').token
      this.ps.getProduct(this.token).subscribe(
        data => {
          this.products = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

  deleteProduct(id : any){
    try {
      this.token = this.local.get('user').token
      this.ps.delProduct(this.token,id).subscribe(
        data => {
          this.products = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }

  updateProducts(id:number){
    this.productForm.setValue(this.products[id].name)
    this.productForm.setValue(this.products[id].detail)
    this.productForm.setValue(this.products[id].quantity)
    this.productForm.setValue(this.products[id].price)

    console.log(this.productForm.value)
  }

  updateProduct(){
    console.log(this.productForm.value)
    try {
      this.token = this.local.get('user').token
      this.ps.updateProduct(this.token, this.productForm.value).subscribe(
        data => {
         this.products = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }

  editProduct(productID: any){
    console.log(productID);
    //console.log(product);
    console.log(this.productForm.value);
    //this.product = productForm.id
    this.ps.updateProduct(productID,this.productForm.value).subscribe(
      data => {
        console.log(data);
        alert('Product updated successfully')
        this.productForm.reset()
      },
      err =>{
        console.log(err);
      })
      window.location.reload();
  }

  iClick(item:any) {
    this.currentProduct = item;
  }

}
