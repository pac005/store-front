import { Component, OnInit } from '@angular/core';
import books from './amazon.books.json';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

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
  count: number = 28;

  constructor(private storage:SessionStorageService,private dialog: MatDialog, private router: Router){
    this.username = this.storage.retrieve('username');
    var temp = 'cartList' + this.username
    if(this.storage.retrieve(temp))
      this.cartList = this.storage.retrieve(temp);
  }

  updateCartList(item: any)
  {

    for(var i=0;i<this.cartList.length;i++)
    {    
      if(this.cartList[i].title == item.title)
      {
        this.openModal("Item Already in Cart!")
        return
      }
    }
    this.cartList.push(item)
    var temp = 'cartList' + this.username
    this.storage.store(temp,this.cartList)
    this.openModal("Item Added to Cart!")
    return
  }

  openModal(msg: string): void {
    this.storage.store('modalmessage',msg)
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
    });
  }

  noUser()
  {
    this.username = this.storage.store('username','');
  }

}


