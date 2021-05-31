import { Injectable } from '@angular/core';
import { Power4, TimelineMax } from 'gsap/all';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  values = [
    { startsAt:0, endsAt: 5 },
    { startsAt:6, endsAt: 10 },
    { startsAt:11, endsAt: 16 },
  ]

  video:any;
  actualIndex:number = 0;
  totalIndex:number;
  breakpoints:any;
  reversing:boolean=false;

  constructor() {}

  /**
   * Assign video to element
   * @param selector 
   * @param breakpoints 
   */
  assignVideo( selector:any, breakpoints:any ){
    this.video = document.getElementById(selector);
    this.totalIndex = breakpoints.length;
    this.breakpoints = breakpoints;
  }

  /**
   * Destroy video instance
   */
  destroyVideo(){
    
    this.fadeOut(this.video);
    let videoClone = this.video.cloneNode(true);
    this.video.parentNode.replaceChild(videoClone, this.video);
    this.totalIndex = 0;
    this.breakpoints = []
    this.fadeIn(this.video);
  }

  /**
   * Play video
   * @param slideResolve 
   */
  playCertainSeconds( slideResolve?:any ){

    let self = this;
    let listener = function(){
      console.log(this.currentTime);

      if((this.currentTime >= self.breakpoints[self.actualIndex]) && !self.reversing){  
        self.video.pause();
        
        if( slideResolve )
          slideResolve("resolveSlide");
            
        if( self.actualIndex == self.totalIndex - 1){
          self.reversing = true;
        }else{
          self.actualIndex += 1;          
          self.video.removeEventListener("timeupdate", listener);
        }  
      }
    }

    if(!self.reversing){
      self.video.muted = true;
      self.video.play();
    }

    if(!self.reversing)
      self.video.addEventListener("timeupdate", listener);

    if(self.reversing){
      self.video.removeEventListener("timeupdate", listener);

      let reverseVideoPromise = new Promise( resolveVideo => {
        self.reverseVideo(self.video, resolveVideo);
      });
      
      reverseVideoPromise.then( successReverseMessage => {
        self.reversing = false;
        self.actualIndex = 0;
        slideResolve(successReverseMessage);
      });
    }
  }

  /**
   * Reverse video function
   * @param element 
   * @param resolveVideo 
   */
  reverseVideo( element:any, resolveVideo:any ){
    let reverse = setInterval(function() {   
      element.currentTime = element.currentTime - 0.1; 

      if (element.currentTime <= 0){
        resolveVideo("reverseVideo");
        clearInterval( reverse );
      }
    }, 50); 
  }


  fadeOut( el:any ){
    let videoFade = new TimelineMax();
    videoFade
      .to(el, 1.2, { opacity:0, ease: Power4.easeInOut });
  }

  fadeIn( el:any ){
    let videoFade = new TimelineMax();
    videoFade
      .to(el, 1.2, { opacity:2, ease: Power4.easeInOut });
  }
}
