export interface Parameter {
  ID: number;
  name: string;
  property: string;
  valueStr: string;
  value: number;
  rating: number;
}

export interface LineData {
  datetime: string;
  GCV: number;
  S1: number;
  S2: number;
  S3: number | null;
  S4: number | null;
}

export interface GraphData {
  ID: string;
  name: string;
  fromDate: string;
  toDate: string;
  type: { ID: number; name: string };
  parameters: Parameter[];
  lineData: LineData[];
}
