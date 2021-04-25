import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/shared/models';

@Component({
  selector: 'vehicles-table',
  templateUrl: 'vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss']
})

export class VehiclesTableComponent implements OnInit {

  @Input() vehicles: Vehicle[];
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter(null);
  @Output() pageChange = new EventEmitter(null);

  currentPage = 1;

  pagination = [1, 2, 3, 4, 5];

  ngOnInit() { }

  onEdit(id: string): void {
    this.edit.emit(id);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  next(): void {
    this.currentPage++;
    this.pageChoied(this.currentPage);
    this.pagination = this.pagination.map(elem => elem += 1);
  }

  prev(): void {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.pageChoied(this.currentPage);
      this.pagination = this.pagination.map(elem => elem -= 1);
    }
  }

  pageChoied(page): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}
