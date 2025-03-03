import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  countries: any[] = [];
  errorMessage: string = '';

  constructor(public rest: RestService, public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...'
    });
    await loading.present();
    await this.rest.getCountries()
      .subscribe(
        countries => {
          this.countries = countries.sort(
            (a, b) => a.name.official.localeCompare(b.name.official)
          );
          loading.dismiss();
        },
        error => {this.errorMessage = error as any; loading.dismiss(); });
  }
}
