interface ErrorDetail {
  CODE: string;
  MESSAGE: string;
}

export interface ErrorDictionary {
  [key: string]: {
    [key: string]: ErrorDetail;
  };
}
