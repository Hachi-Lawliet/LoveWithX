import { DiagnosticResult } from '../types';
import {
  interpretBigFiveScores,
  getAttachmentTypeDescription,
} from './calculator';

export function displayDiagnosticResults(result: DiagnosticResult): void {
  const bigFiveInterpretation = interpretBigFiveScores(result.bigFive);

  console.log(`
【ビッグファイブ性格診断の結果】

開放性:          ${result.bigFive.openness.toFixed(2)}/5.0 - ${bigFiveInterpretation['開放性']}
誠実性:          ${result.bigFive.conscientiousness.toFixed(2)}/5.0 - ${bigFiveInterpretation['誠実性']}
外向性:          ${result.bigFive.extraversion.toFixed(2)}/5.0 - ${bigFiveInterpretation['外向性']}
協調性:          ${result.bigFive.agreeableness.toFixed(2)}/5.0 - ${bigFiveInterpretation['協調性']}
神経症傾向:      ${result.bigFive.neuroticism.toFixed(2)}/5.0 - ${bigFiveInterpretation['神経症傾向']}

  `);

  console.log(`【愛着タイプ診断の結果】

安全型:   ${result.attachment.secure.toFixed(2)}/5.0
不安型:   ${result.attachment.anxious.toFixed(2)}/5.0
回避型:   ${result.attachment.avoidant.toFixed(2)}/5.0

あなたの優位な愛着タイプ:
${getAttachmentTypeDescription(result.attachmentType)}

  `);
}
