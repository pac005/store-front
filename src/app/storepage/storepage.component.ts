import { Component, OnInit } from '@angular/core';
import books from './amazon.books.json';
import { SharevariableService } from '../sharevariable.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-storepage',
  templateUrl: './storepage.component.html',
  styleUrls: ['./storepage.component.scss']
})
export class StorepageComponent {
  searchData: any[] = books;

  username: String = ""

  prevButton : boolean;
  prevVal: number = 0;
  nextVal: number = 25;
  
  cartList: any[] = [];
  

  p: number = 1;
  count: number = 25;

  constructor(private storage:SessionStorageService){
    this.username = this.storage.retrieve('username');
    var temp = 'cartList' + this.username
    if(this.storage.retrieve(temp))
      this.cartList = this.storage.retrieve(temp);
  }

  updateCartList(item: any)
  {
    this.cartList.push(item)
    console.log(this.cartList)
    var temp = 'cartList' + this.username
    this.storage.store(temp,this.cartList)

  }

}
