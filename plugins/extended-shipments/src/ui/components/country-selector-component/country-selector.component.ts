import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { FormInputComponent } from "@vendure/admin-ui/core";
import { DataService } from "@vendure/admin-ui/core";
import { GetCountryList } from "@vendure/admin-ui/core";
import { map } from "rxjs/operators";

@Component({
  selector: "vdr-country-selector",
  templateUrl: "./country-selector.component.html",
  styleUrls: ["./country-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CountrySelectorInputComponent
  implements FormInputComponent, OnInit
{
  static readonly id: string = "country-selector";
  @Input() readonly: boolean;
  formControl: FormControl;
  countries$: Observable<GetCountryList.Items[]>;
  config: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.countries$ = this.dataService.settings
      .getCountries(999)
      .mapStream((data) => data.countries.items)
      .pipe(map((countries) => countries.filter((c) => c.enabled)));
  }

  selectCountry(country: GetCountryList.Items) {
    if (country) this.formControl.setValue(country.code);
  }
}
