export interface GoogleStorageConfig {
  bucketName: string;
  thumbnails?: {
    height: number;
    width: number;
  };
  cdnUrl?: string;
}
