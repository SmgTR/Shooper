import defaultImage from 'Assets/default-placeholder.png';
import { SyntheticEvent } from 'react';

export const imageError = (event: SyntheticEvent) => {
  const target = event.target as HTMLImageElement;
  target.src = defaultImage;
};
