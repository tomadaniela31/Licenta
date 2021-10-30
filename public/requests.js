export async function post(url, params) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  })
  const data = await response.json();

  return data;
}
