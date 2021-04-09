
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
  similar:string;
  recommended:string;
  video_url:any;

  buttontext:string = "Add to Watchlist";
  inwatchlist = true;
  messagetype:string = 'success'
  poster_path:any;
  tv = '';


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
        this.tv = 'tv'
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
            this.release_date = data['release_date'].substring(0,4);
            this.runtime = data['runtime']


            this.runtime = Number(this.runtime)
            var hours = Math.floor(this.runtime/60)
            var minutes = this.runtime%60

            if (hours == 1){
              this.runtime = String(hours) + "hr " + String(minutes) + "mins"

            }
            else{
              this.runtime = String(hours) + "hrs " + String(minutes) + "mins"

            }



            this.overview = data['overview']
            this.vote_average = data['vote_average']
            this.tagline = data['tagline']
            this.poster_path = data['poster_path']

            console.log(data)


            try {
              var watching = localStorage.getItem('watching');
              watching=String(watching)
              var watching_add = '^' +'{' +  '"type":' + '"' + tv + '"' + ',' + '"id":' + this.id + ',' + '"poster_path":' + '"' + data['poster_path'] + '"' + ',' + '"title":' + '"' + data['title'] + '"'  +'}' ;
              if (!watching.includes(watching_add)){
                this.buttontext = "Add to Watchlist"
                this.inwatchlist = true;
                this.inwatchlist = true;
                watching += watching_add
              }
              else{
                this.buttontext = "Remove from Watchlist"
                this.inwatchlist=false;
              }
              watching=watching.replace('null','')
              watching=watching.replace('^^null','')




            }
            catch (error) {
              localStorage.setItem('watching', this.id );
            }



            try {
              var watching = localStorage.getItem('viewed');
              watching=String(watching)
              var watching_add = '^' +'{' +  '"type":' + '"' + this.tv + '"' + ',' + '"id":' + this.id + ',' + '"poster_path":' + '"' + this.poster_path + '"' + ',' + '"title":' + '"' + this.title + '"'  +'}' ;
              if (!watching.includes(watching_add)){
                watching += watching_add
              }
              else{

              }
              watching=watching.replace('null','')
              watching=watching.replace('^^null','')
              localStorage.setItem('viewed', String(watching));
              //console.log("WATCHING: " + viewed);


            }
            catch (error) {
              var watching_add = '^' +'{' +  '"type":' + '"' + this.tv + '"' + ',' + '"id":' + this.id + ',' + '"poster_path":' + '"' + this.poster_path + '"' + ',' + '"title":' + '"' + this.title + '"'  +'}' ;
              localStorage.setItem('watching_add ', this.id );


            }







      })

      var videourl = 'https://tmdbuscapivc.wl.r.appspot.com/video' + tv + '?id=' + this.id;

      console.log(videourl)
      this.http.get<any>(videourl).subscribe(data => {
        try {
          this.video_id = data[0]['key']
          this.video_url = data[0]['key']
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
      var montharray= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

      var reviewurl = 'https://tmdbuscapivc.wl.r.appspot.com/reviews' + tv + '?id=' + this.id;

      console.log(reviewurl)
      this.http.get<any>(reviewurl).subscribe(data => {


        for (var k = 0; k < data.length; k++){
         // this.reviews.push(data[k])
          var timestamp = data[k]['created_at']
          var time = timestamp.substring(11,19)
          var date = timestamp.substring(0,10)
          var month = Number(date.substring(5,7))
          var year = date.substring(0,4)
          var day = date.substring(8,10)
          var hour = Number(time.substring(0,2))
          var rest = time.substring(2,9)
          var pm = 'AM'
          if (hour >= 12){
            pm = 'PM'
          }
          if (hour > 12){
            hour -=12
          }





          data[k]['created_at'] = montharray[month] +' ' +  day  + ', ' + year  + ', ' + String(hour) + rest + ' '+ pm







        }






        this.reviews = data;
        console.log("TTTTT")
        console.log(this.reviews)

      })



      var recurl = 'recs' + tv + '?id=' + this.id;
      this.recommended = recurl

      var simurl = 'similar' + tv + '?id=' + this.id;
      this.similar = simurl




      console.log("RECOMMENDED")
      console.log(this.recommended)




















  });




  }
  public changeSuccessMessage() {
  if (this.inwatchlist == true){
    this.messagetype="success"
    this._success.next(`Added to Watchlist`);
    this.buttontext = "Remove from Watchlist"
    this.inwatchlist = false;





    try {
      var watching = localStorage.getItem('watching');
      watching=String(watching)
      var watching_add = '^' +'{' +  '"type":' + '"' + this.tv + '"' + ',' + '"id":' + this.id + ',' + '"poster_path":' + '"' + this.poster_path + '"' + ',' + '"title":' + '"' + this.title + '"'  +'}' ;
      if (!watching.includes(watching_add)){
        watching += watching_add
      }
      else{
        this.buttontext = "Remove from Watchlist"
        this.inwatchlist=false;
      }
      watching=watching.replace('null','')
      watching=watching.replace('^^null','')
      localStorage.setItem('watching', String(watching));
      console.log("WATCHING: " + watching);


    }
    catch (error) {
      localStorage.setItem('watching', this.id );
    }










  }
  else {
    this.messagetype="danger"

    this._success.next(`Removed from Watchlist`);
    this.buttontext = "Add to Watchlist"
    this.inwatchlist = true;

    try {
      var watching = localStorage.getItem('watching');
      watching=String(watching)
      var watching_add = '^' +'{' +  '"type":' + '"' + this.tv + '"' + ',' + '"id":' + this.id + ',' + '"poster_path":' + '"' + this.poster_path + '"' + ',' + '"title":' + '"' + this.title + '"'  +'}' ;
      if (!watching.includes(watching_add)){
        watching =watching.replace(watching_add, '')
      }
      else{
        watching =watching.replace(watching_add, '')
      }
      watching=watching.replace('null','')
      watching=watching.replace('^^null','')
      localStorage.setItem('watching', String(watching));
      console.log("WATCHING: " + watching);


    }

    catch (error) {
      localStorage.setItem('watching', this.id );
    }




  }



  }
}
