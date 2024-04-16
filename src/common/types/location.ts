export interface IProvince {
  code: number;
  name: string;
  id: string;
  districts: IDistrict[];
}

export interface IDistrict {
  district_code: number;
  district_name: string;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: IWard[];
}
export interface IWard {
  ward_code: number;
  ward_name: string;
  codename: string;
  division_type: string;
  short_codename: string;
}

export interface ILocation {
  districts: IDistrict[];
  wards: IWard[];
}
