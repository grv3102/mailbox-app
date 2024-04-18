import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MailContentComponent } from './components/mail-content/mail-content.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { UserImageComponent } from './widgets/user-image/user-image.component';
import { SearchBarComponent } from './widgets/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    SideMenuComponent,
    MailContentComponent,
    MailBoxComponent,
    UserImageComponent,
    SearchBarComponent,
  ],
})
export class AppComponent implements OnDestroy {
  isCollapsed = false;
  items: any[] = [];
  loading = false;
  private currentChunk = 0;
  private chunkSize = 50;
  private worker: Worker | null = null;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor() {
    this.setupWorker();
  }

  ngOnInit(): void {
    this.requestDataChunk(this.currentChunk);
  }

  setupWorker(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./app.worker', import.meta.url), {
        type: 'module',
      });
      this.worker.onmessage = ({ data }) => {
        this.items = this.items.concat(JSON.parse(data));
        this.loading = false;
      };
    } else {
      console.log('Web Workers are not supported in this environment.');
    }
  }

  requestDataChunk(chunk: number): void {
    this.loading = true;
    this.worker?.postMessage({
      action: 'requestData',
      chunk,
      chunkSize: this.chunkSize,
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!this.loading) {
        this.currentChunk++;
        this.requestDataChunk(this.currentChunk);
      }
    }
  }

  ngOnDestroy(): void {
    this.worker?.terminate();
  }
}
