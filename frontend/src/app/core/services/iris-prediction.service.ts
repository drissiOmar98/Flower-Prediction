import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IrisPredictionRequest, IrisPredictionResponse} from "../model/iris-prediction.model";
import {State} from "../model/state.model";

@Injectable({
  providedIn: 'root'
})
export class IrisPredictionService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/predict'; //  Flask API URL


  // Initialize signal
  private predict$: WritableSignal<State<IrisPredictionResponse>> = signal(State.Builder<IrisPredictionResponse>().forInit());
  predictSig = computed(()=>this.predict$())


  // Method to make the prediction request
  predict(request: IrisPredictionRequest): void {
    // Make POST request to Flask API with the features in the body
    this.http.post<IrisPredictionResponse>(this.apiUrl, request).subscribe({
      next: (prediction) => {
        // On success, update the signal with success state and the prediction result
        this.predict$.set(State.Builder<IrisPredictionResponse>().forSuccess(prediction));
      },
      error: (err) => {
        // On error, update the signal with error state and the error information
        const errorMessage = err.error?.error || 'An unknown error occurred.';
        this.predict$.set(State.Builder<IrisPredictionResponse>().forError(errorMessage));
      }
    });
  }

  resetIrisPrediction(): void {
    this.predict$.set(State.Builder<IrisPredictionResponse>().forInit())
  }

  constructor() { }
}
