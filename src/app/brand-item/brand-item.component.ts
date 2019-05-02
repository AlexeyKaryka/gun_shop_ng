import { Component, OnInit, Input } from '@angular/core';
import { SharedServiceFilterService } from '../shared-service-filter.service';

export class BrandItem {
  name: string
  country: string
}

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.css']
})
export class BrandItemComponent implements OnInit {

  constructor(private _sharedServiceFilter: SharedServiceFilterService) { }

  ngOnInit() {
  }

  @Input() brandItem: BrandItem;

  filterModels(brandName) {
    this._sharedServiceFilter.emitChange({
      'brand': brandName
    });
  }

}
