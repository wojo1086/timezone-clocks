import { Component, OnInit } from '@angular/core';
import {TIMEZONES} from '../../assets/json/timezones/timezones';

@Component({
    selector: 'app-add-timezone',
    templateUrl: './add-timezone.component.html',
    styleUrls: ['./add-timezone.component.sass']
})
export class AddTimezoneComponent implements OnInit {
    timezones = TIMEZONES;

    constructor() {
    }

    ngOnInit(): void {
    }

}
