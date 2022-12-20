import { Application, Router } from "https://deno.land/x/oak/mod.ts";
/*
const router = new Router();
router
  .get("/", (context) => {
    // 基礎路由
    context.response.body = "Welcome !!";
  })
  .get("/hello", (context) => {
    // 命名路由: localhost:8080/hello
    context.response.body = "Hello World !!";
  })
  .get("/hello/:id", (context) => {
    // 動態路由: localhost:8080/hello/abc
    console.log(context.params);
    const id = context.params.id;
    context.response.body = `Your ID:${id}`;
  });

const app = new Application();

// 註冊中間件
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
*/



const app = new Application();
app.use((ctx) => {
  // 日期時間@台灣時區
  const date = new Date();

  // 接收參數 https://cms.deno.dev/id=NAME
  const id = ctx.request.url.searchParams.get('id') ?? "Guest"

  // 輸出純文字
  // ctx.response.type = "text/plain"
  // let showText = `您好：${id}`
  // ctx.response.body = showText

  // 輸出HTML
  ctx.response.type = "text/html"
  let showHtml = `
<title>Deno Test</title>
<h1>Hello !! ${id}</h1>
  <ul>
    <li>Your IP：<span id="ipTag"></span></li>
    <li>Your City：<span id="cityTag"></span></li>
    <li>緯度 (Latitude),經度 (Longitude)：<span id="locationTag"></span></li>
    <li>Server Time :${date}</li>
  </ul>
  
<iframe id="gmap" scrolling="no" style="height: 300px; width: 100%;" src=""></iframe>

<script>
const showLocation = position => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    locationTag.innerHTML = lat+','+lng;
    gmap.src = 'https://maps.google.com/maps?z=17&t=m&q='+lat+','+lng+'&ie=UTF8&output=embed';
}

const getIpAddress = async() => {
    await fetch('https://api.ipify.org')
        .then(ipAddr => ipAddr.text())
        .then(async ipAddr => {
            ipTag.innerHTML = ipAddr;
            await fetch('https://ipinfo.io/'+ipAddr+'/json?token=20b688266991a0')
                    .then(ipInfo => ipInfo.json())
                    .then(ipInfo => {
                        cityTag.innerHTML = ipInfo.city
                        locationTag.innerHTML = ipInfo.loc;
                        gmap.src = 'https://maps.google.com/maps?z=17&t=m&q='+ipInfo.loc+'&ie=UTF8&output=embed';
                    }).catch( error => {
                        alert("Get location error:" + error);
                });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showLocation);
            } else {
                alert("No location.");
            }
        }).catch( error => {
            alert("Get IP address error:" + error);
    });
}
getIpAddress();
</script>
  `;
  ctx.response.body = showHtml

  // 輸出JSON
  // ctx.response.type = "application/json"
  // let showJson = {
  //   "id": id,
  //   "time": date,
  //   "status": true
  // }
  // ctx.response.body = showJson
});
await app.listen({ port: 8000 });

