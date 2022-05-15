import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
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
      .subscribe( res => this.languageObject = res.languageObject );
  }

}
