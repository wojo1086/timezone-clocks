import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-analog-clock',
    templateUrl: './analog-clock.component.html',
    styleUrls: ['./analog-clock.component.sass'],
})
export class AnalogClockComponent implements OnInit {
    @Input() timezone: any;
    @ViewChild('hourHand', { static: true }) hourHand!: ElementRef;
    @ViewChild('minuteHand', { static: true }) minuteHand!: ElementRef;
    @ViewChild('secondHand', { static: true }) secondHand!: ElementRef;
    timezoneTimeString!: string;
    timezoneDateString!: string;

    constructor() {
    }

    ngOnInit(): void {
        this.setTime();
        interval(1000).subscribe(() => {
            this.setTime();
        });
    }

    setTime(): void {
        const localeString = new Date().toLocaleString('en-US', { timeZone: this.timezone.timezone.utc[0] });
        const date = new Date(localeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const hourDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        const minuteDeg = ((minutes / 60) * 360) + ((seconds /60 ) *6 ) + 90;
        const secondDeg = ((seconds / 60) * 360) + 90;
        this.hourHand.nativeElement.style.transform = `rotate(${hourDeg}deg)`;
        this.minuteHand.nativeElement.style.transform = `rotate(${minuteDeg}deg)`;
        this.secondHand.nativeElement.style.transform = `rotate(${secondDeg}deg)`;
        this.timezoneDateString = localeString.split(', ')[0];
        this.timezoneTimeString = localeString.split(', ')[1];

    }

}
