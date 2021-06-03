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
  animationStarted=false;
  mobileHelpText:string;

  /**
   * LQ slider content
   */
  sliderContent = [
    {
      "header": "Introduction",
      "parraph1": "When we think about life balance, we think about work and family life; but you may have been ignoring your physical, spiritual, mental, emotional, and relaxation needs. Once you begin working on those forgotten areas, the ones you usually obsess over will improve almost by themselves.",
      "parraph2": "Think of your life like a wheel; the more balanced it is, the better it will roll.",
      "life_essential": [24.8,89.9,12.1,8.7,19.2,74,7.3]
    },
    {
      "header": "What we usually do",
      "parraph1": "People try to convince themselves that once they have their career or family life under control, they can then make time for health, spirituality, personal growth, and soon. They feel this way until they experience a significant event in their life that wakes them up.",
      "parraph2":"This trigger could be a health crisis, a job loss, the death of a close friend, or simply feeling that their life is empty of meaning.",
      "life_essential": [24.8,89.9,12.1,8.7,19.2,74,7.3]
    },
    {
      "header": "What we should be doing",
      "parraph1": "But once we decide to give enough attention to all aspects of our lives, we become all-around better and we’ll notice everything falling into place smoothly.",
      "parraph2":"Our integral well-being will be specially noticeable in the areas we care most about.",
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
        this.setBallText("Click to play the experience");
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
}