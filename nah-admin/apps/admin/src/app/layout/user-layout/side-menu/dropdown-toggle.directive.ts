import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavDropdown]'
})
export class NavDropdownDirective {

  constructor(private el: ElementRef) { }

  toggle() {
    this.el.nativeElement.classList.toggle('open');
  }
}


@Directive({
  selector: '[appNavDropdownToggle]'
})
export class NavDropdownToggleDirective {
  constructor(private dropdown: NavDropdownDirective) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    const data = document.querySelector('body ul li.nav-dropdown.open');
    this.dropdown.toggle();
    // if (data && data.classList) {
    //   data.classList.remove('open');
    // }
  }
}
export const NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];
