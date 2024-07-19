import { Photo } from 'src/shopeefood/shopeefood.type';

export const extractRestaurantUrl = (url: string) => {
  const regex = /\/([^/]+\/[^/?]+)(\?|$)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  // If no match is found, return null or handle accordingly
  return null;
};

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

// String price to Number
// 26,000đ => 26000
export const priceParser = (strPrice: string) => {
  return parseInt(strPrice.replace(/[^\d]/g, ''));
};

// Get Price with format string
export const formatPriceVN = (numPrice: number) => {
  return numPrice.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const getHighestResolutionPhoto = (photos: Photo[]): Photo => {
  if (!photos || photos.length === 0) {
    return {
      width: 640,
      height: 400,
      value:
        'https://images.foody.vn/res/g119/1180275/prof/s640x400/foody-upload-api-foody-mobile-co-d4eaea3f-230808123448.jpeg',
    };
  }

  // Sort the photos array by width in descending order
  const sortedPhotos = photos.sort((a, b) => b.width - a.width);

  // The URL of the photo with the highest resolution will be the first element after sorting
  return sortedPhotos[0];
};
