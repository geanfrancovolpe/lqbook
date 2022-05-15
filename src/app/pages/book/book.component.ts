import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  languageObject:any;

  constructor(
    private _languageService: LanguageService
  ) { 
    this.getLanguage();
  }

  ngOnInit(): void {
  }

  getLanguage(){
    this._languageService.language$.subscribe( res => this.languageObject = res.languageObject);
  }

}
