import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * ユーザーに質問し、1-5の数値入力を受け取る
 * @param question 質問文
 * @returns ユーザーの回答（1-5）
 */
export async function askQuestion(question: string): Promise<number> {
  return new Promise((resolve) => {
    const promptText = question + '\n回答 (1-5): ';
    rl.question(promptText, (answer) => {
      const num = parseInt(answer, 10);
      if (isNaN(num) || num < 1 || num > 5) {
        console.log('❌ 1～5の数字で答えてください');
        // 再度聞く（再帰）
        askQuestion(question).then(resolve);
      } else {
        resolve(num);
      }
    });
  });
}

/**
 * ユーザーにテキスト入力を促す
 * @param prompt プロンプトテキスト
 * @returns ユーザーの入力
 */
export async function askText(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * ユーザーに選択肢から選ばせる
 * @param message メッセージ
 * @param choices 選択肢配列
 * @returns 選択された選択肢のインデックス
 */
export async function selectOption(
  message: string,
  choices: string[]
): Promise<number> {
  console.log('\n' + message);
  choices.forEach((choice, idx) => {
    console.log(`  ${idx + 1}. ${choice}`);
  });

  return new Promise((resolve) => {
    rl.question('選択 (数字で入力): ', (answer) => {
      const num = parseInt(answer, 10);
      if (isNaN(num) || num < 1 || num > choices.length) {
        console.log('❌ 有効な選択肢を入力してください');
        selectOption(message, choices).then(resolve);
      } else {
        resolve(num - 1);
      }
    });
  });
}

/**
 * CLIのクローズ
 */
export function closePrompt(): void {
  rl.close();
}

/**
 * 区切り線を表示
 */
export function printSeparator(): void {
  console.log('─'.repeat(60));
}

/**
 * タイトルを表示
 * @param title タイトル
 */
export function printTitle(title: string): void {
  console.log('\n');
  console.log('═'.repeat(60));
  console.log(`  ${title}`);
  console.log('═'.repeat(60));
  console.log('\n');
}

/**
 * セクションタイトルを表示
 * @param section セクション名
 */
export function printSection(section: string): void {
  console.log('\n▶ ' + section);
  printSeparator();
  console.log('');
}

/**
 * 成功メッセージ
 * @param message メッセージ
 */
export function printSuccess(message: string): void {
  console.log('✅ ' + message);
}

/**
 * エラーメッセージ
 * @param message メッセージ
 */
export function printError(message: string): void {
  console.log('❌ ' + message);
}

/**
 * 情報メッセージ
 * @param message メッセージ
 */
export function printInfo(message: string): void {
  console.log('ℹ️  ' + message);
}
