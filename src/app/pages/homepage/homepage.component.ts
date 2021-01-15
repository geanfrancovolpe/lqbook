import { AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterContentInit {

  /**
   * Vars
   */

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(){
  }

}
