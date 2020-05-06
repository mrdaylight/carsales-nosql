import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientModule } from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ICar } from '../interfaces/cars';

@Injectable()

export class CarApiService {
// Service wrapper around the native firestores SDK's
// CollectionREefernece and Query types.

carsDataCollection: AngularFirestoreCollection<ICar>;
// respresnetation of any set of cars over any amount of time
carsData: Observable<ICar[]>;

// Array to hold all cars
allCarsData: ICar[];

errorMessage: string;

constructor(private _http: HttpClient, private _afs:AngularFirestore) {
// connect to the database
this.carsDataCollection = _afs.collection<ICar>('cars_data');
}

getCarData(): Observable<ICar[]> {
this.carsData = this.carsDataCollection.valueChanges();
this.carsData.subscribe(data => console.log('getCarsData:' + JSON.stringify(data)))
return this.carsData;
}

addCarData(car: ICar): void {
this.carsDataCollection.add(JSON.parse(JSON.stringify(car)));
}

private handleError(err: HttpErrorResponse) {
console.log('CarApiService: ' + err.message);
return Observable.throw(err.message);
}

}
