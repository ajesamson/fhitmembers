import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class MemberImportProvider {
  previewUpdated = new Subject();
  constructor() {}
}
