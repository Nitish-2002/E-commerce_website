import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit{
  posterUrl=''
  createPostformGroup!:FormGroup
  formValues=''
  Response=''
  submitted=false
  categories:any=[]
  constructor(private cartService:CartService, private activatedRoute: ActivatedRoute, private fb:FormBuilder, private router:Router){}
  ngOnInit(){
    this.Initializer();
    this.cartService.GetAllCategory().subscribe((response:any)=>{
      this.categories=response;
      console.log(this.categories);
    })
    let cid=this.activatedRoute.snapshot.params['id'];
    this.cartService.GetElementById(cid).subscribe((response:any)=>{
      console.log(response)
      console.log(response[0].Title)
      this.createPostformGroup.controls['Title'].setValue(response[0].Title);
      this.createPostformGroup.controls['Description'].setValue(response[0].Description);
      this.createPostformGroup.controls['Address'].setValue(response[0].Address)
      this.createPostformGroup.controls['date'].setValue(response[0].date.toString().slice(0,10))
      this.createPostformGroup.controls['Price'].setValue(response[0].Price)
      this.posterUrl='http://localhost:3001/images/'+response[0].FileName;
      console.log(response[0].Category)
      this.createPostformGroup.controls['Category'].setValue(response[0].Category)
    })
  }
  Initializer(){
    this.createPostformGroup=this.fb.group({
      Title:[''],
      Description:[''],
      date:[''],
      Address:[''],
      Price:[''],
      Category:['Select Category Name: ']
    })
   
  }
  OnUpdate():void{
    let cid=this.activatedRoute.snapshot.params['id'];
    this.formValues=this.createPostformGroup.value;
    console.log(this.formValues)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.cartService.EditPost(cid,this.formValues).subscribe((response)=>{
      console.log(response)
      this.Response=JSON.parse(response)
      this.submitted=true;
    })
    setTimeout(()=>{
      this.submitted=false;
      this.router.navigate(['/post/getall'])
    },3000)
  }

}
