const baseUrl = 'https://api.xn----7sbbznd9a5a.xn--p1ai';

export const fetchData = async (
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: HeadersInit;
    params?: Record<string, string>;
  } = {}
) => {
  try {
    const {
      method = 'GET',
      body,
      headers = {},
      params = {}
    } = options;

    // Construct URL with query parameters
    const queryParams = new URLSearchParams(params).toString();
    const url = `${baseUrl}${endpoint}${queryParams ? `?${queryParams}` : ''}`;

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    // Add body if present and not GET method
    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
