export type BigFiveScores = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};

export type AttachmentScores = {
  secure: number;
  anxious: number;
  avoidant: number;
};

/**
 * ビッグファイブ診断のスコア計算
 * @param answers 10問の回答配列（1-5の値）
 * @returns BigFiveScores
 */
export function calculateBigFiveScores(answers: number[]): BigFiveScores {
  if (answers.length !== 10) {
    throw new Error('ビッグファイブ診断は10問が必須です');
  }

  // 逆転項目（質問8, 質問9, 質問10は逆転）
  const adjustedAnswers = answers.map((ans, idx) => {
    if (idx === 7 || idx === 8 || idx === 9) {
      return 6 - ans; // 1→5, 2→4, 3→3, 4→2, 5→1
    }
    return ans;
  });

  return {
    // 開放性（質問1, 6）
    openness: (adjustedAnswers[0] + adjustedAnswers[5]) / 2,
    // 誠実性（質問2, 7）
    conscientiousness: (adjustedAnswers[1] + adjustedAnswers[6]) / 2,
    // 外向性（質問3, 8逆転）
    extraversion: (adjustedAnswers[2] + adjustedAnswers[7]) / 2,
    // 協調性（質問4, 9逆転）
    agreeableness: (adjustedAnswers[3] + adjustedAnswers[8]) / 2,
    // 神経症傾向（質問5, 10逆転）
    neuroticism: (adjustedAnswers[4] + adjustedAnswers[9]) / 2,
  };
}

/**
 * 愛着タイプ診断のスコア計算
 * @param answers 20問の回答配列（1-5の値）
 * @returns AttachmentScores
 */
export function calculateAttachmentScores(answers: number[]): AttachmentScores {
  if (answers.length !== 20) {
    throw new Error('愛着タイプ診断は20問が必須です');
  }

  return {
    // 安全型（質問1-5）
    secure: answers.slice(0, 5).reduce((a, b) => a + b) / 5,
    // 不安型（質問6-10）
    anxious: answers.slice(5, 10).reduce((a, b) => a + b) / 5,
    // 回避型（質問11-15）
    avoidant: answers.slice(10, 15).reduce((a, b) => a + b) / 5,
  };
}

/**
 * 最優位な愛着タイプを判定
 * @param scores AttachmentScores
 * @returns 愛着タイプ
 */
export function determineAttachmentType(
  scores: AttachmentScores
): 'secure' | 'anxious' | 'avoidant' | 'mixed' {
  const threshold = 3.5;

  // 複数が3.5以上の場合は混合型
  const highCount = Object.values(scores).filter((s) => s >= threshold).length;
  if (highCount >= 2) {
    // 最高スコアで判定（混合型をより細かく判定する場合は拡張）
    const max = Math.max(scores.secure, scores.anxious, scores.avoidant);
    if (max === scores.secure) return 'secure';
    if (max === scores.anxious) return 'anxious';
    return 'avoidant';
  }

  // 単一の最高スコア
  const max = Math.max(scores.secure, scores.anxious, scores.avoidant);
  if (max === scores.secure) return 'secure';
  if (max === scores.anxious) return 'anxious';
  return 'avoidant';
}

/**
 * スコアレベルを文字列で取得
 * @param score 1-5のスコア
 * @returns レベル名
 */
export function getScoreLevel(score: number): string {
  if (score < 1.8) return '非常に低い';
  if (score < 2.6) return '低い';
  if (score < 3.4) return '中程度';
  if (score < 4.2) return '高い';
  return '非常に高い';
}

/**
 * ビッグファイブのレーティングを日本語で取得
 * @param scores BigFiveScores
 * @returns 日本語説明オブジェクト
 */
export function interpretBigFiveScores(
  scores: BigFiveScores
): Record<string, string> {
  return {
    開放性: getScoreLevel(scores.openness),
    誠実性: getScoreLevel(scores.conscientiousness),
    外向性: getScoreLevel(scores.extraversion),
    協調性: getScoreLevel(scores.agreeableness),
    神経症傾向: getScoreLevel(scores.neuroticism),
  };
}

/**
 * 愛着タイプの説明を取得
 * @param type 愛着タイプ
 * @returns 説明文
 */
export function getAttachmentTypeDescription(
  type: 'secure' | 'anxious' | 'avoidant' | 'mixed'
): string {
  const descriptions: Record<string, string> = {
    secure:
      '安全型愛着：相手との関係に信頼と安定感を持つ傾向があります。恋愛関係が長続きしやすいタイプです。',
    anxious:
      '不安型愛着：相手の愛情について不安が多く、確認欲求が強い傾向があります。相手の反応に敏感なタイプです。',
    avoidant:
      '回避型愛着：親密さに窒息感を覚え、独立性を重視する傾向があります。感情表現が苦手なタイプです。',
    mixed:
      '混合型愛着：複数の愛着パターンが混在しています。状況や相手によって異なる反応を示すタイプです。',
  };

  return descriptions[type] || '不明なタイプです';
}
