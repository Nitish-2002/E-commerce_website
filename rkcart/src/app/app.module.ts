import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CartInterceptor } from './cart.interceptor';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EachPostComponent } from './each-post/each-post.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegisterpageComponent,
    LoginpageComponent,
    CreatePostComponent,
    EditPostComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    AddCategoryComponent,
    EachPostComponent,
    MainLayoutComponent,
    MyProductsComponent,
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module,
    NgbModule,
    NgbCarouselModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: CartInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
