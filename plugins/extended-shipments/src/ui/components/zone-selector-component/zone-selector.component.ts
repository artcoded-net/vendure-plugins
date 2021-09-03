import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormInputComponent } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { GetZones } from '@vendure/admin-ui/core';

@Component({
    selector: 'vdr-zone-selector',
    templateUrl: './zone-selector.component.html',
    styleUrls: ['./zone-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ZoneSelectorInputComponent implements FormInputComponent, OnInit {
    static readonly id: string = 'zone-selector';
    @Input() readonly: boolean;
    formControl: FormControl;
    zones$: Observable<GetZones.Zones[]>;
    config: any;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.zones$ = this.dataService.settings.getZones().mapStream(data => data.zones);
    }

    selectZone(zone: GetZones.Zones) {
        if(zone) this.formControl.setValue(zone.name);
    }
}
