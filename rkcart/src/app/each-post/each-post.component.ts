import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-each-post',
  templateUrl: './each-post.component.html',
  styleUrls: ['./each-post.component.scss']
})
export class EachPostComponent implements OnInit{
  EachPost:any=[]
  Allposts:any=[]
  categoryName=''
  APrize:Number=0
  usersid:number=-1
  constructor(private activatedRoute:ActivatedRoute, private cartService:CartService, private router:Router){}
  ngOnInit(){
    this.eachPost()
    
  }
  eachPost(){
    let cid=this.activatedRoute.snapshot.params['id'];
    this.cartService.GetElementById(cid).subscribe((response:any)=>{
      this.EachPost=response[0];
      this.categoryName=response[0].Category;
      this.APrize=parseFloat(this.EachPost.Price)+parseFloat(this.EachPost.Price)-(parseFloat(this.EachPost.Price)/4);
      console.log(this.APrize)
      console.log(this.EachPost.Price)
      this.GetAllPosts();
    })
  }
 
  GetAllPosts(){
    this.cartService.GetPosts().subscribe((response:any)=>{
      this.Allposts = JSON.parse(response);
      this.Allposts=this.Allposts.filter((post:any)=>{
        return post.Category.toLowerCase().includes(this.categoryName.toLowerCase())   
      })
      console.log(this.Allposts)
    })
  }
  ViewMore(id:any){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const userId=localStorage.getItem('userId');  
    this.router.navigate(['/post/eachpost/'+id]);
    this.eachPost();
    this.cartService.GetElementById(id).subscribe((response:any)=>{
      this.usersid=response[0].UserId;
      console.log(this.usersid.toString,(userId))
       if(this.usersid.toString()!==(userId)){
        this.cartService.Views(id).subscribe((response)=>{
          console.log(response)
        })
      }
      this.eachPost();
    }); 
  }
}
