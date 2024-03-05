import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { InteractionService } from '../interaction/interaction.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  FilteredPosts: any = [];
  SearchedPosts: any = [];
  posts: any = [];
  postsPerpage: number = 15;
  currentPage=1;
  duplicatePosts:any=[];
  dp=''
  noPostsavailable = false;
  ProductImage = '';
  totalPagescount = -1;
  usersid: number = -1;
  constructor(
    private cartService: CartService,
    private router: Router,
    private interaction: InteractionService
  ) {}
  ngOnInit() {

    this.GetAllPosts();
  
    this.interaction.teacherMessage$.subscribe((filteredposts) => {
      this.FilteredPosts = filteredposts;
      this.posts = this.FilteredPosts;
      if (this.posts.length === 0) {
        this.noPostsavailable = true;
      } else {
        this.noPostsavailable = false;
      }

      // console.log(this.FilteredPosts);
    });
    this.interaction.teacherMessag$.subscribe((searchedPosts) => {
      this.SearchedPosts = searchedPosts;
      this.SearchedPosts = JSON.stringify(this.SearchedPosts);
      this.SearchedPosts = JSON.parse(this.SearchedPosts);
      this.posts = this.SearchedPosts;
      if (this.posts.length === 0) {
        this.noPostsavailable = true;
      } else {
        this.noPostsavailable = false;
      }
      // console.log(this.SearchedPosts);
    });
   
  }
  onDelete(id: any) {
    this.cartService.DeletePost(id).subscribe((response) => {
      // console.log(response);
      this.GetAllPosts();
    });
  }
  ViewMore(id: any) {
    const userId = localStorage.getItem('userId');
    this.router.navigate(['/post/eachpost/' + id]);
    this.cartService.GetElementById(id).subscribe((response: any) => {
      this.usersid = response[0].UserId;
      // console.log(this.usersid.toString, userId);
      if (this.usersid.toString() !== userId) {
        this.cartService.Views(id).subscribe((response) => {
          // console.log(response);
        });
      }
    });
  }
  onEdit(id: any) {
    this.router.navigate(['/post/edit/' + id]);
    this.cartService.GetElementById(id).subscribe((response) => {
      // console.log(response);
    });
  }
  GetAllPosts(){
    this.cartService.GetPosts().subscribe((response) => {
      this.posts=JSON.parse(response);
      // console.log(this.posts)
      this.duplicatePosts=this.posts
      // console.log(this.duplicatePosts)
      this.totalPagescount = Math.ceil(this.posts.length / this.postsPerpage);
      this.goTopage(1);
    });
  }
  totalPages() {
   return Array.from({ length: this.totalPagescount }, (_, index) => index + 1);
  }
  goTopage(page: number) {
    this.currentPage = page;
    this.posts=this.duplicatePosts;
    // console.log(this.currentPage)
    const startIndex = (this.currentPage - 1) * this.postsPerpage;
    const endIndex = startIndex + this.postsPerpage;
    const displayedPosts = [];
    // console.log(endIndex+ " "+ startIndex)
    for (let i = startIndex; i < endIndex && i<this.posts.length; i++) {
      // console.log(i + " hi"+ endIndex+ " hi"+ startIndex)
      // console.log(this.posts[i])
      displayedPosts.push(this.posts[i]);
    }
    // console.log(displayedPosts)
    this.posts = displayedPosts;
    window.scrollTo({top:0,  behavior: 'smooth'})
    // console.log(this.posts);
  } 
  Next(){
    if(this.currentPage<this.totalPagescount){
      this.currentPage++;
    }
    this.goTopage(this.currentPage)
  } 
  Prev(){
    if(this.currentPage>1){
      this.currentPage--;
    }
    this.goTopage(this.currentPage)
  }
}
