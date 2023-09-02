import { Component,OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  receivedData: any[]=[];
  cost: number=0;
  username: string = ''

  constructor(private localst: SessionStorageService){
    var temp = this.localst.retrieve('username')
    this.username = temp
  }

	ngOnInit() {
    document.getElementById("checkEmpty")!.innerHTML = ""
    var temp = this.localst.retrieve('username')
    this.username = temp
    temp = 'cartList'+temp
    
    const variable = this.localst.retrieve(temp);
    this.receivedData = variable


    for(var i=0; i<variable.length;i++)
    {
      this.cost += parseInt(variable[i].price)
    }
    if(this.receivedData.length==0 && this.username)
    {
      document.getElementById("checkEmpty")!.innerHTML = "Cart Empty!"
    }
	}

  removeCartItem(item: any)
  {
    document.getElementById("checkEmpty")!.innerHTML = ""
    for(var i=0; i<this.receivedData.length;i++)
    {
      if(this.receivedData[i].title === item.title)
      {
        this.receivedData.splice(i,1) 
        var temp = this.localst.retrieve('username')
        temp = 'cartList'+temp
        const variable = this.localst.store(temp,this.receivedData);
        
      }
    }
    this.cost = 0
    for(var i=0; i<this.receivedData.length;i++)
    {
      this.cost += parseInt(this.receivedData[i].price)
    }
    if(this.receivedData.length==0 && this.username)
    {
      document.getElementById("checkEmpty")!.innerHTML = "Cart Empty!"
      document.getElementById("setprice")!.innerHTML = "Total Price: $0";
      return
    }
    document.getElementById("setprice")!.innerHTML = "Total Price: $" + this.cost
  }

  noUser()
  {
    this.username = this.localst.store('username','');
  }
}
