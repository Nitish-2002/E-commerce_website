import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit{
  posts:any=[]
  noPostsavailable=false
  Response=''
  submitted=false;
  constructor(private cartService:CartService, private router:Router){}
  ngOnInit(){
    this.GetUserPost();
  }
  GetUserPost(){
    this.cartService.GetUserPosts().subscribe((response:any)=>{
      console.log(response.message)
      this.posts=response.userItems
      if(!this.posts){
        this.noPostsavailable=true
        console.log(this.noPostsavailable)
      }
      console.log(this.posts)
    })
  }
  OnEdit(id:any){
    this.router.navigate(['/post/edit/'+id ]);
  }
  OnDelete(id:any){
   
    this.cartService.DeletePost(id).subscribe((response:any)=>{
      console.log(response);
      this.submitted=true
      this.Response=response;
      this.GetUserPost()
    })

    window.scrollTo({top:0, behavior: 'smooth'})
    setTimeout(()=>{
      this.submitted=false
    
    },5000)
  

  }
  ViewMore(id:any){
    this.router.navigate(['/post/eachpost/'+id]);
    this.cartService.GetElementById(id).subscribe((response)=>{
      console.log(response)
    });
    this.cartService.Views(id).subscribe((response)=>{
      console.log(response)
    })
  }
}
