import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  constructor(private router: Router) { }

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    
  ): boolean  {
    let token:any=localStorage.getItem('myToken');
    console.log("token"+token)
    if(token){
      return true; 
    }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }
 
}
