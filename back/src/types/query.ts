import { MvpTypes } from 'constants/taste.constant';

export interface QueryKey {
  key: string;
}

export interface QueryScores {
  name: string;
  type: string;
  // tmtype?: string;
  old: string;
  young: string;
  salty: string;
  unsalty: string;
  sweet: string;
  unsweet: string;
  spicy: string;
  unspicy: string;
  hot: string;
  unhot: string;
  sea: string;
  earth: string;
  heavy: string;
  light: string;
}

export interface QueryMvpType {
  type: MvpTypes;
}

export interface QueryNormalFoods {
  foodname: string;
  frequency: string;
  url: string;
}

export interface MapSetScoreAndUrl {
  frequency: string;
  url: string;
}

export type EmotionType = 'angry' | 'depressed' | 'happy' | 'fun' | 'sad' | 'tired';

export interface QueryEmotionalTypes {
  emotion: string;
  type: string;
  // tmtype: string;
}

export interface QueryType {
  type: string;
  // tmtype: string;
}

export type Emotions = EmotionType;

export interface QueryEmotionalFoods {
  foodname: string;
  frequency: string;
  url: string;
}
