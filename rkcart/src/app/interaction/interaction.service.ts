import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private teacherMessageSource=new Subject<[]>
  teacherMessage$=this.teacherMessageSource.asObservable();
  private teacherMessageSource2=new Subject<[]>
  teacherMessag$=this.teacherMessageSource2.asObservable();
  constructor() { }
  sendMessage(filteredposts:[]){
    this.teacherMessageSource.next(filteredposts)
  }
  sendSearch(searchedPosts:[]){
    this.teacherMessageSource2.next(searchedPosts)
    // console.log(searchedPosts)
  }
}
