import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Vehicle } from 'src/app/shared/models';

const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class VehiclesService {
  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService
  ) { }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(API_URL + '/vehicle');
  }

  getVehicles(page = 1, limit = 10, filter?: string): Observable<Vehicle[]> {
    this.loadingService.loadingBehavior.next(true);
    let params = new HttpParams({
      fromObject: {
        page: String(page),
        limit: String(limit)
      }
    });

    if (filter) {
      params = params.append('filter', filter);
    }

    return this.httpClient.get<Vehicle[]>(API_URL + '/vehicle', { params })
      .pipe(
        finalize(() => this.loadingService.loadingBehavior.next(false))
      );
  }

  createVehicle(body: Vehicle): Observable<Vehicle> {
    this.loadingService.loadingBehavior.next(true);
    return this.httpClient.post<Vehicle>(API_URL + '/vehicle', body)
      .pipe(finalize(() => this.loadingService.loadingBehavior.next(false)));
  }

  updateVehicle(id: string, body: Vehicle): Observable<Vehicle> {
    this.loadingService.loadingBehavior.next(true);
    return this.httpClient.put<Vehicle>(`${API_URL}/vehicle/${id}`, body)
      .pipe(finalize(() => this.loadingService.loadingBehavior.next(false)));
  }

  findByIdVehicle(id: string): Observable<Vehicle> {
    this.loadingService.loadingBehavior.next(true);
    return this.httpClient.get<Vehicle>(`${API_URL}/vehicle/${id}`)
      .pipe(finalize(() => this.loadingService.loadingBehavior.next(false)));
  }

  deleteVehicle(id: string): Observable<Vehicle> {
    this.loadingService.loadingBehavior.next(true);
    return this.httpClient.delete<Vehicle>(`${API_URL}/vehicle/${id}`)
      .pipe(finalize(() => this.loadingService.loadingBehavior.next(false)));
  }

}
