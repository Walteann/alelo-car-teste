import { ChangeDetectorRef, Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ErrorService } from 'src/app/core/services';

@Component({
  selector: 'alelo-error',
  templateUrl: './alelo-error.component.html'
})
export class AleloErrorComponent implements OnInit {
  @Input() control: FormControl;

  show: Observable<boolean>;

  constructor(private cdr: ChangeDetectorRef, private errorService: ErrorService) {}

  ngOnInit(): void {
    if (this.control) {
      this.control.statusChanges.subscribe(status => {
        const { invalid, touched, dirty } = this.control;

        this.show = of(invalid && (touched || dirty));
        this.cdr.detectChanges();
      });
    }
  }

  get text(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
        return this.errorService.findByErrorName(propertyName, this.control);
      }
    }

    return null;
  }
}
