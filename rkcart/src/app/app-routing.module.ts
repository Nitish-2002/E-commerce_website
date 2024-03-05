import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HeaderComponent } from './header/header.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EachPostComponent } from './each-post/each-post.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AuthService } from './auth.service';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  // {path:'',component:RegisterpageComponent},
  //   {path:'login',component:LoginpageComponent},
  //   {path:'createpost',component:CreatePostComponent},
  //   {path:'getall',component:PostsComponent},
  //   {path:'edit/:id',component:EditPostComponent},
  //   {path:'header',component:HeaderComponent},
  //   {path:'addcategory',component:AddCategoryComponent},
  //   {path:'eachpost/:id',component:EachPostComponent}
  {
    path: 'post',
    component: MainLayoutComponent,
    children: [
    { path: 'createpost', component: CreatePostComponent, canActivate:[AuthService] },
    {path:'getall',component:PostsComponent, canActivate:[AuthService]},
    {path:'edit/:id',component:EditPostComponent, canActivate:[AuthService]},
    {path:'addcategory',component:AddCategoryComponent, canActivate:[AuthService]},
    {path:'eachpost/:id',component:EachPostComponent, canActivate:[AuthService]},
    {path:'myproducts',component:MyProductsComponent,canActivate:[AuthService]},
    {path:'myprofile',component:MyProfileComponent,canActivate:[AuthService]}
    ]
  },
   {path:'',component:LoginpageComponent},
  {path:'register',component:RegisterpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
