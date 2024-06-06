import { BlobServiceClient } from '@azure/storage-blob';

const blobSasUrl = 'https://tradeasy.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-09-30T15:47:46Z&st=2024-06-06T07:47:46Z&spr=https,http&sig=ykh2IcyRb2Y7FKpCv40r8pTz%2FNDw5UjB0iuvhA7MR2o%3D';

export async function uploadFileToBlob(file) {
    if (!file) return '';

    try {
        const blobServiceClient = new BlobServiceClient(blobSasUrl);
        const containerClient = blobServiceClient.getContainerClient('inventory-payment'); // Ensure your container name is correct
        const blobName = new Date().getTime() + '-' + file.name;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadBrowserData(file);
        return blockBlobClient.url;
    } catch (error) {
        console.error('Error uploading file to blob', error);
        return '';
    }
}
