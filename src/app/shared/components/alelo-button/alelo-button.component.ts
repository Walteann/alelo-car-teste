import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alelo-button',
  templateUrl: 'alelo-button.component.html',
  styleUrls: ['./alelo-button.component.scss']
})

export class AleloButtonComponent implements OnInit {

  @Input() value: string = 'value';
  @Input() className: string = 'default';

  constructor() { }

  ngOnInit() { }
}
