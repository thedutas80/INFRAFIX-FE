declare module 'react-simple-captcha' {
  export function loadCaptchaEnginge(numberOfCharacters: number): void;
  export function LoadCanvasTemplate(props: { reloadText: string }): JSX.Element;
  export function validateCaptcha(captchaInput: string): boolean;
}
