import { Component } from '@angular/core';

/**
 * Generated class for the ImportMemberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'import-member',
  templateUrl: 'import-member.html'
})
export class ImportMemberComponent {

  text: string;

  constructor() {
    console.log('Hello ImportMemberComponent Component');
    this.text = 'Hello World';
  }

}
