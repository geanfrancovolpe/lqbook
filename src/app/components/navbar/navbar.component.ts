import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  language:any;
  languageObject:any;

  constructor( private _languageService: LanguageService ) { }

  ngOnInit(): void {
    this.getLanguage();
  }

  getLanguage(){
    this._languageService.language$
      .subscribe( (res:any) => {
        this.language = res.actualLanguage;
        this.languageObject = res.languageObject;
      });
  }

  changeLanguage(){
    let nextLanguage:string;
    this.language == 'ENG' ? nextLanguage = 'ES' : nextLanguage = 'ENG';
    this._languageService.language = nextLanguage;
  }

}
