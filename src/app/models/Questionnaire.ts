export class Questionnaire {
  questionnaireID: string;
  patientName: string;
  issuerID: string;
  date: string;
  submitted: boolean;

  constructor(questionnaireID: string, patientName: string, issuerID: string, date: string, submitted: boolean) {
    this.questionnaireID = questionnaireID;
    this.patientName = patientName;
    this.issuerID = issuerID;
    this.date = date;
    this.submitted = submitted;
  }

}
