export interface GetDateRecordRequest {
  yearMonth: string;
  date: number;
}
export interface PutDateRecordRequest {
  yearMonth: string;
  studyRecordId: string;
  date: number;
}

export interface DateRecord {
  date?: number;
  studyRecords?: string[];
  totalTime: number;
  feedTime: number;
  sleepCount: number;
  phoneCount: number;
  postureCount: number;
}

export interface PrevRecord {
  date: Date;
  totalTime: number;
  feedTime: number;
  sleepCount: number;
  phoneCount: number;
  postureCount: number;
}
