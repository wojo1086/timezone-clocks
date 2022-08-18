import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service/storage.service';
import { from, map, Observable, tap } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    timezones$: Observable<any[]> = from(this.storageService.get('timezones')).pipe(
        map(val => val.timezones),
        map(tzs => {
            tzs.forEach((tz: any) => {
                tz.label = !!tz.label ? tz.label : tz.timezone.text.split(') ')[1];
            });
            return tzs;
        })
    );

    constructor(private router: Router,
                private storageService: StorageService) {

    }

    ngOnInit(): void {
    }

    addTimezone(): void {
        this.router.navigateByUrl('/add-timezone');
    }

}
