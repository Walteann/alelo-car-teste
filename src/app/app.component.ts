import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('menuSideBar', {static: false}) menuSideBar: ElementRef;

  title = 'alelo-frota';
  loading$: Observable<boolean>;

  constructor(
    private loading: LoadingService
  ) {

  }

  ngAfterViewInit(): void {
    this.loading$ = this.loading.loadingBehavior.asObservable().pipe(delay(0));
  }


}
