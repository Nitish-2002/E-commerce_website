import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  formurl=environment.url;
  constructor(private httpClient: HttpClient) { }
  AddUser(Formdata:any){
    return this.httpClient.post(this.formurl+'/register',Formdata, {responseType:'text'})
  }
  VerifyUser(Formdata:any){
    return this.httpClient.post(this.formurl+'/login', Formdata,{responseType:'text'})
  }
  AddPost(Postdata:any){
    return this.httpClient.post(this.formurl+'/createpost',Postdata, {responseType:'text'})
  }
  GetPosts(){
    return this.httpClient.get(this.formurl+'/getallposts',{responseType:'text'});
  }
  DeletePost(id:any){
    return this.httpClient.post(this.formurl+'/deletepost/'+id,{responseType:'text'})
  }
  EditPost(id:any,postData:any){
    return this.httpClient.post(this.formurl+'/editpost/'+id,postData, {responseType:'text'})
  }
  GetElementById(id:any){
    return this.httpClient.get(this.formurl+'/getpostsbyid/'+id)
  }
  GetAllCategory(){
    return this.httpClient.get(this.formurl+'/getallcategory')
  }
  GetCategory(category:any){
    return this.httpClient.get(this.formurl+'/category/'+category);
  }
  AddCategoryName(categoryName:any){
    return this.httpClient.post(this.formurl+'/addcategoryname',categoryName)
  }
  Views(id:any){
    return this.httpClient.put(this.formurl+'/countviews/'+id,{});
  }
  GetUserPosts(){
    return this.httpClient.get(this.formurl+'/userposts');
  }
}
