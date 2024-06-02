export interface RedirectResponse {
  url: string;
  statusCode: number;
}
export const redirectResponse = (
  url: string,
  status?: number,
): RedirectResponse => {
  return {
    url,
    statusCode: status || 302,
  };
};
