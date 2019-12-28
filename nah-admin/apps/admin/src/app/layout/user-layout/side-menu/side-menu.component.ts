import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { LocalStorageService } from '../../../utils/local-storage.service';
// import { UserService } from '../../../services/user.service';
export interface MenuConfig {
  label?: string;
  code?: string;
  app?: string;
  icon?: string;
  type?: string;
  childs?: MenuConfig[];
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  menuState = 'out';
  menu: MenuConfig[];
  userInfo: any = {};
  @Input() menuStyle: any;
  constructor(private ls: LocalStorageService, private renderer: Renderer2) {
    // this.userService.menu();
    // private userService: UserService
  }
  /**
   * This method help to setup menu from api
   *
  //  * @memberof SideMenuComponent
   */
  ngOnInit() {
    // this.userService.menu().subscribe(res => {
    //   if (res) {
    //     this.menu = res;
    //   }
    // });
    // this.userInfo = this.ls.getItem('user',true);
    // console.log('this.userInfo',this.userInfo);
    // if (this.userInfo.userType === 'USER') {
    //   this.menu = [
    //     {
    //       'label': 'Dashboard',
    //       'code': 'company-list',
    //       'icon': 'fa fa-users',
    //       'app': 'zc-core',
    //       'childs': [
    //         {
    //           'label': 'Dashboard',
    //           'code': 'dashboard',
    //           'icon': 'fa fa-circle',
    //           'type': 'custom'
    //         }
    //       ]
    //     }
    //   ];
    // } else {
    //   this.menu = [
    //     {
    //       'label': 'Dashboard',
    //       'code': 'company-list',
    //       'icon': 'fa fa-users',
    //       'app': 'zc-core',
    //       'childs': [
    //         {
    //           'label': 'Dashboard',
    //           'code': 'dashboard',
    //           'icon': 'fa fa-circle',
    //           'type': 'custom'
    //         }
    //       ]
    //     },
    //     {
    //       'label': 'Open Bets',
    //       'code': 'company-list',
    //       'icon': 'fa fa-users',
    //       'app': 'zc-core',
    //       'childs': [
    //         {
    //           'label': 'Open Bets',
    //           'code': 'open-bets',
    //           'icon': 'fa fa-circle',
    //           'type': 'custom'
    //         }
    //       ]
    //     },
    //     {
    //       'label': 'Users',
    //       'code': 'user',
    //       'icon': 'fa fa-user',
    //       'app': 'zc-core',
    //       'childs': [
    //         {
    //           'label': 'Users',
    //           'code': 'user/list',
    //           'icon': 'fa fa-phone',
    //           'type': 'custom'
    //         }
    //       ]
    //     },
    //     {
    //       'label': 'Add User',
    //       'code': 'user',
    //       'icon': 'fa fa-user-plus',
    //       'app': 'zc-core',
    //       'childs': [
    //         {
    //           'label': 'Users',
    //           'code': 'user/create',
    //           'icon': 'fa fa-phone',
    //           'type': 'custom'
    //         }
    //       ]
    //     }
    //   ];
    // }
    this.menu = [
      {
        'label': 'Users',
        'code': 'user',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Users',
            'code': 'users/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      },
      {
        'label': 'Groups',
        'code': 'groups',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Groups',
            'code': 'groups/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      },
      {
        'label': 'Meetings',
        'code': 'meetings',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Groups',
            'code': 'meetings/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      },
      {
        'label': 'City',
        'code': 'city',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'City',
            'code': 'city/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      }
    ];
  }
  // Check if element has class
  private hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(
      target.className
    );
  }
  menuClose() {
    if (window.innerWidth <= 767) {
      if (this.hasClass(document.querySelector('body'), 'show-menu')) {
        this.renderer.removeClass(document.body, 'show-menu');
        this.renderer.removeClass(document.body, 'stage-menu-open');
      } else {
        this.renderer.addClass(document.body, 'show-menu');
      }
    }
  }
}
