import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GlobalMembersService {
  public configValues: string[] = [];
  constructor(private http: Http) {
    this.configValues.length = 0;
    this.http.get('./assets/config/config.json').subscribe(values => {
      this.configValues = values.json() as string[];
    });
  }
  
  private _isMasterLayoutVisible: boolean = false;
  setMasterLayoutVisiblity(val: boolean) {
    this._isMasterLayoutVisible = val;
  }
  getMasterLayoutVisiblity() {
    return this._isMasterLayoutVisible;
  }

  authUser(): boolean {
    return !(this._isMasterLayoutVisible);
  }
}
