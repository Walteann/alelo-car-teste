import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  findByErrorName(propertyName: string, control?: AbstractControl): string {
    let message: string = null;
    if ('required' === propertyName || 'empty' === propertyName) {
      message = 'field is required.';
    }

    return message;
  }

}
