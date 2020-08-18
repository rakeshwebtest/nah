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
        'label': 'Dashboard',
        'code': 'company-list',
        'icon': 'fa fa-dashboard',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Dashboard',
            'code': 'dashboard',
            'icon': 'fa fa-dashboard',
            'type': 'custom'
          }
        ]
      },     
      {
        'label': 'Noer Page',
        'code': 'posts',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Posts',
            'code': 'list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          },
          {
            'label': 'Topics',
            'code': 'topics',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      }, 
      {
        'label': 'Profile',
        'code': 'users',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Active Users',
            'code': 'active',
            'icon': 'fa fa-phone',
            'type': 'custom'
          },
          {
            'label': 'Blocked Users',
            'code': 'blocked',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      }, 
      {
        'label': 'Community',
        'code': '',
        'icon': 'fa fa-user',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Meetings',
            'code': 'meetings/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          },
          {
            'label': 'Groups',
            'code': 'groups/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          },
          {
            'label': 'Cities',
            'code': 'city/list',
            'icon': 'fa fa-phone',
            'type': 'custom'
          }
        ]
      },
      {
        'label': 'Reports',
        'code': 'reports',
        'icon': 'fa fa-copy',
        'app': 'zc-core',
        'childs': [
          {
            'label': 'Reports',
            'code': 'reports/list',
            'icon': 'fa fa-copy',
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
