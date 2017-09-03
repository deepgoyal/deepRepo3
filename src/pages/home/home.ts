import {
  NavController,
  ModalController
} from 'ionic-angular';

import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import {
  Component
} from '@angular/core';
import {
  People
} from '../../providers/people/people'
import {
  DetailPage
} from '../detail/detail'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public allpeople = [];
  public people = [];
  public shouldReorder = false;

    searchTerm: string = '';
    searchControl: FormControl;
    searching: any = false;

  constructor(
    public navCtrl: NavController,
    public service: People,
    public modalCtrl: ModalController
  ) {
     this.service.getPeople().subscribe( //--------------See Later
      data => this.allpeople = data.items)
   this.searchControl = new FormControl();

    /* this.service.getPeople()
      .subscribe(
      data => this.people = data.items
     
     )*/



  }
    

      ionViewDidLoad() {
 
      this.service.getPeople().subscribe( //--------------See Later
      data => this.people = data.items)
   
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      
            this.searching = false;
            this.setFilteredItems();
 
        });
 
 
    }
 
    onSearchInput(){
        this.searching = true;
    }

     setFilteredItems() {
        this.people = this.filterItems(this.searchTerm);
 
    }

    filterItems(searchTerm){
        return this.allpeople.filter((item) => {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }
  
  /*
    doInfinite(infiniteScroll) {

     let nextpage=this.pageno++;
     console.log("next page:"+nextpage)
    this.service.getPeople().subscribe(
            data => {
                let posts=data.items.name
                for(let post of posts){
                    // console.log(post);
                    this.posts.push(post); 
                }

            },
            err => {
                console.log(err);
            },
            () => console.log('Next Page Loading completed')
        );
  infiniteScroll.complete();
    } */

  /*
  doInfinite(e) {
    this.service.getPeople()
      .subscribe(
      data => {
        this.people.push(...data.items);
      },
        err => console.log(err),
      () => e.complete()
      )
  }*/
  doRefresh(e) {
    this.service.getPeople()
      .subscribe(
      data => this.people.unshift(...data.items),
      err => console.log(err),
      () => e.complete()
      )
  }
  toggleReorder() {
    this.shouldReorder = !this.shouldReorder
  }

  pushPage(user) {
    // this.modalCtrl.create(DetailPage, user).present()
    this.navCtrl.push(DetailPage, user)
    // this.navCtrl.setPages([
    //   {page: HomePage},
    //   {page: DetailPage, params: this.people[5]},
    //   {page: HomePage},
    //   {page: DetailPage, params: user}
    // ])
  }

}
