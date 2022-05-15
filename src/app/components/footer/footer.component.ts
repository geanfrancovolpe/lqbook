import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  languageObject:any;

  constructor(
    private _languageService: LanguageService
  ) {
    this.getLanguage();
   }

  ngOnInit(): void {
  }

  getLanguage(){
    this._languageService.language$
      .subscribe( (res:any) => this.languageObject = res.languageObject);
  }

}
