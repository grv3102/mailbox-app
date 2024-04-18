import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserImageComponent } from '../user-image/user-image.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [UserImageComponent, CommonModule],
})
export class CardComponent {
  @Input() userData!: any;
  @Input() currentSelected!: number;
  @Output() selectionChange = new EventEmitter<number>();

  onSelect(value: any) {
    this.selectionChange.emit(value);
  }
  userImage = '/src/assets/png/image1.png';
}
