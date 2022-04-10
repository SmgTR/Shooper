/// <reference types="react-scripts" />

namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GOOGLE_APP: string;
    REACT_APP_GOOGLE_APP_API_URL: string;
  }
}

declare module 'apollo-upload-client';
