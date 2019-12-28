import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppHttpClient } from '../../utils/app-http-client.service';
import { API_CONFIG } from '../../utils/api-config';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../utils/local-storage.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { HeaderInfoService } from '../../services/header-info.service';

@Component({
  selector: 'theapp-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  scoreDetails: any[] = [];
  teamDetails: any[] = [];
  cols: any[] = [];
  balls: any[] = [];
  matchBets = [];
  fancyBets = [];
  matchBetsHistory = [];
  fancyBetsHistory = [];
  currentBet: any = {};
  currentBetOption: any = {};
  eventDetails: any = {};
  stakeValue = 0;
  modalRef: NgbModalRef;
  user: any = {};
  //
  eventDetails$: Observable<any>

  constructor(private modalService: NgbModal, private appHttp: AppHttpClient,
    private ls: LocalStorageService,
    private headerInfo: HeaderInfoService,
    private activeRouter: ActivatedRoute) { }

  ngOnInit() {

    this.user = this.ls.getItem('user', true);
    this.eventDetails$ = Observable
      .interval(3000000)
      .startWith(0).switchMap(() => this.getEventDetails().map(res => {
        if (res.data) {
          this.eventDetails = res.data;
          this.matchBets = [];
          this.fancyBets = [];
          if (this.eventDetails && this.eventDetails.bets) {
            this.eventDetails.bets.forEach(bet => {
              if (bet.type === 'Match') {
                this.matchBets.push(bet);
              } else {
                this.fancyBets.push(bet);
              }
            });
          }
        }

      }));


    this.getEventBetHistory();

  }

  refreshEventDetails() {
    const user = this.ls.getItem('user', true);
    const payload: any = {};
    payload.command = 'listOdds';
    payload.sportId = 4;
    payload.eventMode = this.activeRouter.snapshot.queryParams.mode; //'inplay';
    payload.eventId = this.activeRouter.snapshot.params.id;
    payload.userType = user.userType;
    this.appHttp.post(API_CONFIG.EVENT_DETAILS, payload).subscribe(res => {
      if (res.data) {
        this.eventDetails = res.data;
        this.matchBets = [];
        this.fancyBets = [];
        if (this.eventDetails && this.eventDetails.bets) {
          this.eventDetails.bets.forEach(bet => {
            if (bet.type === 'Match') {
              this.matchBets.push(bet);
            } else {
              this.fancyBets.push(bet);
            }
          });
        }
      }
    })
  }

  eventStatus(event, status) {
    event.enabled = status;
    const payload: any = {};
    const user = this.ls.getItem('user', true);
    payload.command = 'toggleEvent';
    payload.requestData = {eventId : this.eventDetails.eventId, enable: status, updatedBy: user.userId};
    this.appHttp.post(API_CONFIG.EVENT_PLACE_BET, payload).subscribe(res => {      
    });
  }

  betStatus(bet, status) {
    bet.enabled = status;
    const payload: any = {};
    const user = this.ls.getItem('user', true);
    payload.command = 'toggleBet';
    payload.requestData = {eventId : this.eventDetails.eventId,betId: bet.id, enable: status, updatedBy: user.userId};
    this.appHttp.post(API_CONFIG.EVENT_PLACE_BET, payload).subscribe(res => {      
    });
  }

  getEventDetails(): Observable<any> {
    console.log('this.activeRouter.snapshot.params', this.activeRouter.snapshot.params);
    const user = this.ls.getItem('user', true);
    const payload: any = {};
    payload.command = 'listOdds';
    payload.sportId = 4;
    payload.eventMode = this.activeRouter.snapshot.queryParams.mode; //'inplay';
    payload.eventId = this.activeRouter.snapshot.params.id;
    payload.userType = user.userType;
    return this.appHttp.post(API_CONFIG.EVENT_DETAILS, payload);
  }

  getEventBetHistory() {
    const payload: any = {};
    const user = this.ls.getItem('user', true);
    payload.command = 'getUserOpenBets';
    payload.requestData = { userId: user.userId, eventId: this.activeRouter.snapshot.params.id };
    this.appHttp.post(API_CONFIG.EVENT_BET_HISTORY, payload).subscribe(res => {
      if (res.data) {
        this.matchBetsHistory = res.data.Match || [];
        this.fancyBetsHistory = res.data.Fancy || [];
      }
    })
  }

  placeBet(type: 'Back' | 'Lay') {
    const user = this.ls.getItem('user', true);
    console.log('this.currentBet -->', this.currentBet);
    console.log('this.currentBetOption', this.currentBetOption);
    console.log('this.stakeValue', this.stakeValue);
    const payload: any = {};
    payload.command = 'createBet';
    // payload.requestData = this.currentBet;
    const requestData: any = {};
    requestData.userId = user.userId;
    requestData.sportId = 4;
    requestData.eventId = this.eventDetails.eventId;
    requestData.eventTitle = this.eventDetails.eventTitle;
    requestData.eventMode = this.activeRouter.snapshot.queryParams.mode;
    requestData.betId = this.currentBet.id;
    requestData.betDescription = this.currentBet.description;
    requestData.betType = this.currentBet.type;
    requestData.betOptionId = this.currentBetOption.id;
    requestData.betOptionName = this.currentBetOption.description;
    requestData.betOptionType = type;//'Back';
    requestData.odds = this.currentBetOption.odds.back;
    if (type === 'Lay')
      requestData.odds = this.currentBetOption.odds.lay;
    requestData.stake = this.stakeValue;
    requestData.updatedBy = user.userId;
    payload.requestData = requestData;
    this.appHttp.post(API_CONFIG.EVENT_PLACE_BET, payload).subscribe(res => {
      this.modalRef.close();
      this.headerInfo.updateHeaderInfo();
      this.getEventBetHistory();
    });

  }

  onBack(back, bet, betOption) {
    this.stakeValue = 0;
    this.currentBet = bet;
    this.currentBetOption = JSON.parse(JSON.stringify(betOption));
    console.log('this.currentBet -->', this.currentBet);
    if(this.currentBet.type === 'Fancy') {
     // if(this.currentBetOption.odds.back < 1) {
        this.currentBetOption.odds.back = 2;
      // }
    }
    console.log('this.currentBetOption -->', this.currentBetOption);
    this.modalRef = this.modalService.open(back, {});
  }
  onLay(lay, bet, betOption) {
    this.stakeValue = 0;
    this.currentBet = bet;
    this.currentBetOption = betOption;
    this.modalRef = this.modalService.open(lay, {});
  }
  add() {
    this.stakeValue += 1;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.eventDetails$.unsubscribe();
    if(this.modalRef){
      this.modalRef.close();
    }

  }

}
