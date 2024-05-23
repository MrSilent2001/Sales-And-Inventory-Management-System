import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import  compress from "vite-plugin-compression";

export default defineConfig({
    plugins: [
        react(),
        compress()
    ],
    server: {
        port: 3000,
        open: true
    }
})