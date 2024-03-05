import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss'],
})
export class LoginpageComponent implements OnInit, AfterViewInit{
  CartFormGroup!: FormGroup;
  Formdata:any = '';
  Response = '';
  cardbool = false;
  inFocus=false;
  warningNote = 'Password must contain at least 8 characters.';
  upperCharacters = '/[A-Z]/g';
  lowerCharacters = '/[a-z]/g';
  numbers = '/[0-9]/g';
  showPassword = false;
  submitted = false;
  warnings = false;
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.CartFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log('ngOnInit')
  }
  passwordType(){
    this.showPassword=!this.showPassword;
    
  }
  ngAfterViewInit():void{
    this.inFocus=true;
    setTimeout(()=>{
      this.inFocus=false
    },3000)
    console.log('infocus')
  }
  Onsubmit() {
    this.Formdata = this.CartFormGroup.value;
    console.log(this.Formdata);

    if (!this.CartFormGroup.valid) {
      this.warnings = true;
    } else {
      this.submitted = true;
      this.cartService.VerifyUser(this.Formdata).subscribe((response: any) => {
        console.log(response)
        const responsee = JSON.parse(response);
       
        console.log('login');
        localStorage.setItem('myToken', responsee.token);
        localStorage.setItem('userId', responsee.userExist.id);
        localStorage.setItem('username', responsee.userExist.username);
        console.log(responsee.userExist.id);
        console.log(responsee.token);
        if (response.message === 'Password mismatch') {
          this.Response = 'Wrong Password...';
          // Swal.fire("Oops..!!","Password MisMatch..Try Again","warning")
          console.log(this.Response)
        } else if (
          response.message === "Invalid login credentials: Username doesn't exist"
        ) {
          this.Response = 'Internal server error';
        } else if (
          response.message === "IUnauthorized login"
        ) {
          this.Response = 'Login error';
        } else {
          this.Response = 'Logged In Successfully...';
          
          this.router.navigate(['/post/getall']);
        }
       
        setTimeout(() => {
          this.submitted = false;
        }, 3000);
        
      });
    }
  }
}
