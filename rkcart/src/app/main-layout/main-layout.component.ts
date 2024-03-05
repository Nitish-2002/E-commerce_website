import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  // showHeader: boolean = true;

  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       // Hide the header if the current route is '/register' or '/login'
  //       this.showHeader = !['/register', '/login','/post/getall', '/post/createpost'].includes(event.url);
  //     }
  //   });
  // }
}
