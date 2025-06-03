import { Middleware } from 'koa';

export const homeMiddleware: Middleware = ctx => {
  ctx.set('content-type', 'text/html')
  ctx.body = `
<html>
<body>
  <button type="button" onClick="main()">Reverse geolocate</button>
  <script>
    function main() {
      window.navigator.geolocation.getCurrentPosition(position => {
        window.location.href = '/geocode?lat=' + position.coords.latitude + '&lng='  + position.coords.longitude;
      }, console.error)
    }
  </script>
</body>
</html>
`
};
