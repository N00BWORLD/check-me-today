import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface TestResultData {
    testId: string;
    resultType: string;
    score: number;
    createdAt?: any;
}

// 사용자 결과 저장 (Subcollection)
export const saveUserResult = async (userId: string, data: TestResultData) => {
    try {
        // /users/{uid}/results/{resultId}
        // resultId를 timestamp 등으로 생성하여 고유하게 저장
        const resultId = `${data.testId}_${Date.now()}`;
        const resultRef = doc(db, "users", userId, "results", resultId);

        await setDoc(resultRef, {
            ...data,
            createdAt: serverTimestamp(),
            platform: navigator.userAgent // 간단한 분석용
        });

        // 사용자 메타데이터 업데이트 (최근 활동 기록)
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            lastActive: serverTimestamp(),
            isAnonymous: true // 나중에 실명 전환 시 false로 변경
        }, { merge: true });

        console.log("Result saved successfully");
    } catch (error) {
        console.error("Error saving result:", error);
        throw error;
    }
};
