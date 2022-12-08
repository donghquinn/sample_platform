export type OtherListForType = keyof typeof TypeListForTypesList;

export type EmotionalFoodType = keyof typeof EmotionalFoodList;

// 타입 별 음식 리스트
export const TypeListForTypesList = {
  OETH: { 1: '훠궈', 2: '삼겹살', 3: '콜라' },
  OETL: { 1: '마라탕' },
  OEMH: { 1: '족발' },
  OEML: { 1: '불막창' },
  OSTH: { 1: '라면' },
  OSTL: { 1: '라멘' },
  OSMH: { 1: '불족발' },
  OSML: { 1: '라멘' },
  YETH: { 1: '삼겹살' },
  YETL: { 1: '샤브샤브' },
  YEMH: { 1: '간장게장' },
  YEML: { 1: '양념게장' },
  YSTH: { 1: '초밥' },
  YSTL: { 1: '샤브샤브' },
  YSMH: { 1: '콜라' },
  YSML: { 1: '훠궈' },
};

export const EmotionalFoodList = {
  sad: { 1: '불족발', 2: '삼겹살' },
  happy: { 1: '김치찌개', 2: '' },
  fun: { 1: '소주' },
  tired: { 1: '맥주' },
  depressed: { 1: '홍어삼합' },
  angry: { 1: '불닭볶음면' },
};
