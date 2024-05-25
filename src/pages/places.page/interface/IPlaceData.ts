export interface IPlaceData {
  id: number;
  googlePlaceId: string;
  displayName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  rating: number;
  userRatingsTotal: number;
  priceLevel: number;
  cityName: string;
  websiteUri: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlaceRecommendationRequest {
  userId: string;
  cityName: string;
  country: string;
}

export interface IPlaceRecommendationResponse {
  placeDetails: IPlaceData;
  score: number;
}
