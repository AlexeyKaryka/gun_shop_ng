import { Component, OnInit } from '@angular/core';
import { BrandItem } from '../brand-item/brand-item.component';
import { FetchDataService } from '../fetch-data.service';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  constructor(
    private FetchDataService: FetchDataService,
    private _pagerService: PagerService
  ) { }

  brandItemList: BrandItem[] | string;
  pager: any = {}
  pagedItems: BrandItem[] | string

  ngOnInit() {
    this.FetchDataService.fetchData('brands', null)
    .subscribe(response => {this.brandItemList = response;this.setPage(1);});
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagerService.getPager(this.brandItemList.length, page);

    // get current page of items
    this.pagedItems = this.brandItemList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  } 

}
