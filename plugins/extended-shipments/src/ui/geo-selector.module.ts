import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@vendure/admin-ui/core';
import { registerFormInputComponent } from '@vendure/admin-ui/core';
import { ZoneSelectorInputComponent } from './components/zone-selector-component/zone-selector.component';
import { CountrySelectorInputComponent } from './components/country-selector-component/country-selector.component';

@NgModule({
  imports: [NgSelectModule, FormsModule, SharedModule],
  declarations: [ZoneSelectorInputComponent, CountrySelectorInputComponent],
  providers: [
    registerFormInputComponent('zone-selector', ZoneSelectorInputComponent),
    registerFormInputComponent('country-selector', CountrySelectorInputComponent),
  ]
})
export class GeoSelectorModule {}