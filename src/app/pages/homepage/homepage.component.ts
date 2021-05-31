import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Power4, TimelineMax, TweenLite, gsap, Power0  } from 'gsap';
import * as $ from "jquery";
import { VideoService } from 'src/app/services/video.service';

declare var VanillaTilt:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterContentInit, AfterViewInit {

  /**
   * Vars
   */
  homeAnimation = new TimelineMax();
  controller:any;

  /**
   * LQ slider content
   */
  sliderContent = [
    {
      "header": "About",
      "parraph1": "When we think about life balance, we think about work and family life; but you may have been ignoring your physical, spiritual, mental, emotional, and relaxation needs. Once you begin working on those forgotten areas, the ones you usually obsess over will improve almost by themselves.",
      "parraph2": "Think of your life like a wheel; the more balanced it is, the better it will roll.",
      "life_essential": [24.8,89.9,12.1,8.7,19.2,74,7.3]
    },
    {
      "header": "About2",
      "parraph1": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt dicta similique animi architecto qui sit, quidem impedit. Neque tempora deserunt assumenda facere cum fugit distinctio in fugiat, beatae aliquam. Quidem!",
      "parraph2":"",
      "life_essential": [24.8,89.9,12.1,8.7,19.2,74,7.3]
    },
    {
      "header": "About3",
      "parraph1": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt dicta similique animi architecto qui sit, quidem impedit. Neque tempora deserunt assumenda facere cum fugit distinctio in fugiat, beatae aliquam. Quidem!",
      "parraph2":"",
      "life_essential": [24.8,89.9,12.1,8.7,19.2,74,7.3]
    }
  ]

  sliderSeconds = [8,16,22];

  actualContent = {
    "header": "About",
    "parraph1": "When we think about life balance, we think about work and family life; but you may have been ignoring your physical, spiritual, mental, emotional, and relaxation needs. Once you begin working on those forgotten areas, the ones you usually obsess over will improve almost by themselves.",
    "parraph2": "Think of your life like a wheel; the more balanced it is, the better it will roll.",
    "life_essential": [24.8,89.9,12.1,8.7,19.2,74,7.3]
  }

  actualIndex = 0;
  totalSlides = this.sliderContent.length;

  /**
   * Video Vars
   */
   dataLoaded = false;
   videoStarted = false;

  @ViewChild('video1') video1: ElementRef;

  constructor( private videoService: VideoService ) {
  }

  ngOnInit(): void {
    this.initImageObserver('.fade-in');
    this.videoManipulation();
    VanillaTilt.init(document.querySelector(".book"), { max: 25, speed: 400 });
  }

  ngAfterContentInit(){
  }

  ngAfterViewInit(){
    this.video1.nativeElement.onloadeddata = (event:any) => {
      console.log('Video data is loaded.');
      this.dataLoaded = true;

      /**
       * Play first 4 seconds, update on viewport interceptor
       */
      this.videoService.assignVideo("video1", this.sliderSeconds);
      
    };

    

    this.video1.nativeElement.onplaying = (event:any) => {
        console.log('Video is no longer paused.');
        this.videoStarted = true;
    };
  }

  initImageObserver(element:any){
    let elements = document.querySelectorAll(element);
    // IntersectionObserver Supported
    let config:any = {
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

  videoManipulation(){
    let video:any = document.getElementById('video1');
    let videoWrapper:any = document.getElementById('lq-video-2');
    
    videoWrapper.addEventListener("mouseover", this.animateOnMouseEnter);
    videoWrapper.addEventListener("mouseout", this.animateOnMouseOut);

    if (video.readyState === 4 ){
      console.log("Video fully loaded");
    }
  }

  animateOnMouseEnter(){
    $(".ball").addClass("hovering-home-video");
  }

  animateOnMouseOut(){
    $(".ball").removeClass("hovering-home-video");
  }

  changeSlide(){
    this.toggleBallLoader();
    this.fadeOutCaption();

    let videoPromise = new Promise( resolve => {
      this.videoService.playCertainSeconds( resolve )
    })

    videoPromise.then( successMessage => {
      console.log(successMessage)
      if(successMessage != 'reverseVideo'){
        this.actualContent = this.sliderContent[this.actualIndex];
        this.fadeInCaption();
        this.setBallText(this.actualIndex + 1, this.totalSlides);
        this.toggleBallLoader();

        if( this.actualIndex >= this.sliderContent.length - 1 )
          this.actualIndex = 0;
        else
          this.actualIndex += 1;

      }else{
        this.setBallText("Play");
        this.toggleBallLoader();
        this.actualIndex = 0;
        this.videoService.destroyVideo();
        this.videoService.assignVideo("video1", this.sliderSeconds);
      }
    })
  }

  fadeOutCaption(){
    let sliderAnimation = new TimelineMax();
    sliderAnimation
      .to('.slide-caption', 1.2, { opacity:0, ease: Power4.easeInOut });
  }

  fadeInCaption(){
    let sliderAnimation = new TimelineMax();
    sliderAnimation
      .to('.slide-caption', 1.2, { opacity:1, ease: Power4.easeInOut });
  }

  setBallText(text:any, length?:any){
    if(length)
      text = text + '/' + length;
    
    TweenLite.to('.ball p', .4, { opacity: 0, marginTop: "-50px", ease:Power4.easeInOut });
    $('.ball p').text(text);
    TweenLite.to('.ball p', .4, { opacity: 1, marginTop: "0", ease:Power4.easeInOut });
  }

  toggleBallLoader(){
    $('.ball').toggleClass("loading");
  }
}