import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Power4, TimelineMax, TweenLite, gsap, Power0  } from 'gsap';
import * as $ from "jquery";


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
  link: any;

  constructor() { }

  ngOnInit(): void {
    this.initImageObserver('.fade-in')
    this.initGooey();
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

  initGooey(){
    gsap.set(".ball", {xPercent: -50, yPercent: -50});

    const ball = document.querySelector(".ball");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.35;

    const xSet = gsap.quickSetter(ball, "x", "px");
    const ySet = gsap.quickSetter(ball, "y", "px");

    window.addEventListener("mousemove", e => {    
      mouse.x = e.x;
      mouse.y = e.y;  
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    this.link =  document.querySelectorAll('a:not( .no-animated )');
    this.link.forEach( (b:any) => b.addEventListener('mousemove', this.animateIt ));
    this.link.forEach( (b:any) => b.addEventListener('mouseleave', this.animateIt )); 
  }



  animateIt( this:any , e:any ){
    TweenLite.to( '.ball', 0.2 ,{ scale: 1.6, ease:'ease-out' });
    $(this).addClass("active")

    if (e.type === 'mouseleave') {
      $(this).removeClass("active")
      TweenLite.to( '.ball',0.2,{ scale: 1, ease:'ease-out' });
      TweenLite.to(this, 0.1 , {x:0, y:0, ease:Power0.easeNone });
    }
  }

}