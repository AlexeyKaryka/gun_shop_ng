import { Component, OnInit, Input } from '@angular/core';
import { SharedServiceFilterService } from '../shared-service-filter.service';

export class TypeItem {
  name: string
  description: string
  image: string
}

@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css']
})
export class TypeItemComponent implements OnInit {

  constructor(private _sharedServiceFilter: SharedServiceFilterService) { }

  ngOnInit() {
  }

  @Input() typeItem: TypeItem;

  filterModels(typeName) {
    this._sharedServiceFilter.emitChange({
      'type': typeName
    });
  }

}
