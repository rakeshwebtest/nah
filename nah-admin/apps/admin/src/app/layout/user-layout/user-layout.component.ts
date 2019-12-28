import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../utils/local-storage.service';
import { HeaderInfoService } from '../../services/header-info.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  public navIsFixed = false;
  menuState = 'text-view';
  userInfo:any = {};
  headerInfo = {
    availableAmount: 0,
    liabilityAmount: 0
  };
  constructor(private renderer: Renderer2, private router: Router,
    private hdInfo: HeaderInfoService,
    private ls: LocalStorageService) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (window.pageYOffset > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset < 20) {
      this.navIsFixed = false;
    }
  }
  ngOnInit() {
    // this.userInfo = this.ls.getItem('user',true);
    // this.hdInfo.getHeaderInfo().subscribe(result => {
    //   console.log('header info', result);
    //   if (result.data) {
    //     this.headerInfo = result.data;
    //   }
    // })
    // this.hdInfo.updateHeaderInfo();
  }
  // Check if element has class
  private hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
  }
  /**
  // * @memberof AdminLayoutComponent
  */
  toggleMenu() {
    // 1-line if statement that toggles the value:
    // this.menuState = this.menuState === 'show-menu' ? 'hide-menu' : 'show-menu';
    if (this.hasClass(document.querySelector('body'), 'show-menu')) {
      this.renderer.removeClass(document.body, 'show-menu');
      this.renderer.addClass(document.body, 'hide-menu');
    } else {
      this.renderer.addClass(document.body, 'show-menu');
      this.renderer.removeClass(document.body, 'hide-menu');
    }
    // if (window.innerWidth <= 800) {
    //   if (this.hasClass(document.querySelector('body'), 'show-menu')) {
    //     this.renderer.removeClass(document.body, 'show-menu');
    //     this.renderer.addClass(document.body, 'hide-menu');
    //   } else {
    //     this.renderer.addClass(document.body, 'hide-menu');
    //   }
    // }
  }
  logout() {
    this.ls.removeItem('user');
    this.router.navigate(['/login']);
  }

}
