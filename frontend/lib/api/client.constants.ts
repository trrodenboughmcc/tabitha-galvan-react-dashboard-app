export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Analytics Dashboard 1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};

export const API_ENDPOINTS = {
  REDDIT: 'https://www.reddit.com',
  CRYPTO: 'https://api.coingecko.com/api/v3/simple/price',
  QUOTES: 'https://api.quotable.io/random',
  EXCHANGE_RATES: 'https://api.exchangerate-api.com/v4/latest/USD',
} as const;