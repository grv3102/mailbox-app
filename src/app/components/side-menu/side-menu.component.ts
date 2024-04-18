import { Component } from '@angular/core';
import { UserImageComponent } from '../../widgets/user-image/user-image.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  imports: [UserImageComponent],
})
export class SideMenuComponent {}
