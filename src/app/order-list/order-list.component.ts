import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { OrderItem } from '../order-item/order-item.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private FetchDataService: FetchDataService) { }

  orderItemList: OrderItem[] | string

  ngOnInit() {
    this.FetchDataService.fetchData('orders', null)
    .subscribe(response => {console.log(response);this.orderItemList = response;});
  }

}
