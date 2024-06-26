export type TokensFromResponse = {
  access_token: string | null;
  refresh_token: string | null;
};

export const extractTokensFromResponse = (
  setCookieHeader: string[] | undefined,
): TokensFromResponse => {
  const tokens: TokensFromResponse = {
    access_token: null,
    refresh_token: null,
  };

  try {
    if (setCookieHeader && setCookieHeader.length > 0) {
      const accessTokenCookie = setCookieHeader[0]
        .split(",")
        .find((cookie) => cookie.trim().startsWith("access_token"));
      const refreshTokenCookie = setCookieHeader[0]
        .split(",")
        .find((cookie) => cookie.trim().startsWith("refresh_token"));

      if (accessTokenCookie) {
        tokens.access_token = accessTokenCookie.split("=")[1].split(";")[0];
      }
      if (refreshTokenCookie) {
        tokens.refresh_token = refreshTokenCookie.split("=")[1].split(";")[0];
      }
    }
  } catch (error) {
    console.error("Erro ao extrair tokens:", error);
  }

  return tokens;
};
