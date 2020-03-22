

export class FFQNutrientsRecommendations {
  questionnaireId: string;
  patientName: string;
  patientAge: number;
  recommendationsList: Recommendation[];


  constructor(questionnaireId: string, patientName: string, patientAge: number, recommendationsList: Recommendation[]) {
    this.questionnaireId = questionnaireId;
    this.patientName = patientName;
    this.patientAge = patientAge;
    this.recommendationsList = recommendationsList;
  }
}

export class Recommendation {
  nutrientName: string;
  calculatedAmount: number;
  recommendedAmount: number;
  status: string;

  constructor(nutrientName: string, calculatedAmount: number, recommendedAmount: number, status: string) {
    this.nutrientName = nutrientName;
    this.calculatedAmount = calculatedAmount;
    this.recommendedAmount = recommendedAmount;
    this.status = status;
  }
}

