// ビッグファイブのスコア型
export interface BigFiveScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

// 愛着タイプのスコア型
export interface AttachmentScores {
  secure: number;
  anxious: number;
  avoidant: number;
}

// ユーザーの診断結果
export interface DiagnosticResult {
  userId: string;
  timestamp: string;
  bigFive: BigFiveScores;
  attachment: AttachmentScores;
  attachmentType: 'secure' | 'anxious' | 'avoidant' | 'mixed';
  compatibility?: number;
}

// ユーザーセッション
export interface UserSession {
  userId: string;
  name: string;
  currentChapter: number;
  diagnosticResult?: DiagnosticResult;
  chatHistory: ChatMessage[];
}

// チャットメッセージ
export interface ChatMessage {
  role: 'user' | 'devi';
  content: string;
  timestamp: string;
}
