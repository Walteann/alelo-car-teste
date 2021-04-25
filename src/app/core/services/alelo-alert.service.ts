import { Injectable, Pipe } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})

export class AleloAlertService {
  constructor(
    private toastr: ToastrService
  ) { }


  messageSuccess(messagem: string): void {
    this.toastr.success(messagem, 'Success!');
  }

  messageError(messagem: string): void {
    this.toastr.error(messagem, 'Error!');
  }

}
