// yagem - 비밀 게임 룰렛 데이터
// 주소창으로만 접근 가능 (/yagem)

export interface GameTag {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Game {
  id: string;
  name: string;
  tags: string[];
  developer?: string;
}

// 게임 태그 분류
export const gameTags: GameTag[] = [
  { id: "vanilla", name: "바닐라", emoji: "🍦", color: "from-pink-400 to-pink-600" },
  { id: "interspecies", name: "이종간", emoji: "🐾", color: "from-amber-400 to-orange-600" },
  { id: "pregnancy", name: "임신", emoji: "🤰", color: "from-rose-400 to-red-600" },
  { id: "futa", name: "후타", emoji: "⚧️", color: "from-purple-400 to-violet-600" },
  { id: "monster", name: "몬스터", emoji: "👹", color: "from-green-500 to-emerald-700" },
  { id: "tentacle", name: "촉수", emoji: "🦑", color: "from-indigo-400 to-blue-600" },
  { id: "ntr", name: "NTR", emoji: "💔", color: "from-gray-500 to-slate-700" },
  { id: "harem", name: "하렘", emoji: "👑", color: "from-yellow-400 to-amber-600" },
  { id: "milf", name: "유부녀", emoji: "💋", color: "from-red-400 to-rose-600" },
  { id: "loli", name: "로리", emoji: "🎀", color: "from-pink-300 to-pink-500" },
  { id: "femdom", name: "펨돔", emoji: "👠", color: "from-fuchsia-400 to-pink-600" },
  { id: "maledom", name: "멜돔", emoji: "🔗", color: "from-slate-500 to-gray-700" },
  { id: "fantasy", name: "판타지", emoji: "🧙", color: "from-cyan-400 to-blue-600" },
  { id: "school", name: "학원", emoji: "🏫", color: "from-blue-400 to-indigo-600" },
  { id: "rpg", name: "RPG", emoji: "⚔️", color: "from-orange-400 to-red-600" },
  { id: "simulation", name: "시뮬", emoji: "🎮", color: "from-teal-400 to-cyan-600" },
  { id: "visual", name: "비주얼", emoji: "📖", color: "from-violet-400 to-purple-600" },
  { id: "action", name: "액션", emoji: "💥", color: "from-red-500 to-orange-600" },
];

// 게임 목록 (방주/소미소프트 스타일)
export const games: Game[] = [
  // 판타지/RPG 계열
  { id: "1", name: "마녀의 집", tags: ["fantasy", "rpg", "vanilla"], developer: "소미소프트" },
  { id: "2", name: "에로게! ~H도 게임도 개발삼매경~", tags: ["school", "harem", "visual"], developer: "클락업" },
  { id: "3", name: "란스 시리즈", tags: ["fantasy", "rpg", "harem", "monster"], developer: "앨리스소프트" },
  { id: "4", name: "다크니스 히어로", tags: ["fantasy", "futa", "tentacle"], developer: "인디" },
  { id: "5", name: "모게코 성", tags: ["fantasy", "monster", "interspecies"], developer: "모게코" },
  { id: "6", name: "성녀의 가호", tags: ["fantasy", "pregnancy", "monster"], developer: "소미" },
  { id: "7", name: "요마 퇴치사", tags: ["fantasy", "action", "tentacle"], developer: "컴파일" },
  { id: "8", name: "마물 아가씨", tags: ["interspecies", "monster", "harem"], developer: "MGQ" },
  { id: "9", name: "촉수 던전", tags: ["tentacle", "rpg", "pregnancy"], developer: "인디" },
  { id: "10", name: "어둠의 계약자", tags: ["fantasy", "ntr", "femdom"], developer: "다크룸" },
  
  // 학원/일상 계열
  { id: "11", name: "학원 하렘", tags: ["school", "harem", "vanilla"], developer: "앨리스" },
  { id: "12", name: "여교사 능욕", tags: ["school", "ntr", "maledom"], developer: "어둠" },
  { id: "13", name: "보건실의 비밀", tags: ["school", "milf", "vanilla"], developer: "쿨" },
  { id: "14", name: "동아리 활동", tags: ["school", "futa", "femdom"], developer: "핑크" },
  { id: "15", name: "후배의 유혹", tags: ["school", "loli", "vanilla"], developer: "스위트" },
  
  // NTR/하드 계열
  { id: "16", name: "인처 조교", tags: ["milf", "ntr", "maledom"], developer: "다크" },
  { id: "17", name: "그녀가 빼앗긴 날", tags: ["ntr", "vanilla", "visual"], developer: "NTR소프트" },
  { id: "18", name: "최면 학원", tags: ["school", "harem", "maledom"], developer: "최면" },
  { id: "19", name: "굴욕 여기사", tags: ["fantasy", "ntr", "monster"], developer: "기사단" },
  { id: "20", name: "엄마와 함께", tags: ["milf", "vanilla", "simulation"], developer: "패밀리" },
  
  // 이종간/몬스터 계열
  { id: "21", name: "고블린 습격", tags: ["interspecies", "monster", "pregnancy"], developer: "몬스터" },
  { id: "22", name: "오크의 신부", tags: ["interspecies", "pregnancy", "fantasy"], developer: "인디" },
  { id: "23", name: "슬라임 연구소", tags: ["monster", "tentacle", "futa"], developer: "슬라임" },
  { id: "24", name: "드래곤 메이드", tags: ["interspecies", "fantasy", "harem"], developer: "드래곤" },
  { id: "25", name: "몬스터 걸 퀘스트", tags: ["interspecies", "monster", "rpg", "femdom"], developer: "MGQ" },
  
  // 임신/번식 계열
  { id: "26", name: "수태 던전", tags: ["pregnancy", "monster", "rpg"], developer: "던전" },
  { id: "27", name: "산란 퀘스트", tags: ["pregnancy", "interspecies", "fantasy"], developer: "에그" },
  { id: "28", name: "번식의 탑", tags: ["pregnancy", "tentacle", "action"], developer: "타워" },
  { id: "29", name: "모체 농장", tags: ["pregnancy", "milf", "simulation"], developer: "팜" },
  { id: "30", name: "엘프 포획작전", tags: ["pregnancy", "fantasy", "interspecies"], developer: "엘프" },
  
  // 후타나리 계열
  { id: "31", name: "후타 학원", tags: ["futa", "school", "harem"], developer: "후타" },
  { id: "32", name: "양성구유 마녀", tags: ["futa", "fantasy", "femdom"], developer: "마녀" },
  { id: "33", name: "후타 프린세스", tags: ["futa", "fantasy", "vanilla"], developer: "프린세스" },
  { id: "34", name: "쌍성의 밤", tags: ["futa", "ntr", "visual"], developer: "나이트" },
  { id: "35", name: "후타 시스터즈", tags: ["futa", "harem", "simulation"], developer: "시스터" },
  
  // 펨돔/여성 상위 계열
  { id: "36", name: "여왕의 조교", tags: ["femdom", "fantasy", "maledom"], developer: "퀸" },
  { id: "37", name: "여전사 굴복", tags: ["femdom", "fantasy", "action"], developer: "워리어" },
  { id: "38", name: "언니의 장난감", tags: ["femdom", "vanilla", "simulation"], developer: "시스" },
  { id: "39", name: "사모님 게임", tags: ["femdom", "milf", "ntr"], developer: "마담" },
  { id: "40", name: "서큐버스 연애", tags: ["femdom", "monster", "interspecies"], developer: "서큐" },
  
  // 시뮬레이션/육성 계열
  { id: "41", name: "노예 육성", tags: ["simulation", "maledom", "harem"], developer: "마스터" },
  { id: "42", name: "창관 경영", tags: ["simulation", "milf", "harem"], developer: "경영" },
  { id: "43", name: "학원 아이돌", tags: ["simulation", "school", "vanilla"], developer: "아이돌" },
  { id: "44", name: "마물 목장", tags: ["simulation", "interspecies", "monster"], developer: "팜" },
  { id: "45", name: "왕국 하렘", tags: ["simulation", "fantasy", "harem", "pregnancy"], developer: "킹덤" },
  
  // 액션/전투 계열
  { id: "46", name: "여기사 패배", tags: ["action", "fantasy", "ntr"], developer: "배틀" },
  { id: "47", name: "닌자 소녀", tags: ["action", "school", "vanilla"], developer: "닌자" },
  { id: "48", name: "마법소녀 타락", tags: ["action", "tentacle", "monster"], developer: "마법" },
  { id: "49", name: "여전투원 포획", tags: ["action", "maledom", "pregnancy"], developer: "캡쳐" },
  { id: "50", name: "패배 엔딩 컬렉션", tags: ["action", "monster", "tentacle", "ntr"], developer: "엔딩" },
  
  // 비주얼 노벨 계열
  { id: "51", name: "여름의 기억", tags: ["visual", "school", "vanilla"], developer: "서머" },
  { id: "52", name: "엄마는 친구", tags: ["visual", "milf", "vanilla"], developer: "맘" },
  { id: "53", name: "언니가 좋아", tags: ["visual", "vanilla", "femdom"], developer: "시스" },
  { id: "54", name: "금단의 관계", tags: ["visual", "ntr", "milf"], developer: "금단" },
  { id: "55", name: "사촌 동생과", tags: ["visual", "loli", "vanilla"], developer: "패밀리" },
  
  // 특수 장르
  { id: "56", name: "TS 아카데미", tags: ["futa", "school", "simulation"], developer: "TS" },
  { id: "57", name: "성전환 던전", tags: ["futa", "rpg", "fantasy"], developer: "젠더" },
  { id: "58", name: "촉수 공주", tags: ["tentacle", "fantasy", "pregnancy"], developer: "텐타클" },
  { id: "59", name: "이세계 하렘왕", tags: ["fantasy", "harem", "pregnancy", "interspecies"], developer: "이세계" },
  { id: "60", name: "악의 여간부", tags: ["femdom", "fantasy", "action", "ntr"], developer: "빌런" },
];

// 게임 필터링 함수
export function filterGamesByTags(selectedTags: string[]): Game[] {
  if (selectedTags.length === 0) return games;
  return games.filter(game => 
    selectedTags.some(tag => game.tags.includes(tag))
  );
}

// 랜덤 게임 선택 함수
export function getRandomGame(filteredGames: Game[]): Game | null {
  if (filteredGames.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * filteredGames.length);
  return filteredGames[randomIndex];
}

