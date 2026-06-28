import * as dotenv from 'dotenv';
import {
  printTitle,
  printSection,
  printSuccess,
  printInfo,
  printSeparator,
  selectOption,
  askText,
  closePrompt,
} from './cli/prompt';
import { runBigFiveDiagnostic } from './diagnostics/bigfive';
import { runAttachmentDiagnostic } from './diagnostics/attachment';
import { displayDiagnosticResults } from './diagnostics/display';
import { BigFiveScores, AttachmentScores, DiagnosticResult } from './types';
import { saveDiagnosticResult, loadDiagnosticResult, listSavedResults } from './utils/fileStorage';

// .env ファイルを読み込む
dotenv.config();

async function main() {
  try {
    printTitle('🌸 LoveWithX - 恋愛心理学習プログラム');

    // ようこそメッセージ
    console.log(
      'このプログラムでは、デヴィとの対話を通じて、恋愛心理学とマナーを学びます。\n'
    );
    console.log(
      '最初に、あなたの性格特性と愛着スタイルを診断する必要があります。\n'
    );

    // ユーザー名を入力
    const userName = await askText('あなたのお名前を教えてください: ');
    printSuccess(`ようこそ、${userName}さん！`);

    // メニュー
    const menuChoice = await selectOption(
      '何をしますか？',
      ['診断を実施する', '既存の診断結果を読み込む', '終了する']
    );

    if (menuChoice === 2) {
      printInfo('プログラムを終了します。');
      closePrompt();
      return;
    }

    let diagnosticResult: DiagnosticResult;

    if (menuChoice === 0) {
      // 新規診断
      printSection('ステップ 1: ビッグファイブ性格診断');
      printInfo('以下の10項目について、1～5で評価してください。');
      const bigFiveAnswers = await runBigFiveDiagnostic();

      printSection('ステップ 2: 愛着タイプ診断');
      printInfo('以下の20項目について、1～5で評価してください。');
      const attachmentAnswers = await runAttachmentDiagnostic();

      diagnosticResult = {
        userId: generateUserId(),
        timestamp: new Date().toISOString(),
        bigFive: bigFiveAnswers.scores,
        attachment: attachmentAnswers.scores,
        attachmentType: attachmentAnswers.type,
      };

      // 診断結果を表示
      printSection('診断結果');
      displayDiagnosticResults(diagnosticResult);

      // 結果を保存するか
      const saveChoice = await selectOption(
        '診断結果を保存しますか？',
        ['はい', 'いいえ']
      );
      if (saveChoice === 0) {
        const filePath = saveDiagnosticResult(diagnosticResult);
        printSuccess(`診断結果を保存しました: ${filePath}`);
        printInfo(
          'Claude.ai でデヴィと対話する際に、このファイルの内容をコピペしてください。'
        );
      }
    } else {
      // 既存結果の読み込み
      printInfo('機能は後で実装予定です。');
      closePrompt();
      return;
    }

    // 次のステップ
    printSection('次のステップ');
    console.log(`
あなたの診断結果に基づいて、デヴィが最適な講義をカスタマイズします。

📚 第1章：愛着理論の基礎
  を学ぶ準備ができました。
    `);

    const continueChoice = await selectOption(
      '何をしますか？',
      ['第1章を開始する', 'ダッシュボードを表示する', '終了する']
    );

    if (continueChoice === 0) {
      printInfo('第1章の講義機能は後で実装予定です。');
    } else if (continueChoice === 1) {
      displayDashboard(userName, diagnosticResult);
    }

    closePrompt();
  } catch (error) {
    console.error('エラーが発生しました:', error);
    closePrompt();
    process.exit(1);
  }
}

/**
 * ユーザーID を生成
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * ダッシュボード表示
 */
function displayDashboard(
  userName: string,
  result: DiagnosticResult
): void {
  printTitle(`ダッシュボード - ${userName}さん`);

  console.log(`
【あなたの診断結果】

📊 ビッグファイブスコア:
  - 開放性: ${result.bigFive.openness.toFixed(2)}/5.0
  - 誠実性: ${result.bigFive.conscientiousness.toFixed(2)}/5.0
  - 外向性: ${result.bigFive.extraversion.toFixed(2)}/5.0
  - 協調性: ${result.bigFive.agreeableness.toFixed(2)}/5.0
  - 神経症傾向: ${result.bigFive.neuroticism.toFixed(2)}/5.0

💝 愛着タイプ:
  - ${result.attachmentType === 'secure' ? '安全型' : result.attachmentType === 'anxious' ? '不安型' : '回避型'}

【学習進捗】
  📖 第1章: 未開始
  📖 第2章～7章: 未開始

【推奨アクション】
  ▶ 第1章を開始
  `);
}

// プログラム開始
main().catch(console.error);
