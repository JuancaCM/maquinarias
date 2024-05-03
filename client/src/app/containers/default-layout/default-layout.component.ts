import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { Router } from '@angular/router';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public options = {
    position        : ['top', 'right'],
    timeOut         : 2000,
    lastOnBottom    : true,
    maxLength       : 0,
    showProgressBar : true,
    pauseOnHover    : true,
    clickToClose    : false
  };
  public username: String
  constructor(
    private router              : Router,
    private userSettingsService : UserSettingsService,
  ) {

    this.username = this.userSettingsService.getUserInfo().username;
    let userLogged = this.userSettingsService.getUserLogged();
    if (!userLogged.login) this.router.navigate(['/login']);

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  logoutApp() {
    this.userSettingsService.setUserLogged(false);
    this.router.navigate(['/login']);
  }
}
