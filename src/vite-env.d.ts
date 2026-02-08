/// <reference types="vite/client" />

// Allow importing .ttl files as raw text
declare module '*.ttl?raw' {
  const content: string;
  export default content;
}
