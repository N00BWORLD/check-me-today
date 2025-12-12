import {
    signInAnonymously,
    GoogleAuthProvider,
    linkWithPopup,
    User,
    getAuth
} from "firebase/auth";
import { auth } from "./firebase";

// 익명 로그인 (앱 초기화 시 자동 호출)
export const signInAnonymousUser = async (): Promise<User> => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error("Anonymous auth failed", error);
        throw error;
    }
};

// 구글 계정 연동 (익명 -> 실명 전환)
export const linkGoogleAccount = async (currentUser: User) => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await linkWithPopup(currentUser, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return result.user;
    } catch (error: any) {
        if (error.code === 'auth/credential-already-in-use') {
            // 이미 다른 계정에 연동된 경우의 처리 로직
            // 실제 구현 시에는 "기존 계정으로 로그인하시겠습니까?" 팝업 필요
            console.warn("Credential already in use");
            throw new Error("ALREADY_LINKED");
        }
        console.error("Link failed", error);
        throw error;
    }
};
