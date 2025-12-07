"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { games, gameTags, filterGamesByTags, type Game, type GameTag } from "@/data/yagem";

export default function YagemPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinHistory, setSpinHistory] = useState<Game[]>([]);
  const [showTagPanel, setShowTagPanel] = useState(true);
  
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const filteredGames = filterGamesByTags(selectedTags);

  // 태그 토글
  const toggleTag = useCallback((tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  }, []);

  // 모든 태그 초기화
  const clearTags = useCallback(() => {
    setSelectedTags([]);
  }, []);

  // 룰렛 스핀
  const spin = useCallback(() => {
    if (filteredGames.length === 0 || isSpinning) return;
    
    setIsSpinning(true);
    let spinCount = 0;
    const maxSpins = 20 + Math.floor(Math.random() * 10);
    
    spinIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filteredGames.length);
      setCurrentGame(filteredGames[randomIndex]);
      spinCount++;
      
      if (spinCount >= maxSpins) {
        if (spinIntervalRef.current) {
          clearInterval(spinIntervalRef.current);
        }
        const finalGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
        setCurrentGame(finalGame);
        setSpinHistory(prev => [finalGame, ...prev].slice(0, 10));
        setIsSpinning(false);
      }
    }, 50 + spinCount * 5); // 점점 느려지는 효과
  }, [filteredGames, isSpinning]);

  // 클린업
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []);

  // 태그 정보 가져오기
  const getTagInfo = (tagId: string): GameTag | undefined => {
    return gameTags.find(t => t.id === tagId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* 배경 이펙트 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            🎰 야겜 룰렛
          </h1>
          <p className="text-gray-400 text-sm">
            오늘은 뭐하지? 랜덤으로 골라보자!
          </p>
        </header>

        {/* 태그 필터 토글 */}
        <button
          onClick={() => setShowTagPanel(!showTagPanel)}
          className="w-full mb-4 py-2 px-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center justify-between transition-all"
        >
          <span className="flex items-center gap-2">
            <span>🏷️</span>
            <span className="font-medium">태그 필터</span>
            {selectedTags.length > 0 && (
              <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedTags.length}개 선택
              </span>
            )}
          </span>
          <span className={`transition-transform ${showTagPanel ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* 태그 필터 패널 */}
        {showTagPanel && (
          <div className="mb-6 p-4 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">
                {filteredGames.length}개의 게임
              </span>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearTags}
                  className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
                >
                  초기화
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {gameTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${selectedTags.includes(tag.id)
                      ? `bg-gradient-to-r ${tag.color} text-white shadow-lg scale-105`
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                    }
                  `}
                >
                  <span className="mr-1">{tag.emoji}</span>
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 메인 룰렛 영역 */}
        <div className="relative mb-8">
          {/* 결과 표시 카드 */}
          <div 
            className={`
              relative p-8 bg-black/40 backdrop-blur-xl rounded-3xl border-2 
              ${isSpinning 
                ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]' 
                : currentGame 
                  ? 'border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]'
                  : 'border-white/10'
              }
              transition-all duration-300
            `}
          >
            {/* 장식 */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-bold">
              🎲 TODAY&apos;S PICK
            </div>

            <div className="text-center py-8">
              {currentGame ? (
                <>
                  <div 
                    className={`
                      text-3xl md:text-4xl font-black mb-4 
                      ${isSpinning ? 'animate-pulse text-purple-300' : 'text-white'}
                    `}
                  >
                    {currentGame.name}
                  </div>
                  
                  {!isSpinning && (
                    <>
                      <div className="text-sm text-gray-400 mb-4">
                        {currentGame.developer && `by ${currentGame.developer}`}
                      </div>
                      
                      {/* 게임 태그들 */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {currentGame.tags.map(tagId => {
                          const tag = getTagInfo(tagId);
                          if (!tag) return null;
                          return (
                            <span
                              key={tagId}
                              className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${tag.color} text-white`}
                            >
                              {tag.emoji} {tag.name}
                            </span>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-2xl text-gray-500">
                  🎰 버튼을 눌러 게임을 뽑아보세요!
                </div>
              )}
            </div>
          </div>

          {/* 스핀 버튼 */}
          <button
            onClick={spin}
            disabled={isSpinning || filteredGames.length === 0}
            className={`
              w-full mt-6 py-4 rounded-2xl font-bold text-lg transition-all
              ${isSpinning 
                ? 'bg-purple-600 animate-pulse cursor-wait'
                : filteredGames.length === 0
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98]'
              }
            `}
          >
            {isSpinning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🎲</span>
                돌리는 중...
              </span>
            ) : filteredGames.length === 0 ? (
              '선택된 게임이 없습니다'
            ) : (
              <span>🎰 돌려돌려 돌림판!</span>
            )}
          </button>

          {/* 다시 돌리기 버튼 */}
          {currentGame && !isSpinning && (
            <button
              onClick={spin}
              className="w-full mt-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-gray-300"
            >
              🔄 다시 돌리기
            </button>
          )}
        </div>

        {/* 히스토리 */}
        {spinHistory.length > 0 && (
          <div className="p-4 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10">
            <h3 className="text-sm font-medium text-gray-400 mb-3">📜 최근 기록</h3>
            <div className="space-y-2">
              {spinHistory.map((game, index) => (
                <div
                  key={`${game.id}-${index}`}
                  className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                >
                  <span className="font-medium">{game.name}</span>
                  <div className="flex gap-1">
                    {game.tags.slice(0, 3).map(tagId => {
                      const tag = getTagInfo(tagId);
                      return tag ? (
                        <span key={tagId} className="text-xs">
                          {tag.emoji}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 푸터 */}
        <footer className="mt-12 text-center text-xs text-gray-600">
          <p>🔒 비밀 페이지 - 주소창으로만 접근 가능</p>
          <p className="mt-1">총 {games.length}개의 게임 데이터</p>
        </footer>
      </div>
    </div>
  );
}

