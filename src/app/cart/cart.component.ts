import { Component,OnInit } from '@angular/core';
import { SharevariableService } from '../sharevariable.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  receivedData: any[];
  cost: number=0;

  constructor(private localst: SessionStorageService){
    // var temp = localst.retrieve('username')
    // temp = 'cartList'+temp
    // const variable = this.localst.retrieve(temp);
    // console.log(variable)
  }

	ngOnInit() {
    var temp = this.localst.retrieve('username')
    temp = 'cartList'+temp
    const variable = this.localst.retrieve(temp);
    this.receivedData = variable
    console.log(variable)

    for(var i=0; i<variable.length;i++)
    {
      console.log(variable[i].price)
      this.cost += parseInt(variable[i].price)
    }
    console.log(this.cost)
	}

}
