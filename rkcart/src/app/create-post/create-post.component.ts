import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  constructor(private fb: FormBuilder, private cartService: CartService, private router:Router) {}
  createPostformGroup!: FormGroup;
  image64:any
  Postdata=''
  Response=''
  posterUrl=''
  responsee:any
  categories:any=[]
  submitted:boolean =false;
  // selectedCategory:string='';
  ngOnInit(): void {
    this.createPostformGroup = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Address: ['', Validators.required],
      date: [this.getCurrentDate(), Validators.required],
      Price: ['', Validators.required],
      ProductImage: ['', Validators.required],
      Category:['',Validators.required]
    });
    this.cartService.GetAllCategory().subscribe((response:any)=>{
      this.categories=response;
      console.log(this.categories);
    })
  
 
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); 
    const day = ('0' + currentDate.getDate()).slice(-2);
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  }
  OnSave(){
    this.getCurrentDate()
    this.Postdata=this.createPostformGroup.value;
    this.createPostformGroup.value.ProductImage=this.image64;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(this.createPostformGroup.value)
      this.cartService.AddPost(this.Postdata).subscribe((response)=>{
        this.responsee=JSON.parse(response)
        if(response==="Unauthorized token"){
          this.Response="Please Do Login Again Your Session Has Been Expired..!!"
        }
        else if(this.responsee.message==="Post created successfully!"){
          this.Response="Post created successfully!"
        }
        console.log(this.responsee)
        this.submitted=true;
      })
      setTimeout(() => {
        this.submitted = false;
        this.router.navigate(['/post/getall']);
      }, 3000);
      
      
      
  }
  convertToBase64(event: any): void {
    const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (loadEvent: any) => {
        this.posterUrl = loadEvent.target.result; 
        this.image64 = reader.result?.toString().replace('data:image/jpeg;base64,','');
    }
  }
  // cat(){
  //   console.log(this.selectedCategory)
  // }


  
}
