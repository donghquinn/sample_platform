export interface ResultData {
  ypercen: string;
  opercen: string;
  tpercen: string;
  mpercen: string;
  spercen: string;
  epercen: string;
  hpercen: string;
  lpercen: string;
}

export interface ReturnData extends ResultData {
  name: string;
  type: string;
  // tmType: string;
}
