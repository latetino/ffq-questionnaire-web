export class TrackerResultsResponse {
  userId: string;
  date: string;
  responses: any;

  constructor(userId: string, date: string, responses: any) {
    this.userId = userId;
    this.date = date;
    this.responses = responses;
  }
}