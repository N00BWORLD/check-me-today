// 관상 결과 유형 30종 = 1등 성향(6) × 2등 성향(5)
// 성향별 파일을 합쳐 하나의 배열로 내보낸다. 순서는 traitOrder 와 같다.

import type { FaceReadingResult } from "../face-reading";
import { wealthTypes } from "./wealth";
import { wisdomTypes } from "./wisdom";
import { leadershipTypes } from "./leadership";
import { charmTypes } from "./charm";
import { healthTypes } from "./health";
import { fortuneTypes } from "./fortune";

export const faceReadingTypes: FaceReadingResult[] = [
  ...wealthTypes,
  ...wisdomTypes,
  ...leadershipTypes,
  ...charmTypes,
  ...healthTypes,
  ...fortuneTypes,
];
