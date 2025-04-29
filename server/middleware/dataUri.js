import DataUriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    try {
        // Check if file exists
        if (!file) {
            console.error("No file provided to getDataUri");
            throw new Error("No file provided");
        }
        
        // Check if file has buffer property
        if (!file.buffer) {
            console.error("File buffer is missing");
            throw new Error("File buffer is missing");
        }
        
        // Get file extension
        const extname = path.extname(file.originalname).toString();
        console.log("File extension:", extname);
        
        // Create parser
        const parser = new DataUriParser();
        
        // Convert buffer to base64
        const base64Data = file.buffer.toString('base64');
        
        // Format the data URI
        const dataUri = parser.format(extname, base64Data);
        console.log("Data URI created successfully");
        
        // Return the content property which is what Cloudinary expects
        return dataUri.content;
    } catch (error) {
        console.error("Error in getDataUri:", error);
        throw error;
    }
}

export default getDataUri;