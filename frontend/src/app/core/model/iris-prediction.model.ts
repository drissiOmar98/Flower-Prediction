// Define the structure for the input data (features)
export interface IrisPredictionRequest {
  features: number[];  // Array of numeric values for the features (sepal length, sepal width, petal length, petal width)
}

// Define the structure for the response data (predicted species)
export interface IrisPredictionResponse {
  prediction: string;  // Predicted species (e.g., 'Iris-setosa', 'Iris-versicolor', 'Iris-virginica')
}
