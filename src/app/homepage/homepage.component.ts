import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  watching:any;

  constructor() { }

  ngOnInit(): void {
    //localStorage.clear();

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



  }
  catch(error){
    this.watching = "kk"

  }
  }

}
