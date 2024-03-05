import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { InteractionService } from '../interaction/interaction.service';
// import { Router } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  @Output() categoryPost= new EventEmitter<[]>
  Categories:any='category'
  posts:any=[]
  isDropdown=false
  username=localStorage.getItem("username")
  searchedValue:string=''
  selectedCategory='';
  searchedPosts:any=[]
  AllPosts:any=[]
  categoryPosts:any=[]
  constructor(private cartService:CartService, private router:Router, private interaction:InteractionService){}
  ngOnInit(){
    this.GetAllPosts();
    this.GetAllCategories();
    console.log(this.username)
    
  }
  toggeleDropdown(){
    this.isDropdown= ! this.isDropdown;
    console.log("1st one "+this.isDropdown)
  }
  GetAllCategories(){ 
    this.cartService.GetAllCategory().subscribe((response)=>{
      console.log(response, "ravi ravi ravi")
      this.Categories=response;
    })
  }
  categoryAll(){
    this.GetAllPosts();
  }
  Category(categoryName:any){
    this.selectedCategory=categoryName;
      this.cartService.GetCategory(categoryName).subscribe((response)=>{
        console.log(response);
        this.categoryPosts=response;
        this.isDropdown= !this.isDropdown;
        console.log("2nd one "+this.isDropdown)

        console.log(this.categoryPosts)
        if(this.searchedValue){
          this.searchedPosts=this.categoryPosts.filter((post:any)=>
            post.Title.toLowerCase().includes(this.searchedValue.toLowerCase())
          )
          this.interaction.sendSearch(this.searchedPosts)
        }
        else{
          this.interaction.sendMessage(this.categoryPosts)
        }  
      })
  }
  
  searchValue(searchValue:string){
    this.searchedValue=searchValue;
    console.log(this.searchedValue+" "+this.searchedValue.length)
    if(this.categoryPosts.length==0){
      this.searchedPosts=this.posts.filter((post:any)=>
      post.Title.toLowerCase().includes(this.searchedValue.toLowerCase())
    )
    }
    else{
      this.searchedPosts=this.categoryPosts.filter((post:any)=>
      post.Title.toLowerCase().includes(this.searchedValue.toLowerCase())
    )
    }
   
    this.interaction.sendSearch(this.searchedPosts)
  }

  GetAllPosts(){
    this.cartService.GetPosts().subscribe((response)=>{
      this.posts=JSON.parse(response);
      console.log(this.posts)
    })
  }
  Logout(){
    localStorage.removeItem('myToken');
    this.router.navigate([''])
    
  }
  // element1:boolean=true
  // element2:boolean=false
  // element3:boolean=false
  // element4:boolean=false
  // selectElement(element:string){
  //   this.element1=false;
  //   this.element2=false;
  //   this.element3=false;
  //   this.element4=false;
  //   switch(element){
  //     case 'element1':
  //       this.element1=true
  //       break
  //     case 'element2':
  //       this.element2=true
  //       break
  //     case 'element3':
  //       this.element3=true
  //       break
  //     case 'element4':
  //       this.element4=true
  //     break
  
  //   }

  }


