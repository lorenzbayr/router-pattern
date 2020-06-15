import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {v4} from 'uuid';
import {DataService} from '../services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  data$: Observable<any> = this.dataService.data$;

  ngOnInit(): void {
    this.dataService.updateId(this.activatedRoute.snapshot.params.id);
    this.dataService.updateRegion(this.activatedRoute.snapshot.queryParams.region);
    this.dataService.updateKey(this.activatedRoute.snapshot.queryParams.key);
  }

  async updateId() {
    const newId = v4();
    this.dataService.updateId(newId);
    await this.router.navigate([`extraPfad/${newId}`], {
      queryParams: this.currentQueryParams()
    });
  }
  async updateRegion() {
    const newRegion = Math.random();
    this.dataService.updateRegion(newRegion);
    await this.updateQueryParams({ region: newRegion });
  }
  async updateKey() {
    const newKey = v4();
    this.dataService.updateKey(newKey);
    await this.updateQueryParams({ key: newKey });
  }

  async clearQueryParams() {
    this.dataService.updateKey(null);
    this.dataService.updateRegion(null);
    await this.updateQueryParams({
      region: null,
      key: null
    });
  }
  async updateQueryParams(queryParams: Params) {
    await this.router.navigate(this.currentPath(), {
      queryParams: {
        ...this.currentQueryParams(),
        ...queryParams
      }
    });
  }
  private currentPath(): string[] {
    return this.activatedRoute.snapshot.url.map(el => el.path);
  }
  private currentQueryParams(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }

}
