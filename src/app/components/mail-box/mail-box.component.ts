import { Component, Input } from '@angular/core';
import { SearchBarComponent } from '../../widgets/search-bar/search-bar.component';
import { CardComponent } from '@grv3101/my-card';

@Component({
  selector: 'app-mail-box',
  standalone: true,
  templateUrl: './mail-box.component.html',
  styleUrl: './mail-box.component.scss',
  imports: [SearchBarComponent, CardComponent],
})
export class MailBoxComponent {
  @Input() items: any[] = [];
  currentSelected!: number;

  ngOnChanges() {
    if (this.items?.length > 0) {
      this.currentSelected = this.items[0].id;
    }
  }
}
