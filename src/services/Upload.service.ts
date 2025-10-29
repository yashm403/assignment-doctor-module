import { Service } from 'typedi';
import path from 'path';

@Service()
export class UploadService {
    getPhotoPath(filename: string) {
        // You can later replace this with S3 or CloudFront URL
        return path.join('uploads', filename);
    }
}
