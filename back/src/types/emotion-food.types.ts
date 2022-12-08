export interface EmotionFoodCountArray {
  emotion: EmotionLists;
  count: string;
}

export interface QueryFoodCount {
  count: string;
}

export type EmotionLists = 'sad' | 'happy' | 'fun' | 'depressed' | 'angry' | 'tired';

export interface Emotions {
  emotion: EmotionLists;
  // sad?: EmotionLists;
  // happy?: EmotionLists;
  // fun?: EmotionLists;
  // depressed?: EmotionLists;
  // angry?: EmotionLists;
  // tired?: EmotionLists;
}

export interface ArrayForEmotions {
  emotion: string;
}
