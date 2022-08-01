import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { TypeformService } from 'src/app/services/typeform.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private _typeformService: TypeformService,
    private _languageService: LanguageService
  ) {
    this.getLanguage();
  }

  ngOnInit(): void {
    this._typeformService.loadScript();
  }
  /**
   * --------------------------------------------------------------------------------------------------------------------------------
   * Language conf
   * --------------------------------------------------------------------------------------------------------------------------------
   */
   languageObject:any;

   getLanguage(){
     this._languageService.language$
       .subscribe( (res:any) => {
         this.languageObject = res.languageObject;
       });
   }

}
