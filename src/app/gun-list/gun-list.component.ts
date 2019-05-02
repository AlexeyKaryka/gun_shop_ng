import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { gunItem } from '../gun-item/gun-item.component';
import { SharedServiceFilterReceiverService } from '../shared-service-filter-receiver.service';
import { SharedServiceFilterReceiverReverseService } from '../shared-service-filter-receiver-reverse.service';
import * as _ from 'underscore';

import { PagerService } from '../pager.service';


@Component({
  selector: 'app-gun-list',
  templateUrl: './gun-list.component.html',
  styleUrls: ['./gun-list.component.css']
})
export class GunListComponent implements OnInit {

  constructor(
    private FetchDataService: FetchDataService,
    private _sharedServiceFilterReceiver: SharedServiceFilterReceiverService,
    private _sharedServiceFilterReceiverReverse: SharedServiceFilterReceiverReverseService,
    private _pagerService: PagerService
  ) {
    _sharedServiceFilterReceiver.changeEmitted$.subscribe(
      data => {
        this.FetchDataService.fetchData('models', data)
        .subscribe(response => {
          console.log(response);
          this.gunItemList = response;
          this.setPage(1);
        });
      }
    );
  }

  gunItemList: gunItem[] | string
  pager: any = {}
  pagedItems: gunItem[] | string

  ngOnInit() {
    this._sharedServiceFilterReceiverReverse.emitChange('getFilter');
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagerService.getPager(this.gunItemList.length, page);

    // get current page of items
    this.pagedItems = this.gunItemList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  } 

}
