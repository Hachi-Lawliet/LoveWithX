import * as fs from 'fs';
import * as path from 'path';
import { DiagnosticResult } from '../types';

const RESULTS_DIR = path.join(__dirname, '../../results');

/**
 * results ディレクトリを作成
 */
export function ensureResultsDir(): void {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }
}

/**
 * 診断結果を JSON で保存
 * @param result DiagnosticResult
 * @returns 保存先ファイルパス
 */
export function saveDiagnosticResult(result: DiagnosticResult): string {
  ensureResultsDir();

  const fileName = `${result.userId}_diagnostic.json`;
  const filePath = path.join(RESULTS_DIR, fileName);

  const jsonContent = JSON.stringify(result, null, 2);
  fs.writeFileSync(filePath, jsonContent, 'utf-8');

  return filePath;
}

/**
 * 診断結果を JSON から読み込み
 * @param userId ユーザーID
 * @returns DiagnosticResult
 */
export function loadDiagnosticResult(userId: string): DiagnosticResult | null {
  ensureResultsDir();

  const fileName = `${userId}_diagnostic.json`;
  const filePath = path.join(RESULTS_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const jsonContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonContent) as DiagnosticResult;
  } catch (error) {
    console.error('ファイル読み込みエラー:', error);
    return null;
  }
}

/**
 * 保存済みの診断結果リストを取得
 * @returns ユーザーID配列
 */
export function listSavedResults(): string[] {
  ensureResultsDir();

  const files = fs.readdirSync(RESULTS_DIR);
  return files
    .filter((f) => f.endsWith('_diagnostic.json'))
    .map((f) => f.replace('_diagnostic.json', ''));
}
