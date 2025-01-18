declare module 'marked' {
    export function parse(markdown: string): string;
    export function setOptions(options: any): void;
  }
  