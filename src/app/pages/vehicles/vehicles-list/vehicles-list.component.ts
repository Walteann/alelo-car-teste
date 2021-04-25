import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AleloAlertService, VehiclesService } from 'src/app/core/services';
import { Vehicle } from 'src/app/shared/models';

@Component({
  selector: 'vehicles-list',
  templateUrl: 'vehicles-list.component.html'
})

export class VehiclesListComponent implements OnInit, OnDestroy {

  vehicles$: Observable<Vehicle[]>;
  form: FormGroup;
  idDelete = null;


  private page = 1;
  private limit = 10;

  private subscription: Subscription;

  constructor(
    private vehiclesService: VehiclesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private aleloAlertService: AleloAlertService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      filter: [null]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAdd(): void {
    this.router.navigate(['vehicles', 'new']);
  }

  onEdit(id: string): void {
    this.router.navigate(['vehicles', id, 'edit']);
  }

  onModalDelete(id: string): void {
    this.idDelete = id;
  }

  onConfirmDelete(id: string): void {
    if (id) {
      this.idDelete = null;
      this.deleteVehicle(id);
    } else {
      this.idDelete = id;
    }
  }

  ngOnInit() {
    this.vehicles$ = this.vehiclesService.getVehicles(this.page, this.limit);
  }

  searchPlate(page = 1): void {
    this.vehicles$ = this.vehiclesService.getVehicles(page, this.limit, this.form.value.filter);
  }

  pageChange(page: number): void {
    if (page) {
      this.page = Number(page);
      this.searchPlate(page);
    }
  }

  private deleteVehicle(id: string): void {
    this.subscription = this.vehiclesService.deleteVehicle(id)
      .subscribe(item => {
        this.aleloAlertService.messageSuccess('Vehicle deleted with success!');
        this.searchPlate(this.page);
      }, error => {
        this.aleloAlertService.messageError(error.error);
      });
  }

}
