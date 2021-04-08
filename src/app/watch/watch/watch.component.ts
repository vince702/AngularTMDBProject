
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';
import {Subject} from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],

})

export class WatchComponent implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private http:HttpClient, private _Activatedroute:ActivatedRoute) { }
  id:any;
  type:any;
  overview:any;
  genres:any[];
  title:any;
  spoken_languages:any[];
  release_date:any[];
  runtime:any;
  vote_average:any;
  tagline:any;
  video_id:any;
  cast:any[];
  reviews:any[];
  similar:any[];
  recommended:string;
  buttontext:string = "Add to Watchlist";
  inwatchlist = true;


  ngOnInit(): void {


    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });




    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');


      console.log(this.id)

      var tv = ''
      if (this.type == 'tv'){
        tv = 'tv'
      }

      var url = 'https://tmdbuscapivc.wl.r.appspot.com/details' + tv + '?id=' + this.id;

      console.log(url)
      this.http.get<any>(url).subscribe(data => {
          console.log('da');
            var images = []
            var titles = []

            this.title = data['title']
            this.genres = data['genres']
            this.spoken_languages = data['spoken_languages']
            this.release_date = data['release_date']
            this.runtime = data['runtime']
            this.overview = data['overview']
            this.vote_average = data['vote_average']
            this.tagline = data['tagline']

            console.log(data)

      })

      var videourl = 'https://tmdbuscapivc.wl.r.appspot.com/video' + tv + '?id=' + this.id;

      console.log(videourl)
      this.http.get<any>(videourl).subscribe(data => {
        try {
          this.video_id = data[0]['key']
          this.video_id = this.video_id.replace('https://www.youtube.com/watch?v=', "");

        } catch (error) {
          console.error(error);
          this.video_id = 'HjlNHsMEXAg'
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }





        console.log("VIDEO ID")
        console.log(this.video_id)


      })

      var casturl = 'https://tmdbuscapivc.wl.r.appspot.com/cast' + tv + '?id=' + this.id;

      console.log(casturl)
      this.http.get<any>(casturl).subscribe(data => {


        for (var k = 0; k < data.length; k++){
          if (data[k]['profile_path'].includes('null')){
            data[k]['profile_path'] = 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png'
          }
        }
        this.cast = data
        console.log(data)

      })

      var reviewurl = 'https://tmdbuscapivc.wl.r.appspot.com/reviews' + tv + '?id=' + this.id;

      console.log(reviewurl)
      this.http.get<any>(reviewurl).subscribe(data => {


        for (var k = 0; k < data.length; k++){
         // this.reviews.push(data[k])
        }
        this.reviews = data;
        console.log("TTTTT")
        console.log(this.reviews)

      })



      var similarurl = 'similar' + tv + '?id=' + this.id;
      this.recommended = similarurl
      console.log("RECOMMENDED")
      console.log(this.recommended)



  });




  }
  public changeSuccessMessage() {
  if (this.inwatchlist == true){
    this._success.next(`Added to Watchlist`);
    this.buttontext = "Remove from Watchlist"
    this.inwatchlist = false;
  }
  else {
    this._success.next(`Removed from Watchlist`);
    this.buttontext = "Add to Watchlist"
    this.inwatchlist = true;
  }



  }
}
