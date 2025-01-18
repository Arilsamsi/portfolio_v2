declare module 'highlight.js' {
    const hljs: {
      highlightAll: () => void;
      highlight: (language: string, code: string) => { value: string };
    };
    export default hljs;
  }
  