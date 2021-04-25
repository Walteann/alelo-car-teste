import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {

  loadingBehavior = new BehaviorSubject(false)

}
