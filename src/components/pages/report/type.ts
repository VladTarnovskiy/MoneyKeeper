export type Data = Array<{ color: string; title: string; value: string; width: string }>;

export interface ReportDataItem {
  color: string;
  title: string;
  value: number;
  width: string;
}

export interface ProgressWidth {
  lengthTitle: number;
  lengthValue: number;
}
