import { askQuestion, printInfo } from '../cli/prompt';
import { calculateBigFiveScores, BigFiveScores } from './calculator';

const BIGFIVE_QUESTIONS = [
  '新しい経験をすることが好きだ。毎回同じことをするより、異なることに挑戦したい',
  '物事を計画的に進めるのが得意だ。約束や期限を守ることは重要だと考えている',
  '人付き合いが得意で、大勢の人との交流を楽しむ。新しい人間関係を作ることは自然だ',
  '他人の気持ちを理解しようとする。協力することが得意で、相手のためになることをしたい',
  '小さなことでも気になって、不安になることが多い。ストレスを感じやすい方だ',
  '創造的なことや芸術的なものに興味がある。物事を独自の視点で考えることが好きだ',
  '環境が整理整頓されていることが重要だ。物事をきちんとやり遂げることにこだわる',
  '大人数の中にいるより、一人の時間や少人数での関係を好む。静かな環境で過ごすことが落ち着く',
  '意見の衝突を避けるより、正直に言いたいことを言う。競争的な環境でも動じない',
  '失敗しても落ち込まない。周囲の意見に左右されず、精神的に安定している',
];

export interface BigFiveResult {
  answers: number[];
  scores: BigFiveScores;
}

export async function runBigFiveDiagnostic(): Promise<BigFiveResult> {
  const answers: number[] = [];

  for (let i = 0; i < BIGFIVE_QUESTIONS.length; i++) {
    console.log(`\n[${i + 1}/10]`);
    const answer = await askQuestion(BIGFIVE_QUESTIONS[i]);
    answers.push(answer);
  }

  const scores = calculateBigFiveScores(answers);

  printInfo('ビッグファイブ診断が完了しました。');

  return { answers, scores };
}
