import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

interface QueryElement {
  id?: string;
  region?: number;
  key?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private queryElement: QueryElement = {
    id: null,
    key: null,
    region: null
  };

  private dataSubject$ = new BehaviorSubject(null);
  /* Platz für eine Pipe und die Backend Kommunikation */
  data$: Observable<QueryElement> = this.dataSubject$.asObservable();

  query() {
    this.dataSubject$.next(this.queryElement);
  }

  updateRegion(region: number) {
    this.queryElement = {
      ...this.queryElement,
      region
    };
    this.query();
  }
  updateKey(key: string) {
    this.queryElement = {
      ...this.queryElement,
      key
    };
    this.query();
  }
  updateId(dkz: string) {
    this.queryElement = {
      ...this.queryElement,
      id: dkz
    };
    this.query();
  }
}
