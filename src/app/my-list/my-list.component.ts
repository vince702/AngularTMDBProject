import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(private http:HttpClient) { }
  watching:any;
  poster_path:any;
  title:any;


  ngOnInit(): void {


    try {
      var watching = localStorage.getItem('watching');
      this.watching=String(watching).split('^')
      this.watching = this.watching.slice(1);
      this.watching = '[' +  this.watching + ']';
      if (this.watching == ''){
        this.watching = 'kk';
      }
      this.watching=eval(this.watching);


      for (var i = 0; i < this.watching.length; i++){






      console.log(this.watching)


      }






      //this.watching=this.watching[0]['id']

  }
  catch(error){
    this.watching = "kk"

  }
}



}
