
import { Component,Input, ViewChild, OnInit,ElementRef } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.css']
})

export class MultiComponent implements OnInit {



  @Input()
  name: string ;

  constructor(private http:HttpClient) {

  }

  images : any[][];
  titles : any[][];
  types: any[][];
  ids : any[][]
  type:string;
  watching:any;

  ngOnInit(): void {

    if (this.name.includes("ContinueWatching")){

      try {
        var watching = localStorage.getItem('viewed');
        console.log("VIEWED")
        console.log(watching)
        this.watching=String(watching).split('^')
        this.watching = this.watching.slice(1);
        this.watching = '[' +  this.watching + ']';
        if (this.watching == ''){
          this.watching = 'kk';
        }
        this.watching=eval(this.watching);

        this.watching.reverse();
        var titles = []
        var images = [];
        var ids = [];
        var types = [];

        for (var i = 0; i < this.watching.length; i++){
          images.push(this.watching[i]['poster_path'])
          titles.push(this.watching[i]['title'])
          ids.push(this.watching[i]['id'])
          types.push(this.watching[i]['type'])




        //console.log(this.watching)


        }
        const newArr = [];
        while(images.length) newArr.push(images.splice(0,6));
        for (var k = newArr[newArr.length-1].length; k < 6; k++ ){
          newArr[newArr.length-1].push('')
        }
        const newArr1 = [];
        while(titles.length) newArr1.push(titles.splice(0,6));
        for (var k = newArr1[newArr1.length-1].length; k < 6; k++ ){
          newArr1[newArr1.length-1].push('')
        }

        const newArr2 = [];
        while(ids.length) newArr2.push(ids.splice(0,6));
        for (var k = newArr2[newArr2.length-1].length; k < 6; k++ ){
          newArr2[newArr2.length-1].push('')
        }

        const newArr3 = [];
        while(types.length) newArr3.push(types.splice(0,6));
        for (var k = newArr3[newArr3.length-1].length; k < 6; k++ ){
          newArr3[newArr3.length-1].push('')
        }

        //this.ids = newArr2
        this.ids = newArr2
        this.types = newArr3
        this.titles = newArr1
        this.images = newArr



        return;


        //this.watching=this.watching[0]['id']

    }
    catch(error){
      this.watching = "kk"

    }

      return;
    }











    if (this.name.includes('tv')){
      this.type = 'tv';
    }
    else{
      this.type='movie';
    }

    var url = 'https://tmdbuscapivc.wl.r.appspot.com/' + this.name
    console.log(url)

    this.http.get<any>(url).subscribe(data => {
      console.log('da');
        var images = []
        var titles = []
        var ids = []
        console.log(data[0]['poster_path'])
        for (var i = 0; i < data.length; i++){
          var url = data[i]['poster_path']
          //url = url.replace('w500', "original");
          var title = data[i]['name']
          var id = data[i]['id']

          images.push(url)
          titles.push(title)
          ids.push(id)






        }


        const newArr = [];
        while(images.length) newArr.push(images.splice(0,6));
        for (var k = newArr[newArr.length-1].length; k < 6; k++ ){
          newArr[newArr.length-1].push('')
        }
        const newArr1 = [];
        while(titles.length) newArr1.push(titles.splice(0,6));
        for (var k = newArr1[newArr1.length-1].length; k < 6; k++ ){
          newArr1[newArr1.length-1].push('')
        }

        const newArr2 = [];
        while(ids.length) newArr2.push(ids.splice(0,6));
        for (var k = newArr2[newArr2.length-1].length; k < 6; k++ ){
          newArr2[newArr2.length-1].push('')
        }

        //this.ids = newArr2
        this.ids = newArr2

        this.titles = newArr1
        this.images = newArr

    })



  }







  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

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
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnChanges() {

    if (this.name.includes("ContinueWatching")){
      return;
    }

    console.log(name)
    if (this.name.includes('tv')){
      this.type = 'tv';
    }
    else{
      this.type='movie';
    }

    var url = 'https://tmdbuscapivc.wl.r.appspot.com/' + this.name
    console.log(url)

    this.http.get<any>(url).subscribe(data => {
      console.log('da');
        var images = []
        var titles = []
        var ids = []
        console.log(data[0]['poster_path'])
        for (var i = 0; i < data.length; i++){
          var url = data[i]['poster_path']
          //url = url.replace('w500', "original");
          var title = data[i]['name']
          var id = data[i]['id']

          images.push(url)
          titles.push(title)
          ids.push(id)






        }


        const newArr = [];
        while(images.length) newArr.push(images.splice(0,6));
        for (var k = newArr[newArr.length-1].length; k < 6; k++ ){
          newArr[newArr.length-1].push('')
        }
        const newArr1 = [];
        while(titles.length) newArr1.push(titles.splice(0,6));
        for (var k = newArr1[newArr1.length-1].length; k < 6; k++ ){
          newArr1[newArr1.length-1].push('')
        }

        const newArr2 = [];
        while(ids.length) newArr2.push(ids.splice(0,6));
        for (var k = newArr2[newArr2.length-1].length; k < 6; k++ ){
          newArr2[newArr2.length-1].push('')
        }

        //this.ids = newArr2
        this.ids = newArr2

        this.titles = newArr1
        this.images = newArr

    })





  }


}

