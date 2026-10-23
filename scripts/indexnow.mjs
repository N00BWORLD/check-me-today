// 사이트맵의 모든 주소를 IndexNow(Bing·네이버 등)에 알린다.
//
// 사용법:  node scripts/indexnow.mjs
//
// - 운영 배포가 끝나면 .github/workflows/indexnow.yml 이 자동으로 실행한다.
// - 키 파일 public/<KEY>.txt 가 사이트에 올라가 있어야 검색엔진이 키를 확인할 수 있다.
// - 한 번에 최대 10,000개까지 보낼 수 있어 그보다 많으면 나눠 보낸다.

const HOST = "check-me.today";
const KEY = "13cc6afa8de84de181252d896af81a6c";
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10000;

const res = await fetch(SITEMAP);
if (!res.ok) throw new Error(`사이트맵을 받지 못했습니다: HTTP ${res.status}`);
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("사이트맵에서 주소를 찾지 못했습니다");
console.log(`사이트맵 주소 ${urls.length}개`);

let failed = false;
for (let i = 0; i < urls.length; i += BATCH) {
  const urlList = urls.slice(i, i + BATCH);
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow ${urlList.length}개 전송: HTTP ${r.status}`);
  if (r.status !== 200 && r.status !== 202) {
    console.log(await r.text());
    failed = true;
  }
}
if (failed) process.exit(1);
