import { Component, OnInit } from '@angular/core';
import { Timezones } from '../../assets/json/timezones/timezones';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage-service/storage.service';
import { Router } from '@angular/router';
import { from, map, Observable, timer } from 'rxjs';

@Component({
    selector: 'app-add-timezone',
    templateUrl: './add-timezone.component.html',
    styleUrls: ['./add-timezone.component.sass']
})
export class AddTimezoneComponent implements OnInit {
    timezones = Timezones;
    timezoneForm!: FormGroup
    showSuccess = false;
    timezones$!: Observable<any[]>;

    constructor(private storageService: StorageService, private router: Router) {
    }

    ngOnInit(): void {
        this.initTimezonesObs();
        this.initiateForm();
    }

    goBack(): void {
        this.router.navigateByUrl('');
    }

    addTimezone(): void {
        if (this.timezoneForm.invalid) {
            return;
        }
        const saveObj = {
            label: this.timezoneForm.get('label')?.value,
            timezone: this.timezoneForm.get('timezone')?.value
        };
        this.storageService.get('timezones').then(val => {
            if (val.timezones) {
                val.timezones.push(saveObj);
            } else {
                val.timezones = [saveObj];
            }
            this.storageService.set('timezones', val.timezones);
            this.timezoneForm.reset();
            Object.keys(this.timezoneForm.controls).forEach(key => {
                this.timezoneForm.controls[key].setErrors(null)
            });
            this.showSuccess = true;
            this.initTimezonesObs();
            timer(3000).subscribe(() => {
                this.showSuccess = false;
            });
        });
    }

    deleteTimezone(tz: any): void {
        this.storageService.get('timezones').then(vals => {
            const index = vals.timezones.findIndex((val: any) => val.label === tz.label && val.timezone.text === tz.timezone.text);
            vals.timezones.splice(index, 1);
            this.storageService.set('timezones', vals.timezones);
            this.initTimezonesObs();
        });
    }

    private initTimezonesObs(): void {
        this.timezones$ = from(this.storageService.get('timezones')).pipe(
            map(val => val.timezones)
        );
    }

    private initiateForm(): void {
        this.timezoneForm = new FormGroup({
            label: new FormControl(''),
            timezone: new FormControl('', [Validators.required])
        });
    }


}
