import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'menu-collapse',
  templateUrl: 'menu-collapse.component.html',
  styleUrls: ['./menu-collapse.component.scss']
})

export class MenuCollapseComponent {

  private isChange = false;

  @Output() isCollapsed = new EventEmitter(null);

  @ViewChild('menuCollapse', {static: false}) menuCollapse: ElementRef;


  changeCollapse(): void {
    if (this.menuCollapse) {
      this.menuCollapse.nativeElement.classList.toggle('change');
      this.isChange = !this.isChange;
       this.isCollapsed.emit(this.isChange)
    }
  }
}
