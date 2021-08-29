import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { city } from 'src/app/mock/city.mock';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = city;
  filteredOptions!: Observable<string[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.buildLink();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  acceptCity(){
    this.apiService.loc$.next(this.myControl.value);
  }
  clientLocation(){
    this.apiService.getCity();
  }


}
