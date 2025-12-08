# Internationalization (I18n) Guidelines

## Supported Languages
The application currently supports the following 4 languages. All user-facing text MUST include translations for these languages:

1.  **Korean (ko-KR)** - Default
2.  **English (en-US)**
3.  **Chinese (zh-CN)** - Simplified
4.  **Japanese (ja-JP)**

## Implementation Rules

### 1. Data Structure
For dynamic content (e.g., menu items, test results), use an object structure containing all 4 language keys:

```typescript
interface LocalizedText {
  ko: string;
  en: string;
  zh: string;
  ja: string;
}

interface Item {
  name: LocalizedText;
  description: LocalizedText;
}
```

### 2. UI Text
For static UI elements (buttons, headers), use the `LanguageContext` or a localized object within the component.

```tsx
const uiText = {
  title: {
    ko: "제목",
    en: "Title",
    zh: "标题",
    ja: "タイトル"
  }
};

// Usage
const { lang } = useLanguage();
<h1>{uiText.title[lang]}</h1>
```

### 3. Fallbacks
Always provide a fallback (usually English or Korean) if a specific language key is missing.

```tsx
{text[lang] || text.en || text.ko}
```
