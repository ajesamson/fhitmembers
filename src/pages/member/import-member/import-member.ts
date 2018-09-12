import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as papa from 'papaparse';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-import-member',
  templateUrl: 'import-member.html'
})
export class ImportMemberPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http
  ) {}

  ionViewDidLoad() {
    this.readCsv();
  }

  private readCsv() {
    this.http.get('assets/templates/members.csv')
      .subscribe(
        data => ImportMemberPage.extractData(data),
        err => ImportMemberPage.handleError(err)
      )
  }

  static extractData(res) {
    let csvData = res['_body'] || [];
    let parsedData = papa.parse(csvData).data;

    console.log(parsedData[0]); // header
    console.log(parsedData[1]) // content
  }

  static handleError(err) {
    console.error(err);
  }
}
