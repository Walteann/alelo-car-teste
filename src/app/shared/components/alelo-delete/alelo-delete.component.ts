import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'alelo-delete',
  templateUrl: 'alelo-delete.component.html',
  styleUrls: ['./alelo-delete.component.scss']
})

export class AleloDeleteComponent {

  @Input() messageDelete: string = '';
  @Input() idDelete = null;

  @Output() response = new EventEmitter();


  onConfirm(): void {
    this.response.emit(this.idDelete);
  }

  onCancel(): void {
    this.response.emit(null);
  }
}
