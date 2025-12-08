# Result Page UI Guidelines

## Action Buttons Layout
All result pages should follow a standardized layout for action buttons to ensure consistency across the application.

### Structure
The action button section should be placed immediately after the result card content. Ideally, use the shared `<ResultActions />` component.

**Order of Elements:**
1.  **Recommendation Button (Like)**
    *   Full width, prominent button.
    *   Displays current like count if > 0.
    *   Toggles "Liked" state with visual feedback (color change, animation).

2.  **Share Actions Group**
    *   **Native Share Button**: Full width, gradient background. Uses `navigator.share` on mobile. Fallback to clipboard copy on desktop.
    *   **Sub-actions Grid** (4 columns):
        *   **Save Image**: Generates and downloads result card image.
        *   **Copy Link**: Copies current URL to clipboard.
        *   **Twitter/X**: Opens Twitter share intent.
        *   **Kakao/Other**: Platform specific share or fallback.

3.  **Other Tests Button**
    *   Full width, secondary style (glass effect or outline).
    *   Directs users to the home page or test list.

4.  **Cross Promotion (Recommendation)**
    *   "Try other tests!" section.
    *   Displays 2 random active tests excluding the current one.

5.  **Retake Link**
    *   Small, subtle text link at the bottom.
    *   "Retake test" or "Get another recommendation".

### Component Usage
Use the `ResultActions` component to implement this layout automatically.

```tsx
import ResultActions from "@/components/ResultActions";

// ... inside your component
<ResultActions
    hasLiked={hasLiked}
    isLiking={isLiking}
    likeCount={stats.likeCount}
    onToggleLike={toggleLike}
    onSaveImage={handleSaveImage}
    onCopyLink={handleCopyLink}
    onNativeShare={handleNativeShare}
    onTwitterShare={handleTwitterShare}
    onKakaoShare={handleKakaoShare}
    retakeLink="/test"         // Optional: defaults to /test
    excludeTestId="current-test-id" // Optional: ID to exclude from recommendations
/>
```
