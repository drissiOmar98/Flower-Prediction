import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IrisPredictionComponent} from "./features/iris-prediction/iris-prediction.component";


export const routes: Routes = [
  { path: '', redirectTo: '/iris-prediction', pathMatch: 'full' }, // Redirect to IrisPredictionComponent
  { path: 'iris-prediction', component: IrisPredictionComponent }, // Add route for IrisPredictionComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
