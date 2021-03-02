import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Power4, TimelineMax, TweenLite, gsap, Power0  } from 'gsap';
import * as $ from "jquery";

declare var VanillaTilt:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterContentInit {

  /**
   * Vars
   */
  homeAnimation = new TimelineMax();
  controller:any;

  constructor() { }

  ngOnInit(): void {
    this.initImageObserver('.fade-in');
    VanillaTilt.init(document.querySelector(".book"), { max: 25, speed: 400 });
  }

  ngAfterContentInit(){
  }

  initImageObserver(element:any){
    let elements = document.querySelectorAll(element);
    // IntersectionObserver Supported
    let config = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    let observer = new IntersectionObserver(this.onChange, config);
    elements.forEach(el => observer.observe(el));
  }

  onChange( changes:any , observer:any){
    changes.forEach((change:any) => {
      if (change.isIntersecting) {
        // Stop watching and load the image
        let animation = new TimelineMax();
        animation
          .to(change.target, 1.8, { opacity:1, bottom:0, ease:Power4.easeInOut }, 'first')
        animation.play();
      }
    });
  }
}