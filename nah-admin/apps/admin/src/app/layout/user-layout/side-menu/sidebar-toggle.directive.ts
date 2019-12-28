import { Directive, HostListener, Renderer2 } from '@angular/core';

/**
 * Allows the sidebar to be toggled via click.
 */
@Directive({
  selector: '[appSidebarToggle]',
})
export class SidebarToggleDirective {
  constructor(private renderer: Renderer2) {

  }

  // Check if element has class
  private hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
  }

  // Toggle element class
  private toggleClass(elem: any, elementClassName: string) {
    let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(elem, elementClassName)) {
      while (newClass.indexOf(' ' + elementClassName + ' ') >= 0) {
        newClass = newClass.replace(' ' + elementClassName + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
      elem.className += ' ' + elementClassName;
    }
  }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();

    if (this.hasClass(document.querySelector('body'), 'sidebar')) {
      this.toggleClass(document.querySelector('body'), 'sidebar-icons');
    }
    if (this.hasClass(document.querySelector('body'), 'sidebar-icons')) {
      this.renderer.removeClass(document.body, 'sidebar-hide');
    } else {
      this.renderer.addClass(document.body, 'sidebar-hide');
    }
    // if (this.hasClass(document.querySelector('body'), 'sidebar-overlay')) {
    //   this.toggleClass(document.querySelector('body'), 'sidebar-overlay-menu');
    // }
  }
}
export const SIDEBAR_TOGGLE_DIRECTIVES = [SidebarToggleDirective];
