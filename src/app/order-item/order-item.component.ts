import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';


export class OrderItem {
  items: any
  orderCost: string
  address: string
  state: string
}

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  constructor(private FetchDataService: FetchDataService) { }

  ngOnInit() {
  }

  @Input() orderItem: OrderItem | string

  stateColor: string

  makeOrder(orderId) {
    console.log(orderId);
    console.log(typeof orderId);
    this.FetchDataService.fetchData('orderChangeState', {'_id': orderId})
    .subscribe(response => {

      console.log(response);
      this.orderItem = response;

    });
  }

}
