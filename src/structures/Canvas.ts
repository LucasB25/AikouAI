import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'node:fs/promises';
import { request } from 'undici';

interface MergeImagesOptions {
    width: number;
    height: number;
    images: string[];
}

export class Canvas {
    public async mergeImages(options: MergeImagesOptions): Promise<Buffer> {
        try {
            const { width, height, images } = options;
            const imageCount = images.length;
            const rows = Math.ceil(Math.sqrt(imageCount));
            const cols = Math.ceil(imageCount / rows);
            const chunkWidth = Math.floor(width / cols);
            const chunkHeight = Math.floor(height / rows);
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            await Promise.all(
                images.map(async (imageUrl, index) => {
                    try {
                        const response = await request(imageUrl);
                        if (response.statusCode !== 200) {
                            throw new Error(`Failed to fetch image: ${imageUrl}`);
                        }
                        const buffer = await response.body.arrayBuffer();
                        const tempFilePath = await fs.mkdtemp('temp');
                        const tempFileName = `${tempFilePath}/temp${index}.tmp`;
                        await fs.writeFile(tempFileName, Buffer.from(buffer));
                        const image = await loadImage(tempFileName);
                        const x = (index % cols) * chunkWidth;
                        const y = Math.floor(index / cols) * chunkHeight;
                        ctx.drawImage(image, x, y, chunkWidth, chunkHeight);
                        await fs.unlink(tempFileName);
                    } catch (error) {
                        throw new Error(`Error processing image ${index}: ${error}`);
                    }
                })
            );

            return canvas.toBuffer('image/png');
        } catch (error) {
            throw new Error(`Error merging images: ${error}`);
        }
    }
}
