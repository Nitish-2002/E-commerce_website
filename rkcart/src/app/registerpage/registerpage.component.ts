import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit{
CartFormGroup !: FormGroup;
Formdata:any='' 
Response=''
cardbool=false;

warningNote='Password must contain at least 8 characters.'
upperCharacters='/[A-Z]/g';
lowerCharacters='/[a-z]/g';
numbers='/[0-9]/g'
showPassword=false;
constructor(private fb: FormBuilder, private cartService: CartService) {}
ngOnInit(): void{
  this.CartFormGroup=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
    name:['',Validators.required],
    email:['',[Validators.required, Validators.email]]
  })
}
passwordType(){
  this.showPassword=!this.showPassword;
  
}
Onsubmit(){
  this.Formdata=this.CartFormGroup.value;
  localStorage.setItem('Name',this.Formdata.name)
  localStorage.setItem('Email',this.Formdata.email)
  console.log(this.Formdata);
  console.log(this.Formdata.username)
  if(!this.CartFormGroup.valid){
    console.log("failed ")
    if(!this.Formdata.password.match(this.upperCharacters)){
        this.warningNote='Atlease one Upper case character needed'
    }
    else if(!this.Formdata.password.match(this.lowerCharacters)){
      this.warningNote='Atlease one Lower case character needed'
    }
    else if(!this.Formdata.password.match(this.numbers)){
      this.warningNote='Atlease one number needed'
    }
    else{
      this.warningNote='Minimum 8 characters required'
    }
  }
  else{
    this.cartService.AddUser(this.Formdata).subscribe((response:any)=>{
      this.cardbool=true;
      setTimeout(()=>{
        this.cardbool=false
      },3000)
      console.log(response)
      if(response=="user registed sucessfully"){
        this.Response='Registered Successfully'
        this.CartFormGroup.reset();
      }
      else if(response=="User already present"){
        this.Response='User Exists... Please Do Login...'
      }
      else{
        this.Response='Internal server error'
      }
    })
    
  }

}
}
