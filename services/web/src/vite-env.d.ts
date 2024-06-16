/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_BASE_URL: string;
    VITE_S3_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
