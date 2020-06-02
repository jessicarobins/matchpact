export const getTwitterId = (url: string) => url.match(/status\/(\d{19})/)?.[1];
