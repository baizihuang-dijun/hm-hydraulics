export interface HmtRow {
  model: string;
  rotation: number;
  drivingNm: number;
  holdingNm: number;
  weightKg: number;
}

export interface HmtCrossRef {
  hmModel: string;
  comparable: string;
  carrierWeight: string;
  notes?: string;
}

export interface HmtSeries {
  code: 'A' | 'D';
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  crossReference: string;
  crossRefs: HmtCrossRef[];
  rows: HmtRow[];
}

// 来源：assets/02_HMT样册结构化数据库_v1_20261020.md
// HMT-A = 工厂 DTA 家族（190 bar，100°/140°/180° 三档角度），公开端不展示 DTA/DTB 上游型号。
export const HMT_A: HmtSeries = {
  code: 'A',
  title: 'HMT-A Tilt Motor',
  image: '/images/products/hmt-a-tilt-motor-v2.jpg',
  imageAlt:
    'HMT-A tilt motor for excavator tilt coupler applications',
  description:
    'Standard tilt motor series for excavator tilt couplers. Twelve frame sizes cover micro to 50-ton excavators, with 100° / 140° / 180° rotation options at 190 bar. Driving and holding torque ratings are taken directly from the factory catalogue; exact mounting interface is confirmed against your machine drawing on inquiry.',
  crossReference:
    'Comparable class: HKS BVC / BVE series tilt actuators. Exact model match is confirmed against your unit tag and mounting drawing on inquiry.',
  crossRefs: [
    { hmModel: 'HMT-A-01', comparable: 'HKS BVC / BVE 100', carrierWeight: '<1.8' },
    { hmModel: 'HMT-A-02', comparable: 'HKS BVC / BVE 115', carrierWeight: '1.8~3.8' },
    { hmModel: 'HMT-A-03', comparable: 'HKS BVC / BVE 125', carrierWeight: '3~5.5' },
    { hmModel: 'HMT-A-04', comparable: 'HKS BVC / BVE 130', carrierWeight: '4~6.8' },
    { hmModel: 'HMT-A-05', comparable: 'HKS BVC / BVE 160', carrierWeight: '6.5~9' },
    { hmModel: 'HMT-A-06', comparable: 'HKS BVC / BVE 180', carrierWeight: '8.5~11' },
    { hmModel: 'HMT-A-07', comparable: 'HKS BVC / BVE 240', carrierWeight: '11~18', notes: 'S5415 / S5416' },
    { hmModel: 'HMT-A-08', comparable: 'HKS BVC / BVE 250', carrierWeight: '15~23', notes: 'S5418 / S5419' },
    { hmModel: 'HMT-A-09', comparable: 'HKS BVC / BVE 260', carrierWeight: '22~26', notes: 'S5421 / S5422' },
    { hmModel: 'HMT-A-10', comparable: 'HKS BVC / BVE 270', carrierWeight: '25~29', notes: 'S5424 / S5425' },
    { hmModel: 'HMT-A-11', comparable: 'HKS BVC / BVE 300', carrierWeight: '28~38', notes: 'S5427' },
    { hmModel: 'HMT-A-12', comparable: 'HKS BVC / BVE 350', carrierWeight: '37~50', notes: 'S5430' },
  ],
  // Representative row per frame: 180° where available; A-11/A-12 use 140° (factory does not offer 180°).
  rows: [
    { model: 'HMT-A-01', rotation: 180, drivingNm: 800, holdingNm: 2100, weightKg: 22 },
    { model: 'HMT-A-02', rotation: 180, drivingNm: 1100, holdingNm: 4300, weightKg: 52 },
    { model: 'HMT-A-03', rotation: 180, drivingNm: 2000, holdingNm: 6600, weightKg: 62 },
    { model: 'HMT-A-04', rotation: 180, drivingNm: 4300, holdingNm: 11000, weightKg: 70 },
    { model: 'HMT-A-05', rotation: 180, drivingNm: 7400, holdingNm: 17500, weightKg: 104 },
    { model: 'HMT-A-06', rotation: 180, drivingNm: 6950, holdingNm: 16500, weightKg: 149 },
    { model: 'HMT-A-07', rotation: 180, drivingNm: 10500, holdingNm: 34000, weightKg: 206 },
    { model: 'HMT-A-08', rotation: 180, drivingNm: 16000, holdingNm: 40000, weightKg: 264 },
    { model: 'HMT-A-09', rotation: 180, drivingNm: 20000, holdingNm: 43000, weightKg: 344 },
    { model: 'HMT-A-10', rotation: 180, drivingNm: 23000, holdingNm: 54000, weightKg: 414 },
    { model: 'HMT-A-11', rotation: 140, drivingNm: 33000, holdingNm: 90000, weightKg: 622 },
    { model: 'HMT-A-12', rotation: 140, drivingNm: 43000, holdingNm: 100000, weightKg: 760 },
  ],
};

// HMT-D = 工厂 DTD 家族（210 bar；02–05 为 180°，06–08 为 120°），公开端不展示 DTC/DTD 上游型号。
export const HMT_D: HmtSeries = {
  code: 'D',
  title: 'HMT-D Tilt Motor',
  image: '/images/products/hmt-d-tilt-motor-v1.jpg',
  imageAlt:
    'HMT-D tilt motor for high holding-torque excavator tilt coupler applications',
  description:
    'High holding-torque tilt motor series at 210 bar. Seven frame sizes cover 1.9–50-ton excavators, with 180° rotation on smaller frames and 120° on larger frames. Driving and holding torque ratings are taken directly from the factory catalogue; exact mounting interface is confirmed against your machine drawing on inquiry.',
  crossReference:
    'Comparable class: Helac PowerTilt / PT series. Exact model match is confirmed against your unit tag and mounting drawing on inquiry.',
  crossRefs: [
    { hmModel: 'HMT-D-01', comparable: 'Helac PowerTilt PT4.5', carrierWeight: '<1.8' },
    { hmModel: 'HMT-D-02', comparable: 'Helac PowerTilt PT-030', carrierWeight: '1.9~3' },
    { hmModel: 'HMT-D-03', comparable: 'Helac PowerTilt PT-050', carrierWeight: '3~5' },
    { hmModel: 'HMT-D-04', comparable: 'Helac PowerTilt PT-070', carrierWeight: '5~7' },
    { hmModel: 'HMT-D-05', comparable: 'Helac PowerTilt PT-100', carrierWeight: '7~10' },
    { hmModel: 'HMT-D-06', comparable: 'Helac PowerTilt PT-180', carrierWeight: '11~18' },
    { hmModel: 'HMT-D-07', comparable: 'Helac PowerTilt PT-240', carrierWeight: '18~23' },
    { hmModel: 'HMT-D-08', comparable: 'Helac PowerTilt PT-300', carrierWeight: '24~27' },
  ],
  rows: [
    { model: 'HMT-D-02', rotation: 180, drivingNm: 1625, holdingNm: 6430, weightKg: 31 },
    { model: 'HMT-D-03', rotation: 180, drivingNm: 2600, holdingNm: 9350, weightKg: 45.5 },
    { model: 'HMT-D-04', rotation: 180, drivingNm: 4375, holdingNm: 14850, weightKg: 78 },
    { model: 'HMT-D-05', rotation: 180, drivingNm: 6650, holdingNm: 20450, weightKg: 103 },
    { model: 'HMT-D-06', rotation: 120, drivingNm: 13300, holdingNm: 40725, weightKg: 180 },
    { model: 'HMT-D-07', rotation: 120, drivingNm: 17875, holdingNm: 53100, weightKg: 277 },
    { model: 'HMT-D-08', rotation: 120, drivingNm: 24900, holdingNm: 70330, weightKg: 318 },
  ],
};

export const HMT_SERIES: HmtSeries[] = [HMT_A, HMT_D];
