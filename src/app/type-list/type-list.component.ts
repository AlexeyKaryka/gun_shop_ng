import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { TypeItem } from '../type-item/type-item.component';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  constructor(private FetchDataService: FetchDataService) { }

  typeItemList: TypeItem[] | string;

  ngOnInit() {
    this.FetchDataService.fetchData('types', null)
    .subscribe(response => {this.typeItemList = response;});
  }

}
