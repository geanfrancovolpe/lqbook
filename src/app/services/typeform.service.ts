import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeformService {

  constructor() { }

  loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}
