import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from '../../utils/app-http-client.service';
import { API_CONFIG } from '../../utils/api-config';
import { pipe } from 'rxjs';
import {
  mergeMap, switchMap, retry,
  map, catchError, filter, scan
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../utils/local-storage.service';
import { HeaderInfoService } from '../../services/header-info.service';


@Component({
  selector: 'theapp-open-bets',
  templateUrl: './open-bets.component.html',
  styleUrls: ['./open-bets.component.scss']
})
export class OpenBetsComponent implements OnInit {

  openBetsList = []; // group by list
  resultBetsList = []; // with out group by list
  constructor(private http: AppHttpClient, private ls: LocalStorageService,  private headerInfo: HeaderInfoService) { }

  ngOnInit() {

    this.getBetsList();
   
  }

  getBetsList() {

    const payload = {
      "command": "getOpenBets"
    };
    this.http.post(API_CONFIG.OPEN_BETS, payload).subscribe(res => {
      console.log('res', res);
      if (res.data) {
        this.resultBetsList = JSON.parse(JSON.stringify(res.data));
        const groupData = this.groupByKeys(res.data, ['eventId', 'betId', 'betOptionId'], []);
        const groupByData = this.groupBy(res.data, 'eventId');
        this.openBetsList = groupByData || [];
        this.openBetsList.forEach(item => {
          item['groupByBetId'] = this.groupBy(item.items, 'betId') || [];
        });
        console.log(' this.openBetsList', this.openBetsList);
        this.openBetsList.forEach(event => {
          event.groupByBetId.forEach(bet => {
            bet.items.forEach((betOption, index) => {
              if(index === 0) {
                betOption.betStatus = 'successful';
              } else {
                betOption.betStatus = 'unsuccessful';
              }
            });
          });
        });
      } else {
        this.openBetsList = [];
      }
    })

  }
  groupBy<T, K>(list: T[], key, getKey?: (item: T) => K) {
    const map = new Map<K, T[]>();
    list.forEach(item => {
      const _key = item[key];
      const collection = map.get(_key);
      if (!collection) {
        map.set(_key, [item]);
      } else {
        collection.push(item);
      }
    });
    const keys = Array.from(map.keys());
    return Array.from(map.values(), (item, index) => {
      return { metaData: item[0], key: keys[index], items: item };
    });
  }

  groupByKeys(list, groupKeys, sumKeys) {
    const helper = {};
    const result = list.reduce(function (r, o) {
      let key = "";
      groupKeys.forEach((groupKey, index) => {
        if (index !== 0) key += "-";
        key += o[groupKey]
      });
      if (!helper[key]) {
        helper[key] = Object.assign({}, o); // create a copy of o
        r.push(helper[key]);
      } else {
        sumKeys.forEach((sumKey, index) => {
          helper[key][sumKey] = +helper[key][sumKey] + +o[sumKey];
        });
      }
      return r;
    }, []);

    return result;
  }

  selectedBetOption(event) {
    console.log('event details-->', event.target.value);
  }

  updateBetOptionStatus(bet, betOptions, status) {
    let betOptionStatus = status;
   // bet.betStatus = status;
    if(status === 'successful') {
      betOptionStatus = 'unsuccessful';
    } else if(status === 'cancelled') {
      betOptionStatus = 'cancelled';
    }
    betOptions.forEach(betOption => {
      if(betOption.betOptionId === bet.betOptionId) {
        betOption.betStatus = status;
      } else {
        betOption.betStatus = betOptionStatus;
      }
      console.log('betOption -->', betOption);
    });
    return betOptions;
  }

  updateBetSatus(betOptions) {
    const updateBetOptions = [];
    const user = this.ls.getItem('user', true);
    betOptions.forEach(betOption => {
      updateBetOptions.push({eventId: betOption.eventId, betId: betOption.betId, betOptionId: betOption.betOptionId, betStatus: betOption.betStatus, updatedBy: user.userId});
    });
    this.updateBet(updateBetOptions);
  }

  updateAllBetSatus(bets) {
    const updateBetOptions = [];
    const user = this.ls.getItem('user', true);
    bets.forEach(bet => {
      bet.items.forEach(betOption => {
        updateBetOptions.push({eventId: betOption.eventId, betId: betOption.betId, betOptionId: betOption.betOptionId, betStatus: betOption.betStatus, updatedBy: user.userId});
      });
    });
    this.updateBet(updateBetOptions);
  }

  updateBet(bets) {
    const payload: any = {};      
    payload.command = "updateBets";
    payload.requestData = bets;
    // payload.requestData = this.resultBetsList.filter((res: any) => res.betOptionId === betOptionId), map((res: any) => res.betStatus = type);

    console.log('payload -->', payload);
    // payload.requestData = [];
    this.http.post(API_CONFIG.UPDATE_BETS, payload).subscribe(res => {
      console.log('res', res);
      this.headerInfo.updateHeaderInfo();
      this.getBetsList();
    })

  }


}
