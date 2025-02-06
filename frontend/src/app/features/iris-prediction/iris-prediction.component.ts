import {Component, effect, inject} from '@angular/core';
import {ToastService} from "../../core/services/toast.service";
import {IrisPredictionService} from "../../core/services/iris-prediction.service";
import {State} from "../../core/model/state.model";
import {IrisPredictionRequest, IrisPredictionResponse} from "../../core/model/iris-prediction.model";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-iris-prediction',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './iris-prediction.component.html',
  styleUrl: './iris-prediction.component.scss'
})
export class IrisPredictionComponent {

  predictService = inject(IrisPredictionService);
  toastService = inject(ToastService);
  // Holds the value or error of the prediction
  predictionResult: IrisPredictionResponse | null = null;
  errorMessage: string | null = null;

  features: number[] = [0, 0, 0, 0];

  loadingPrediction = false;

  constructor() {
    this.listenIrisPrediction();
  }





  // Method to call the prediction service
  onPredict() {
    this.errorMessage = null; // Clear any previous errors
    this.predictionResult = null; // Reset previous prediction result
    this.loadingPrediction = true; // Show loading state

    const request: IrisPredictionRequest = { features: this.features };
    this.predictService.predict(request); // Call the prediction service
  }



  listenIrisPrediction() {
    // Start a reactive effect. This will run automatically whenever the reactive signals it depends on (in this case, predictSig) change.
    effect(() => {
      const predictedIrisState = this.predictService.predictSig();
      if (predictedIrisState.status === 'OK') {
        this.onCreateOk(predictedIrisState);
      } else if (predictedIrisState.status === 'ERROR') {
        this.onCreateError(predictedIrisState);
      }
    });
  }

  onCreateOk(predictedIrisState: State<IrisPredictionResponse>) {
    this.loadingPrediction = false;
    this.predictionResult = predictedIrisState.value || null;

    this.toastService.send({
      severity: 'success',
      summary: 'Success',
      detail: 'IRIS Flower predicted successfully.',
    });
  }

  private onCreateError(predictedIrisState: State<IrisPredictionResponse>) {
    this.loadingPrediction = false;
    this.errorMessage = predictedIrisState.error?.message || 'An unknown error occurred.';
    this.toastService.send({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not predict your Iris Flower, please try again.',
    });
  }

  // Reset form and prediction state
  onReset() {
    this.features = [0, 0, 0, 0]; // Clear input fields
    this.predictionResult = null; // Clear prediction result
    this.errorMessage = null; // Clear any error messages
    this.predictService.resetIrisPrediction(); // Reset the prediction service state
  }

  // Toggle between Predict and Reset
  onAction() {
    if (this.loadingPrediction) return; // Prevent action while loading
    if (this.predictionResult) {
      this.onReset(); // Reset form if there's a previous result
    } else {
      this.onPredict(); // Make a prediction if there's no result yet
    }
  }



}
