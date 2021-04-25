import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioForm } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { AleloAlertService, VehiclesService } from 'src/app/core/services';

@Component({
  selector: 'vehicles-form',
  templateUrl: 'vehicles-form.component.html'
})

export class VehiclesFormComponent implements OnInit, OnDestroy {

  title = 'Create Vehicle';

  plateLabel = 'Plate'

  form: FormGroup;

  radioValues: RadioForm[] = [
    { value: true, descricao: 'Active'},
    { value: false, descricao: 'Inactive'},
  ];

  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private aleloAlertService: AleloAlertService,
    private vehiclesService: VehiclesService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      plate: [null, [Validators.required]],
      model: [null, [Validators.required]],
      manufacturer: [null, [Validators.required]],
      color: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });

   }

  ngOnInit() {
    if (
        this.activatedRoute.snapshot &&
        this.activatedRoute.snapshot.params &&
        this.activatedRoute.snapshot.params.id) {
          this.title = 'Update Vehicle';
          this.plateLabel = 'Plate (Disabled)';
          this.getVehicleFindBy(this.activatedRoute.snapshot.params.id);
        } else {
          this.title = 'Create Vehicle';
          this.plateLabel = 'Plate';
        }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getVehicleFindBy(id: string): void {
    this.subscription = this.vehiclesService.findByIdVehicle(id)
      .subscribe(vehicle => {
        this.form.patchValue({
          ...vehicle
        });

        this.form.get('plate').disable();
      });
  }

  onSubmit(event): void {
    if (this.validate(this.form)) {
      if (this.activatedRoute.snapshot.params.id) {
        this.subscription = this.vehiclesService.updateVehicle(
            this.activatedRoute.snapshot.params.id, this.form.getRawValue())
        .subscribe(data => {
          this.aleloAlertService.messageSuccess('Vehicle updated with success!');
          this.navigateToList();
        }, error => {
          this.aleloAlertService.messageError(error.error);
        });
      } else {
        this.subscription = this.vehiclesService.createVehicle(this.form.getRawValue())
        .subscribe(data => {
            this.aleloAlertService.messageSuccess('Vehicle created with success!');
            this.navigateToList();
        }, error => {
            this.aleloAlertService.messageError(error.error);
        });
      }
    }
  }

  resetAll(): void {
    this.form.reset();
  }

  goBack(): void {
    this.router.navigate(['../'])
  }

  private navigateToList(): void {
    this.router.navigate(['vehicles', 'list']);
  }

  private validate(form: FormGroup | FormArray): boolean {
    Object.keys(form.controls).forEach((key: string) => {
      const control = form.controls[key];
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity({ emitEvent: true });

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.validate(control);
      }
    });

    return !form.invalid;
  }
}


