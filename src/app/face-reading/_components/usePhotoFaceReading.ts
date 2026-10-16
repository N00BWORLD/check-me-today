"use client";

// 사진으로 관상 보기: face-api.js 로 얼굴 68개 점을 찾아 부위별 선택지(옵션 id)로 바꾼다
// - 모든 처리는 브라우저 안에서만 이루어지고 사진은 어디에도 보내지 않는다
// - 매핑 결과는 반드시 src/data/face-reading.ts 의 실제 옵션 id 여야 한다 (아래 ensureValid 로 검증)

import { useCallback, useRef, useState } from "react";
import type * as FaceApi from "face-api.js";
import { faceFeatures } from "@/data/face-reading";

type FaceApiModule = typeof FaceApi;
type Point = { x: number; y: number };

/** 모델 파일 위치 (public/models) */
const MODEL_URL = "/models";
/** 분석 속도를 위해 긴 변을 이 크기로 줄인다 */
const MAX_IMAGE_SIZE = 640;

/** 진행 상황 단계 */
export type PhotoPhase = "idle" | "preparing" | "detecting" | "done";

/** 파일을 다운사이즈한 이미지 요소로 만든다 */
function loadResizedImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")?.drawImage(img, 0, 0, width, height);

      const resized = new Image();
      resized.onload = () => resolve(resized);
      resized.onerror = reject;
      resized.src = canvas.toDataURL("image/jpeg", 0.85);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("이미지를 읽을 수 없습니다"));
    };
    img.src = url;
  });
}

/** 해당 부위에 실제로 있는 옵션 id 인지 확인하고, 없으면 첫 옵션으로 대체 */
function ensureValid(featureId: string, optionId: string): string {
  const feature = faceFeatures.find((f) => f.id === featureId);
  if (!feature) return optionId;
  return feature.options.some((o) => o.id === optionId) ? optionId : feature.options[0].id;
}

/**
 * 68개 얼굴 점 → 부위별 옵션 id
 * 점 번호: 턱선 0~16, 눈썹 17~26, 코 27~35, 눈 36~47, 입 48~67
 * 모든 기준은 얼굴 크기에 대한 비율이라 사진 크기와 무관하다.
 */
export function mapLandmarksToSelections(landmarks: FaceApi.FaceLandmarks68): Record<string, string> {
  const jaw: Point[] = landmarks.getJawOutline();
  const leftBrow: Point[] = landmarks.getLeftEyeBrow();
  const rightBrow: Point[] = landmarks.getRightEyeBrow();
  const nose: Point[] = landmarks.getNose();
  const leftEye: Point[] = landmarks.getLeftEye();
  const rightEye: Point[] = landmarks.getRightEye();
  const mouth: Point[] = landmarks.getMouth();

  const faceWidth = Math.abs(jaw[16].x - jaw[0].x);
  const browTopY = Math.min(...leftBrow.map((p) => p.y), ...rightBrow.map((p) => p.y));
  const chinY = jaw[8].y;
  // 눈썹 위 이마는 점이 없으므로 눈썹~턱 길이에 이마 몫을 더해 얼굴 길이를 추정한다
  const faceHeight = (chinY - browTopY) * 1.35;

  const selections: Record<string, string> = {};

  // 1. 얼굴형: 가로/세로 비율 + 턱 폭/광대 폭
  const cheekWidth = Math.abs(jaw[15].x - jaw[1].x);
  const jawWidth = Math.abs(jaw[12].x - jaw[4].x);
  const ratio = faceWidth / faceHeight;
  const jawToCheek = jawWidth / cheekWidth;
  if (ratio < 0.86 && jawToCheek < 0.72) selections["face-shape"] = "inverted-triangle";
  else if (ratio > 0.92) selections["face-shape"] = "round";
  else if (ratio > 0.84) selections["face-shape"] = jawToCheek > 0.84 ? "square" : "round";
  else if (ratio > 0.72) selections["face-shape"] = "oval";
  else selections["face-shape"] = "long";

  // 2. 이마: 눈썹 ~ 콧대 시작점 거리를 얼굴 길이로 나눈 값 (이마 높이의 근사치)
  const browY = (leftBrow[2].y + rightBrow[2].y) / 2;
  const noseTopY = nose[0].y;
  const browHeight = (noseTopY - browY) / faceHeight;
  if (browHeight > 0.16) selections.forehead = "wide-high";
  else if (browHeight > 0.12) selections.forehead = "flat";
  else selections.forehead = "narrow-low";

  // 3. 눈: 세로/가로 비율 + 눈꼬리 기울기
  const eyeWidth = (Math.abs(leftEye[3].x - leftEye[0].x) + Math.abs(rightEye[3].x - rightEye[0].x)) / 2;
  const eyeHeight =
    (Math.abs(leftEye[4].y - leftEye[1].y) +
      Math.abs(leftEye[5].y - leftEye[2].y) +
      Math.abs(rightEye[4].y - rightEye[1].y) +
      Math.abs(rightEye[5].y - rightEye[2].y)) /
    4;
  const eyeAspect = eyeHeight / eyeWidth;
  // 바깥 눈꼬리가 안쪽보다 위(작은 y)면 양수 → 올라간 눈꼬리
  // 왼눈(36~41): 0번이 바깥, 3번이 안쪽 / 오른눈(42~47): 0번이 안쪽, 3번이 바깥
  const tilt = (leftEye[3].y - leftEye[0].y + (rightEye[0].y - rightEye[3].y)) / (2 * eyeWidth);
  if (eyeAspect > 0.38) selections.eyes = "large-round";
  else if (eyeAspect < 0.22) selections.eyes = tilt > 0.03 ? "phoenix" : "small-sharp";
  else if (tilt > 0.08) selections.eyes = "upturned";
  else if (tilt < -0.08) selections.eyes = "downturned";
  else selections.eyes = eyeAspect >= 0.3 ? "large-round" : "small-sharp";

  // 4. 코: 콧방울 폭/코 길이, 콧방울 폭/얼굴 폭
  const noseWidth = Math.abs(nose[8].x - nose[4].x);
  const noseLength = Math.abs(nose[6].y - nose[0].y);
  const noseRatio = noseWidth / noseLength;
  const noseRel = noseWidth / faceWidth;
  if (noseRatio > 0.75 || noseRel > 0.3) selections.nose = "wide-fleshy";
  else if (noseRatio < 0.5) selections.nose = "high-straight";
  else if (noseRel < 0.22) selections.nose = "small-delicate";
  else selections.nose = "button";

  // 5. 입: 입꼬리 높이 vs 입 가운데 높이, 입술 두께/입 폭
  const mouthWidth = Math.abs(mouth[6].x - mouth[0].x);
  const cornerY = (mouth[0].y + mouth[6].y) / 2;
  const centerY = (mouth[3].y + mouth[9].y) / 2;
  const lipThickness = Math.abs(mouth[9].y - mouth[3].y) / mouthWidth;
  const cornerLift = (centerY - cornerY) / mouthWidth; // 양수면 입꼬리가 가운데보다 위
  if (cornerLift > 0.08) selections.mouth = "upturned-corners";
  else if (cornerLift < -0.08) selections.mouth = "downturned-corners";
  else if (lipThickness > 0.42) selections.mouth = "large-full";
  else if (lipThickness < 0.28) selections.mouth = "small-thin";
  else selections.mouth = "bow-shaped";

  // 6. 턱: 턱 끝이 턱선 양쪽보다 얼마나 아래로 내려왔는지 / 턱 폭
  const chinDrop = jaw[8].y - (jaw[4].y + jaw[12].y) / 2;
  const chinRatio = chinDrop / jawWidth;
  if (chinRatio > 0.5) selections.chin = "pointed";
  else if (chinRatio < 0.3) selections.chin = "square";
  else selections.chin = "round";

  // 실제 옵션 id 인지 마지막으로 확인
  Object.keys(selections).forEach((featureId) => {
    selections[featureId] = ensureValid(featureId, selections[featureId]);
  });
  return selections;
}

export function usePhotoFaceReading() {
  const faceApiRef = useRef<FaceApiModule | null>(null);
  const [phase, setPhase] = useState<PhotoPhase>("idle");
  const [progress, setProgress] = useState(0);

  /** face-api.js 와 모델을 한 번만 읽어 둔다 */
  const loadModels = useCallback(async (): Promise<FaceApiModule> => {
    if (faceApiRef.current) return faceApiRef.current;
    const faceapi = await import("face-api.js");
    setProgress(25);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    setProgress(45);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    setProgress(60);
    faceApiRef.current = faceapi;
    return faceapi;
  }, []);

  /** 사진 화면에 들어왔을 때 미리 모델을 받아 둔다 (실패해도 조용히 넘어감) */
  const preload = useCallback(() => {
    loadModels().catch(() => {});
  }, [loadModels]);

  /**
   * 사진 파일을 분석해 부위별 선택지를 돌려준다.
   * @returns 얼굴을 못 찾으면 null. 그 밖의 오류는 예외로 던진다.
   */
  const analyzePhoto = useCallback(
    async (file: File): Promise<Record<string, string> | null> => {
      setPhase("preparing");
      setProgress(5);
      const image = await loadResizedImage(file);
      setProgress(15);

      const faceapi = await loadModels();
      setPhase("detecting");
      setProgress(70);

      const detection = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.4 }))
        .withFaceLandmarks();
      setProgress(90);

      if (!detection) {
        setPhase("idle");
        setProgress(0);
        return null;
      }

      const selections = mapLandmarksToSelections(detection.landmarks);
      setProgress(100);
      setPhase("done");
      return selections;
    },
    [loadModels]
  );

  const reset = useCallback(() => {
    setPhase("idle");
    setProgress(0);
  }, []);

  return { analyzePhoto, preload, reset, phase, progress };
}
