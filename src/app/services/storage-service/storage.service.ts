import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

declare const chrome: any;

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    set(key: string, value: any): void {
        const obj: { [key: string]: any } = {};
        obj[key] = value;
        if (environment.production) {
            chrome.storage.sync.set(obj);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (environment.production) {
                chrome.storage.sync.get(key, resolve);
            } else {
                resolve({timezones: JSON.parse(localStorage.getItem(key) || '{}')});
            }

        });
    }
}
