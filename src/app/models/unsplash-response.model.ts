export interface UnsplashImage {
    urls: {
      regular: string;
    };
  }
  
  export interface UnsplashResponse {
    results: UnsplashImage[];
  }