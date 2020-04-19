import { TrackerResultsResponse } from './trackerresultsresponse';

export class TrackerParentResultsResponse {
    ffqtracker: TrackerResultsResponse;
    parentName: string;
  
    constructor(ffqtracker: TrackerResultsResponse, parentName: string) {
      this.ffqtracker = ffqtracker;
      this.parentName = parentName;
    }
  }