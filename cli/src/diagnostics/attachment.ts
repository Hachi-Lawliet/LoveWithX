import { askQuestion, printInfo } from '../cli/prompt';
import {
  calculateAttachmentScores,
  determineAttachmentType,
  AttachmentScores,
} from './calculator';

const ATTACHMENT_QUESTIONS = [
  'パートナーが私のそばにいなくても、相手の愛情を信じている',
  '親密な関係を持つことは自然で、それに対して恐れや不安を感じない',
  'パートナーとの衝突が生じても、相手を信じて問題を解決しようとする',
  'パートナーとの関係は安定していて、将来について楽観的である',
  'パートナーが必要な時に頼ることができ、相手も私に頼ることができる',
  'パートナーがどう思っているか不安で、頻繁に確認したくなる',
  '相手が返信を返さないと、すぐに「嫌われているのではないか」と考える',
  'パートナーに完璧でありたいと思い、失敗を極度に恐れる',
  'パートナーが他の人と接している時、嫉妬心や不安を感じることが多い',
  'パートナーが少し距離を取ろうとすると、強い不安や焦りを感じる',
  '親密な関係に入ると、窒息するような感覚を覚える',
  'パートナーが感情的になると、どう対応してよいかわからず、距離を取りたくなる',
  'パートナーとの関係が「重い」と感じることがある',
  '他人に弱さや本当の気持ちを見せることが難しい',
  '独立性を保つことが重要で、パートナーに完全に頼ることは避けたい',
  '関係が進展するにつれて、相手に対する気持ちが冷めることが多い',
  'パートナーを「理想化」することがある。その後、現実が理想と違うと失望する',
  '複数の恋愛パターンを見ると「同じことの繰り返し」だと感じることがある',
  'パートナーとの「約束の守り方」について不満を持つことが多い',
  'もしパートナーが私を見捨てたら、どのように対応してよいかわからない',
];

export interface AttachmentResult {
  answers: number[];
  scores: AttachmentScores;
  type: 'secure' | 'anxious' | 'avoidant' | 'mixed';
}

export async function runAttachmentDiagnostic(): Promise<AttachmentResult> {
  const answers: number[] = [];

  for (let i = 0; i < ATTACHMENT_QUESTIONS.length; i++) {
    console.log(`\n[${i + 1}/20]`);
    const answer = await askQuestion(ATTACHMENT_QUESTIONS[i]);
    answers.push(answer);
  }

  const scores = calculateAttachmentScores(answers);
  const type = determineAttachmentType(scores);

  printInfo('愛着タイプ診断が完了しました。');

  return { answers, scores, type };
}
