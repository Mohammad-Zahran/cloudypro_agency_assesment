export interface Album{
    id:string,
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    album_type: "album" | "single" | "compilation";
    images: spotifyImage[];
}

export interface spotifyImage {
    url: string;
    height?: number;
    width?: number;
}
 
export interface Tracks {
    id: string;
    name: string;
    duration_ms: number;
    preview_url?: string;
    track_number: number;
    external_urls: {
      spotify: string;
    };
    uri:string;
  }

  export const access_token:string = "BQDdbYgsfuprZXvmtPr_5b7mv9RWBgF9Q6T0OwO8QvSHjdjAE1bPi_FRmydkAnq-TfORiMDBy11wwVAfDHsXqVuklkMYo1_izcfBPeotYnZVYeWBCUSqL75K7jhaCmdxUYhI3qOG9JQ"

 export interface Locale {
    currentDevice?: string; // 'Current device'
    devices?: string; // 'Devices'
    next?: string; // 'Next'
    otherDevices?: string; // 'Select other device'
    pause?: string; // 'Pause'
    play?: string; // 'Play'
    previous?: string; // 'Previous'
    removeTrack?: string; // 'Remove from your favorites'
    saveTrack?: string; // 'Save to your favorites'
    title?: string; // '{name} on SPOTIFY'
    volume?: string; // 'Volume'
  }

 export interface SpotifyPlayOptions {
    context_uri?: string;
    deviceId: string;
    offset?: number;
    uris?: string[];
  }