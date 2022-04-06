export class Survey {
  _id?: string
  FirstName?: string;
  LastName?: string;
  Title?: string;
  CreatedDate?: Date;
  ExpiryDate?: Date;
  Questions?: Array<any>;
  survey_id?:string;

  questions?: { "0": { Q: any; A: any }; "1": { Q: any; A: any }; "2": { Q: any; A: any }; "3": { Q: any; A: any }; "4": { Q: any; A: any } };
}

// export class QuestionSchema {
//   question?: string;
//   answer?: boolean
// }

