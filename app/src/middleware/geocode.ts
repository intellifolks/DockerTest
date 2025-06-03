import { Middleware } from 'koa';
import { GOOGLE_GEOCODE_API_URL } from './constant';

type State = {
  data: { query: { lat: number; lng: number } };
}

export function geocodeMiddleware(config: { google: { key: string } }): Middleware<State> {
  return async ctx => {
    const { lat, lng } = ctx.state.data.query;
    const params = new URLSearchParams({
      latlng: `${lat},${lng}`,
      key: config.google.key,
      result_type: 'street_address',
      location_type: 'ROOFTOP',
    })
    const response = await fetch(`${GOOGLE_GEOCODE_API_URL}?${params.toString()}`)
      .then(response => {
        if (!response.ok) throw { error: response.statusText, status: response.status, expose: true };
        return response.json();
      })
    console.log(response.results);
    ctx.status = 200;
    ctx.body = `
<html>
  <body>
    <h3>Results for (${lat}, ${lng})</h3>
    <ul>
      ${response.results.map(
        (result: any) => `<li>${result.formatted_address}</li>`
      ).join('')}
    </ul>
    <button onclick="window.location.href = '/'">Back</button>
</html>
`;
    ctx.status = 200;
  }
}
