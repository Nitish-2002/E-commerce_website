import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{
  CategoryFormGroup!:FormGroup;
  categoryName=''
  constructor(private fb:FormBuilder, private cartService:CartService){}
ngOnInit(){
  this.CategoryFormGroup=this.fb.group({
    categoryName:['',Validators.required]
  })
  
}
AddCategory(){
  this.categoryName= this.CategoryFormGroup.value;
  console.log(this.categoryName)
  this.cartService.AddCategoryName(this.categoryName).subscribe((response)=>{
    console.log(response)
  })
}
}
