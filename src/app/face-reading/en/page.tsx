// 영어 전용 진입 페이지: /face-reading/en
// "korean face reading" 검색 대응. 다른 관상 페이지는 서버 HTML 이 한국어라 영어 크롤러가 영어 본문을 읽지 못하므로,
// 이 페이지만은 서버 컴포넌트에서 영어 본문(1,000단어 이상)을 그대로 렌더링한다. 언어 전환 없음, hreflang 은 아직 넣지 않는다.
import type { Metadata } from "next";
import Link from "next/link";
import { faceReadingResults } from "@/data/face-reading";
import {
  faceGuideParts,
  FACE_EN_PATH,
  FACE_GUIDE_PATH,
  FACE_GUIDE_PUBLISHED,
  FACE_READING_PATH,
  getFaceGuidePath,
  getFaceTypePath,
} from "@/data/face-reading-guide";
import { buildOgImageUrl, SITE_URL } from "@/lib/kakao";

const TITLE = "Korean Face Reading (Gwansang): Free Test and Complete Guide";
const DESCRIPTION =
  "Learn Korean face reading, called gwansang: what the eyes, nose, mouth, forehead, brows, ears, chin and moles mean in traditional East Asian physiognomy, then take a free one-minute face reading test to find your type among 30.";
const ogImage = buildOgImageUrl({ title: "Korean Face Reading", desc: "Free test and complete guide", emoji: "🔮" });

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "korean face reading",
    "gwansang",
    "face reading test",
    "physiognomy",
    "asian face reading",
    "face reading online free",
    "what does my face say",
  ],
  alternates: { canonical: FACE_EN_PATH },
  openGraph: {
    title: `${TITLE} | Check Me Today`,
    description: DESCRIPTION,
    type: "article",
    url: FACE_EN_PATH,
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Korean Face Reading" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [ogImage] },
};

// 본문 스타일 (클라이언트 훅 없이 쓰기 위해 guideUi 의 gcls 와 같은 값을 그대로 적는다)
const s = {
  page: "min-h-screen ink-bg px-4 pt-5 pb-32",
  container: "max-w-2xl mx-auto",
  card: "bg-[#fffdf7] dark:bg-[#2b251d] border-2 border-[#d8c8a6] dark:border-[#5c4b35] rounded-3xl shadow-sm p-5 sm:p-7 mb-6",
  inner: "bg-[#f6efe0] dark:bg-[#1f1a14] border border-[#d8c8a6] dark:border-[#5c4b35] rounded-2xl p-4",
  body: "text-[18px] leading-[1.75] text-stone-900 dark:text-stone-100",
  muted: "text-[16px] leading-relaxed text-stone-700 dark:text-stone-300",
  h1: "text-[30px] sm:text-[36px] leading-tight font-bold font-serif text-[#fbf7ee]",
  h2: "text-[24px] leading-snug font-bold font-serif text-stone-900 dark:text-stone-50 mb-4",
  h3: "text-[20px] leading-snug font-bold text-stone-900 dark:text-stone-50",
  link: "text-[#8b1a1a] dark:text-[#e2c17a] underline underline-offset-4 decoration-1 hover:opacity-80",
  cta: "block w-full min-h-[64px] px-5 py-4 rounded-2xl bg-[#8b1a1a] hover:bg-[#731414] text-white font-bold text-[22px] text-center transition-colors",
};

/** 부위별 영어 요약 (가이드 데이터의 영어 메타 설명을 쓰되, 영어 페이지 흐름에 맞는 한 줄 제목을 붙인다) */
const partIntro: Record<string, string> = {
  eyes: "The eyes carry half of the whole reading.",
  nose: "The nose is the treasury of the face.",
  mouth: "The mouth is the gate of blessings and the seat of later life.",
  forehead: "The forehead is heaven: what you were given.",
  eyebrows: "The brows are the fence around the eyes.",
  ears: "The ears are formed first and show inborn luck.",
  chin: "The chin is earth: what you harvest.",
  moles: "Moles are signposts, read by color before position.",
  "face-shape": "The outline is the vessel that holds everything else.",
  cheekbones: "The cheekbones are the ministers that support the nose.",
};

const faqs = [
  {
    q: "What is Korean face reading called?",
    a: "In Korean it is gwansang (관상, 觀相), literally 'observing the face'. The same tradition is called mianxiang in Chinese and ninso in Japanese. All three draw on the same classical texts, so a Korean reading and a Chinese reading of the same face agree on most points.",
  },
  {
    q: "Is face reading accurate?",
    a: "Face reading is a system of traditional interpretation, not a science. There is no evidence that features decide your fate. What it does well is describe the impression your face gives to others, which genuinely affects relationships, and offer a vocabulary for thinking about your own strengths. Treat it as a mirror for reflection, not a verdict.",
  },
  {
    q: "Is the test free and does it store my photo?",
    a: "The test is free and needs no account. If you choose the photo option, your photo is processed inside your browser and is never uploaded; only the six feature choices are used to compute your type. You can also skip the photo entirely and pick the features yourself in a mirror.",
  },
];

export default function KoreanFaceReadingPage() {
  const pageUrl = `${SITE_URL}${FACE_EN_PATH}`;
  const sampleTypes = ["wealth-health", "wisdom-leadership", "charm-fortune", "leadership-wealth", "health-fortune", "fortune-wisdom"]
    .map((id) => faceReadingResults.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Korean Face Reading (Gwansang): What Your Face Says",
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: FACE_GUIDE_PUBLISHED,
        dateModified: FACE_GUIDE_PUBLISHED,
        author: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Check Me Today", url: SITE_URL },
        keywords: "korean face reading, gwansang, physiognomy, face reading test",
        isPartOf: { "@type": "WebSite", name: "Check Me Today", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Face Reading", item: `${SITE_URL}${FACE_READING_PATH}` },
          { "@type": "ListItem", position: 3, name: "Korean Face Reading", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className={s.page} lang="en">
        <article className={s.container}>
          <nav aria-label="Breadcrumb" className="mb-4 text-[14px] text-slate-500 dark:text-slate-400">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-purple-600">Home</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href={FACE_READING_PATH} className="hover:text-purple-600">Face Reading</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-semibold text-slate-700 dark:text-slate-200">Korean Face Reading</li>
            </ol>
          </nav>

          <header className="bg-[#fffdf7] dark:bg-[#2b251d] border-2 border-[#d8c8a6] dark:border-[#5c4b35] rounded-3xl shadow-sm overflow-hidden mb-6">
            <div className="ink-header px-6 py-7 text-center">
              <p className="text-[#e2c17a] text-[20px] tracking-[0.4em] font-serif mb-3" aria-hidden="true">觀相</p>
              <h1 className={s.h1}>Korean Face Reading: What Your Face Says, According to Gwansang</h1>
            </div>
            <div className="px-5 sm:px-7 py-5">
              <p className={s.body}>
                Korean face reading, or <strong>gwansang</strong>, is the practice of reading a person’s temperament, talents and the
                flow of their fortune from the features of the face. It is one of the oldest living traditions of physiognomy in East
                Asia, and it is still consulted in Korea today before interviews, business deals and even weddings. This page explains
                where it comes from, how a reader looks at a face, what each feature is said to mean, and how the 30 face types on this
                site are built. When you are done reading, you can take the free one-minute test and get your own reading.
              </p>
            </div>
          </header>

          <section className={s.card} aria-labelledby="en-what">
            <h2 id="en-what" className={s.h2}>What is Korean face reading?</h2>
            <p className={s.body}>
              The word gwansang is written with two Chinese characters: <em>gwan</em>, to observe, and <em>sang</em>, the form or
              appearance of a thing. The tradition grew out of classical Chinese texts such as the <em>Mayi Xiangfa</em> of the Song
              dynasty and the <em>Shenxiang Quanbian</em> of the Ming, and it took root in Korea during the Joseon dynasty, when manuals
              like the <em>Liuzhuang Xiangfa</em> were read by scholars, officials and matchmakers alike. A Korean reader and a Chinese
              reader will agree on almost every principle, because they share the same sources; what differs is emphasis and the
              everyday vocabulary that has grown up around it, such as the famous “fortune nose” or “Buddha’s ears”.
            </p>
            <p className={`${s.body} mt-4`}>
              The core idea is simple. The face is divided into three zones. The upper zone, the forehead, is heaven: the blessings you
              received from parents and ancestors, your inborn wisdom and your fortune from about age 15 to 30. The middle zone, from the
              brows to the tip of the nose, is humanity: your own effort, your judgment and your fortune from 31 to 50. The lower zone,
              from the philtrum to the chin, is earth: what you harvest in later life, your luck with children and juniors, and your
              fortune after 60. When the three zones are of even length, fortune is said to flow evenly through life.
            </p>
            <p className={`${s.body} mt-4`}>
              Within those zones sit the five organs: eyes, eyebrows, nose, mouth and ears. Each is given a title, like an official in
              a royal court, and each governs a particular kind of luck. The eyes are the inspecting official and reveal the heart. The
              brows are the guardians of longevity and show ties with siblings and friends. The nose is the discerning official and the
              treasury of wealth. The mouth is the official of income and expenditure, the gate through which blessings pass. The ears are
              the gathering officials, formed first in the womb and showing inborn luck and health.
            </p>
          </section>

          <section className={s.card} aria-labelledby="en-how">
            <h2 id="en-how" className={s.h2}>How a reader looks at a face</h2>
            <p className={s.body}>
              A trained reader does not start with the shape of the nose or the size of the eyes. The first thing is <strong>gi</strong>,
              the energy or spirit of the face: whether the eyes are clear, the skin has a healthy sheen, and the expression is settled.
              The old books say that if the whole face counts for a hundred, the eyes alone count for fifty, and that bright eyes cover
              the shortcomings of every other feature. Only after judging the spirit does the reader move on to balance: whether the three
              zones are even, whether the left and right sides match, and whether the cheekbones support the nose the way ministers
              support a king.
            </p>
            <p className={`${s.body} mt-4`}>
              Then come the individual features, each read for shape, flesh, color and position. Shape is inborn and tells of temperament.
              Flesh tells of present fortune: a face that has lost its fullness is said to have lost energy, while moderate flesh on the
              cheeks and chin means goodwill and a comfortable later life. Color changes day by day and is read as a signal about health and
              the immediate future. And every reading ends with the same reminder: <em>sang yu sim saeng</em>, the face follows the heart.
              Expression, habit and attitude reshape a face over years, which is why the tradition insists that fortune can be changed.
            </p>
          </section>

          <section className={s.card} aria-labelledby="en-features">
            <h2 id="en-features" className={s.h2}>Feature by feature: a short summary</h2>
            <p className={`${s.body} mb-4`}>
              Below is a one-paragraph summary of each feature. Each links to a full guide with readings by shape and frequently asked
              questions. The full guides are written in Korean with English, Chinese and Japanese versions available through the language
              switcher at the bottom of the screen.
            </p>
            <ul className="space-y-3">
              {faceGuideParts.map((p) => (
                <li key={p.id} className={s.inner}>
                  <h3 className={s.h3}>
                    <span aria-hidden="true" className="text-[#8b1a1a] dark:text-[#e2c17a] font-serif mr-2">{p.hanja}</span>
                    <Link href={getFaceGuidePath(p.id)} className={s.link}>{p.name.en}</Link>
                  </h3>
                  <p className={`${s.body} mt-1`}>
                    <strong>{partIntro[p.id]}</strong> {p.description.en}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mb-6 text-center">
            <Link href={FACE_READING_PATH} className={s.cta}>🔮 Take the free face reading test →</Link>
            <p className={`${s.muted} mt-3`}>One minute, six choices, no sign-up. Works in English, Korean, Chinese and Japanese.</p>
          </div>

          <section className={s.card} aria-labelledby="en-types">
            <h2 id="en-types" className={s.h2}>The 30 Korean face types</h2>
            <p className={s.body}>
              Classical texts describe dozens of named faces, such as the face of wealth and longevity or the face of the scholar official.
              The test on this site organizes that tradition into a clear system. Six fortunes are scored from your features: wealth, wisdom,
              success, relationships, health and luck. The strongest fortune and the second strongest are combined, which gives six times
              five, or 30 types. Every type carries a classical four-character name in Chinese characters, a plain-language title, a full
              description, a list of natural strengths, a word of advice from the reader, a lucky color and direction, and the types it is
              most compatible with.
            </p>
            <p className={`${s.body} mt-4`}>
              For example, wealth first and health second gives <em>Wealth and Longevity</em>, the face of someone who keeps what they earn
              and lives long enough to enjoy it. Wisdom first and success second gives <em>Scholar Official</em>, the face that rises through
              learning. Relationships first and luck second gives <em>Virtuous Blessing</em>, the face that is helped by everyone it meets.
              A few of the 30 types are listed here; the full list is on the guide hub.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {sampleTypes.map((r) => (
                <li key={r.id}>
                  <Link href={getFaceTypePath(r.id)} className={`block h-full ${s.inner} text-center hover:bg-white/80 dark:hover:bg-[#2b251d] transition-colors`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/face-reading/${r.id}.webp`} alt={r.type.en} width={96} height={96} loading="lazy" className="w-24 h-24 mx-auto mb-2 rounded-2xl object-cover border-2 border-[#e2c17a]/70 bg-[#f6efe0]" />
                    <p className="text-[13px] text-[#8b1a1a] dark:text-[#e2c17a] font-serif tracking-widest" aria-hidden="true">{r.hanja}</p>
                    <p className="text-[17px] font-bold text-stone-900 dark:text-stone-50">{r.type.en}</p>
                    <p className={`${s.muted} text-[14px] mt-1`}>{r.subtitle.en}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right">
              <Link href={`${FACE_GUIDE_PATH}#hub-types`} className={`text-[16px] font-bold ${s.link}`}>See all 30 types →</Link>
            </p>
          </section>

          <section className={s.card} aria-labelledby="en-test">
            <h2 id="en-test" className={s.h2}>How the free test works</h2>
            <p className={s.body}>
              The test asks about six features: face shape, forehead, eyes, nose, mouth and chin. For each one you look in a mirror and
              choose the option that looks most like you, with a short description and a picture to help. Each option carries hidden scores
              for the six fortunes, drawn from the classical readings explained on this page. When you finish, the scores are added up,
              normalized so that no single fortune dominates, and matched to one of the 30 types. The result page shows your type with an
              illustration, a reading for each feature you chose, star grades for the six fortunes, and a daily face fortune that changes
              every morning.
            </p>
            <p className={`${s.body} mt-4`}>
              If you prefer, you can upload a photo instead of choosing by hand. Face detection runs entirely inside your browser, the photo
              never leaves your device, and you can switch to manual choice at any time. The whole thing takes about a minute, there is no
              account to create, and the result can be shared with a link so that friends can compare types.
            </p>
            <div className="mt-5 text-center">
              <Link href={FACE_READING_PATH} className={s.cta}>🔮 Start my reading →</Link>
            </div>
          </section>

          <section className={s.card} aria-labelledby="en-use">
            <h2 id="en-use" className={s.h2}>How to use a face reading well</h2>
            <p className={s.body}>
              The healthiest way to read a face, your own or anyone else’s, is as a description of strengths rather than a prediction of
              events. A “fortune nose” does not hand you money; it describes a temperament that tends to keep what it earns, and reminds you
              to use that strength. A “lonely peak” nose without supporting cheekbones does not condemn you to struggle alone; it suggests
              that asking for help is the skill worth practicing. Every feature guide on this site ends with practical advice in that
              spirit, and every reading comes with the same caution: this is traditional interpretation offered for reflection and fun,
              not medical, legal or financial advice.
            </p>
          </section>

          <section className={s.card} aria-labelledby="en-faq">
            <h2 id="en-faq" className={s.h2}>Frequently asked questions</h2>
            <dl className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className={s.inner}>
                  <dt className={`${s.h3} mb-2`}>Q. {f.q}</dt>
                  <dd className={s.body}>{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className={`${s.muted} text-center mt-8`}>
            Korean face reading content on this site is a plain-language retelling of classical East Asian physiognomy, offered for
            entertainment and self-reflection. Read the full guides at <Link href={FACE_GUIDE_PATH} className={s.link}>the face reading guide hub</Link>.
          </p>
        </article>
      </main>
    </>
  );
}
