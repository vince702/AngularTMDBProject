import { Component, OnInit, Input,ViewEncapsulation} from '@angular/core';


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-actor-modal',
  templateUrl: './actor-modal.component.html',

  styles: [`
    .my-custom-class .tooltip-inner {
      background-color: white;
      color:darkgray;
      font-size: 125%;
    }
    .my-custom-class .arrow::before {
      border-top-color: white;
    }
  `]
})
export class ActorModalComponent implements OnInit {

  @Input()
  id: string ;
  @Input()
  name: string ;

  @Input()
  profile_path: string ;

  @Input()
  character: string ;

  birthday:any;
  gender:any;
  also_known_as:any;
  homepage:any;
  known_for_department:any;
  biography:any;
  facebook:any;
  twitter:any;
  imdb:any;
  instagram:any;




  closeResult = '';

  constructor(private http:HttpClient,private modalService: NgbModal) {}

  ngOnInit(): void {

    var url = 'https://tmdbuscapivc.wl.r.appspot.com/castdetail?id=' + this.id;
    this.http.get<any>(url).subscribe(data => {

      this.birthday = data['birthday']
      this.gender = data['gender']

      this.also_known_as = data['also_known_as']
      this.biography = data['biography']
      this.homepage = data['homepage']
      this.known_for_department = data['known_for_department']

    })

    var url = 'https://tmdbuscapivc.wl.r.appspot.com/castexternalid?id=' + this.id;
    this.http.get<any>(url).subscribe(data => {

      this.imdb = data['imdb_id']
      this.facebook = data['facebook_id']
      this.instagram = data['instagram_id']
      this.twitter = data['twitter_id']

    })


  }




  open(content:any) {
    this.modalService.open(content, {size:'lg',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
