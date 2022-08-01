import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Power4, TimelineMax, TweenLite, gsap, Power0  } from 'gsap';
import * as $ from "jquery";
import { LanguageService } from 'src/app/services/language.service';
import { TypeformService } from 'src/app/services/typeform.service';
import { VideoService } from 'src/app/services/video.service';

declare var VanillaTilt:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  /**
   * Global Vars
   */

  mobileHelpText:string;

  /**
   * View child
   */
  @ViewChild('video1') video1: ElementRef;
  // @ViewChild('mainVideo') mainVideo: ElementRef;

  /**
   * Constructor
   * @param videoService 
   * @param _languageService 
   */
  constructor( 
    private videoService: VideoService,
    private _languageService: LanguageService,
    private _typeformService: TypeformService
  ) {}

  ngOnInit(): void {
    this.getLanguage();
    this._typeformService.loadScript();
  }

  ngAfterViewInit(){
    this.setVideoBehaviour();
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
        this.sliderContent = this.languageObject.homepage.section2["slider-content"];
        this.totalSlides = this.sliderContent.length;

        /**
         * Checking three cases of slide
         */
        this.checkSlideCases();
        
      });
  }

  /**
   * --------------------------------------------------------------------------------------------------------------------------------
   * Slider conf
   * --------------------------------------------------------------------------------------------------------------------------------
   */
  actualContent:any;
  sliderContent:any;
  sliderSeconds = [6,12,16];
  actualIndex = 0;
  totalSlides:number;
  isInLastSlide:boolean = false;

  /**
   * This method check for actual index to instantiate translated text. 
   */
  checkSlideCases(){
    if(this.actualIndex == 0 && this.isInLastSlide){
      this.actualContent = this.sliderContent[this.totalSlides - 1];
      this.setBallText(this.totalSlides, this.totalSlides);
    }

    if(this.actualIndex == 0 && !this.isInLastSlide){
      this.actualContent = this.sliderContent[this.actualIndex];
      this.setBallText(this.languageObject.homepage.section2["cursor-title"]);
    }

    if(this.actualIndex != 0){
      this.actualContent = this.sliderContent[this.actualIndex - 1];
      this.setBallText(this.actualIndex, this.totalSlides);
    }
  }

  /**
   * --------------------------------------------------------------------------------------------------------------------------------
   * Video conf
   * --------------------------------------------------------------------------------------------------------------------------------
   */
  dataLoaded = false;
  videoStarted = false;

  setVideoBehaviour(){
    this.initImageObserver('.fade-in');
    this.videoManipulation();
    // VanillaTilt.init(document.querySelector(".book"), { max: 25, speed: 400 });
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

  videoManipulation(){
    let video:any = document.getElementById('video1');
    let videoWrapper:any = document.getElementById('lq-video-2');
    
    videoWrapper.addEventListener("mouseover", this.animateOnMouseEnter);
    videoWrapper.addEventListener("mouseout", this.animateOnMouseOut);

    if (video.readyState === 4 ){
      console.log("Video fully loaded");
    }
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
      if(successMessage != 'reverseVideo'){
        this.actualContent = this.sliderContent[this.actualIndex];
        console.log("Life essentials", this.actualContent["life-essentials"]);
        this.fadeInCaption();
        this.setBallText(this.actualIndex + 1, this.totalSlides);
        this.toggleBallLoader();

        if( this.actualIndex >= this.sliderContent.length - 1 ){
          this.actualIndex = 0;
          this.isInLastSlide = true;
        }
        else
          this.actualIndex += 1;

      }else{
        this.setBallText(this.languageObject.homepage.section2["cursor-title"]);
        this.toggleBallLoader();
        this.actualIndex = 0;
        this.isInLastSlide = false;
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
    if(length){
      this.animationStarted = true;
      text = text + '/' + length;
      this.mobileHelpText = `${text} - Tap for next slide`;
      $('.ball').addClass("active");
    }

    if( text == "Click to play the experience"){
      this.animationStarted = false;
      $('.ball').removeClass("active");
    }

    TweenLite.to('.ball p', .4, { opacity: 0, marginTop: "-50px", ease:Power4.easeInOut });
    $('.ball p').text(text);
    TweenLite.to('.ball p', .4, { opacity: 1, marginTop: "0", ease:Power4.easeInOut });
  }

  toggleBallLoader(){
    $('.lq-video-2').toggleClass("loading");
    $('.ball').toggleClass("loading");
  }

  /**
   * --------------------------------------------------------------------------------------------------------------------------------
   * Image observer. TODO: create a service or js singleton script.
   * --------------------------------------------------------------------------------------------------------------------------------
   */
  animationStarted=false;

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
}