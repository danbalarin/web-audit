type TestUrlResult = {
  ok: boolean;
  error?: string;
};

export const testUrl = async (url: string): Promise<TestUrlResult> => {
  const response = await fetch(url);
  const text = await response.text();

  return { ok: response.ok && text.length > 0, error: response.statusText };
};
