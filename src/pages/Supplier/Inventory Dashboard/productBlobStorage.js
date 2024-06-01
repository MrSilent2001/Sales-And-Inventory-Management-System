import { BlobServiceClient } from '@azure/storage-blob';

const blobSasUrl = 'https://tradeasy.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-05-30T19:07:04Z&st=2024-05-30T11:07:04Z&spr=https,http&sig=18sRNRaptBTfL8KloPIpZ8b2iUIEAX6bqh9q7eNaNWM%3D';

export async function uploadFileToBlob(file) {
    if (!file) return '';

    try {
        const blobServiceClient = new BlobServiceClient(blobSasUrl);
        const containerClient = blobServiceClient.getContainerClient('products'); // Ensure your container name is correct
        const blobName = new Date().getTime() + '-' + file.name;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadBrowserData(file);
        return blockBlobClient.url;
    } catch (error) {
        console.error('Error uploading file to blob', error);
        return '';
    }
}
