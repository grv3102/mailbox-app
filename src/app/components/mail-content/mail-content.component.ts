import { Component } from '@angular/core';
import { UserImageComponent } from '../../widgets/user-image/user-image.component';
import { MessageBarComponent } from '../../widgets/message-bar/message-bar.component';

@Component({
  selector: 'app-mail-content',
  standalone: true,
  templateUrl: './mail-content.component.html',
  styleUrl: './mail-content.component.scss',
  imports: [UserImageComponent, MessageBarComponent],
})
export class MailContentComponent {}
