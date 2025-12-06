// Firebase 설정
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFfD-G0DpR3RZ_TIdTWNHUUfPr0Pfo8bI",
  authDomain: "check-me-today.firebaseapp.com",
  projectId: "check-me-today",
  storageBucket: "check-me-today.firebasestorage.app",
  messagingSenderId: "685805340530",
  appId: "1:685805340530:web:5b7c7aca57a9cba06c7feb",
  measurementId: "G-E7K0FMBXCW"
};

// Firebase 앱 초기화 (중복 방지)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// 테스트 통계 타입
export interface TestStats {
  playCount: number;
  likeCount: number;
}

// 테스트 통계 가져오기
export async function getTestStats(testId: string): Promise<TestStats> {
  try {
    const docRef = doc(db, "tests", testId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as TestStats;
    } else {
      // 문서가 없으면 생성
      const initialStats: TestStats = { playCount: 0, likeCount: 0 };
      await setDoc(docRef, initialStats);
      return initialStats;
    }
  } catch (error) {
    console.error("Error getting test stats:", error);
    return { playCount: 0, likeCount: 0 };
  }
}

// 조회수 증가
export async function incrementPlayCount(testId: string): Promise<void> {
  try {
    const docRef = doc(db, "tests", testId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        playCount: increment(1)
      });
    } else {
      await setDoc(docRef, { playCount: 1, likeCount: 0 });
    }
  } catch (error) {
    console.error("Error incrementing play count:", error);
  }
}

// 추천수 증가
export async function incrementLikeCount(testId: string): Promise<void> {
  try {
    const docRef = doc(db, "tests", testId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        likeCount: increment(1)
      });
    } else {
      await setDoc(docRef, { playCount: 0, likeCount: 1 });
    }
  } catch (error) {
    console.error("Error incrementing like count:", error);
  }
}

// 모든 테스트 통계 가져오기 (홈페이지용)
export async function getAllTestStats(): Promise<Record<string, TestStats>> {
  try {
    const { collection, getDocs } = await import("firebase/firestore");
    const querySnapshot = await getDocs(collection(db, "tests"));
    const stats: Record<string, TestStats> = {};
    
    querySnapshot.forEach((doc) => {
      stats[doc.id] = doc.data() as TestStats;
    });
    
    return stats;
  } catch (error) {
    console.error("❌ Error getting all test stats:", error);
    return {};
  }
}

export { db };

