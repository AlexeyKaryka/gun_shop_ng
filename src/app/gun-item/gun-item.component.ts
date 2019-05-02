import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';

export class gunItem {
  name: string
  brand: string
  type: string
  cost: string
  caliber: string
  image: string
  _id: string
}

@Component({
  selector: 'app-gun-item',
  templateUrl: './gun-item.component.html',
  styleUrls: ['./gun-item.component.css']
})
export class GunItemComponent implements OnInit {

  constructor(private FetchDataService: FetchDataService) { }

  @Input() gunItem: gunItem;

  ngOnInit() {
  }

  addItemToOrders(modelName) {
    this.FetchDataService.fetchData('orderAddItem', {'modelName': modelName})
    .subscribe(response => {

      console.log(response);

    });
  }

}
