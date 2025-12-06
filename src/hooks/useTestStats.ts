"use client";

import { useState, useEffect } from "react";
import { getTestStats, getAllTestStats, incrementPlayCount, incrementLikeCount, TestStats } from "@/lib/firebase";

// 단일 테스트 통계 훅
export function useTestStats(testId: string) {
  const [stats, setStats] = useState<TestStats>({ playCount: 0, likeCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const data = await getTestStats(testId);
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, [testId]);

  return { stats, loading };
}

// 모든 테스트 통계 훅
export function useAllTestStats() {
  const [allStats, setAllStats] = useState<Record<string, TestStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllStats() {
      const data = await getAllTestStats();
      setAllStats(data);
      setLoading(false);
    }
    fetchAllStats();
  }, []);

  return { allStats, loading };
}

// 조회수 증가 (중복 방지)
export function useIncrementPlay(testId: string) {
  useEffect(() => {
    const playedKey = `played_${testId}`;
    const hasPlayed = sessionStorage.getItem(playedKey);
    
    if (!hasPlayed) {
      incrementPlayCount(testId);
      sessionStorage.setItem(playedKey, "true");
    }
  }, [testId]);
}

// 추천 기능
export function useLike(testId: string) {
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const likedKey = `liked_${testId}`;
    setHasLiked(localStorage.getItem(likedKey) === "true");
  }, [testId]);

  const toggleLike = async () => {
    if (hasLiked || isLiking) return;
    
    setIsLiking(true);
    await incrementLikeCount(testId);
    localStorage.setItem(`liked_${testId}`, "true");
    setHasLiked(true);
    setIsLiking(false);
  };

  return { hasLiked, toggleLike, isLiking };
}

