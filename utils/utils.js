import { PixelRatio } from 'react-native';

// Convert pixels to dp
const pixelsToDp = (pixels) => {
  return PixelRatio.roundToNearestPixel(pixels / PixelRatio.get());
};

export default {
    pixelsToDp
}