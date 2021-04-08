
import { Component, ViewChild, OnInit,ElementRef } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css'],
  providers: [NgbCarouselConfig]
})



export class CarouselBasicComponent implements OnInit {

  constructor(private http:HttpClient, config: NgbCarouselConfig) {
    config.interval = 10000;
  }

  images : string[] = [];
  titles : string[] = [];
  ids: string[] = [];
  tottalAngularPackages= '';

  ngOnInit(): void {
    //var val = this.http.get('https://api.themoviedb.org/3/search/multi?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&query=game');

    this.http.get<any>('https://tmdbuscapivc.wl.r.appspot.com/current').subscribe(data => {
      console.log('da');
        var images = []
        var titles = []
        var ids = []
        console.log(data[0]['poster_path'])
        for (var i = 0; i < 5; i++){
          var url = data[i]['backdrop_path']
          url = url.replace('w500', "original");
          var title = data[i]['name']
          images.push(url)
          titles.push(title)

          var id = data[i]['id']
          ids.push(id)


        }
        this.titles = titles
        this.images = images
        this.ids = ids
    })
    //this.images.push(eval(String(val)));
    //console.log(val);

  }








  paused = false;

  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = false;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  @ViewChild('el') h3: ElementRef;

  togglePaused() {
    if (this.paused) {
      this.h3.nativeElement.setAttribute("style", "background-color: red;");
      this.carousel.cycle();
    } else {
      this.h3.nativeElement.setAttribute("style", "background-color: red;");

      this.carousel.pause();

    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}

