import { Component, OnInit } from '@angular/core';
import { TypeformService } from 'src/app/services/typeform.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private _typeformService: TypeformService
  ) { }

  ngOnInit(): void {
    this._typeformService.loadScript();
  }

  showTypeForm(){
  }

}
