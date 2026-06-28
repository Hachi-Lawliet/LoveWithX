# LoveWithX - 恋愛心理学習プログラム

女性らしさ、可愛げ、相手を引き出す恋愛スキルを学ぶための AI 学習システム。

デヴィという恋愛コーチと Claude.ai で対話しながら、恋愛心理学を体系的に習得します。

**GitHub**: https://github.com/Hachi-Lawliet/LoveWithX

---

## プロジェクト目標

「男性の男性らしさを引き出し、追われるような女性になる」

**学習内容**：
- 恋愛心理学の理論（愛着理論、ビッグファイブなど）
- エージェント「デヴィ」の女らしい言動・対応パターン
- 複数の診断を通じた自己理解
- 実践的な「あざとさ」の習得

---

## システム構成

### 1. エージェント：デヴィ
- 成人女性（30代）、綺麗で教養のある言葉遣い、上品で自信がある
- 参考人物：デヴィ夫人（古風な恋愛観、上品さ、指導性）
- 恋愛マナーコーチとして、言動パターンを示しながら指導・診断機能

### 2. 診断システム
- **ビッグファイブ性格診断** — 基本的な性格特性の把握
- **愛着タイプ診断** — 恋愛パターンの根底にある心理的基盤
- **相性診断** — 特定の相手との心理的マッチング
- **恋愛スタイル診断** — 愛し方の傾向
- **エピソード分析診断** — 具体的な恋愛場面の分析

### 3. 学習リソース
- `knowledge/sources_to_collect.md` — 参照する論文・著作リスト
- `curriculum/` — カリキュラムファイル（恋愛心理学）
- `notes/` — オフライン学習ノート

### 4. 設定ファイル
- `CLAUDE.md` — 菫のキャラクター設定・指示

---

## ディレクトリ構成

```
LoveWithX/
├── README.md                      # このファイル
├── CLAUDE.md                      # 菫のキャラクター設定
├── curriculum/                    # カリキュラムファイル
│   └── curriculum_romance_psychology.md
├── notes/                         # オフライン学習ノート
│   └── chapter1_attachment_theory.md
├── knowledge/                     # 知識源・論文リスト
│   └── sources_to_collect.md
└── data/                         # 診断データ・結果
    ├── diagnostic_specs.md       # 診断システム仕様
    └── results/                  # 診断結果保存先
```

---

## 使い方

### 1. クイックスタート（推奨フロー）

```
① CLI で診断を実施
   ├─ ビッグファイブ診断（10問）
   └─ 愛着タイプ診断（20問）
   ↓
② 診断結果を Claude.ai にペースト
   ↓
③ デヴィが自動で第1章から講義開始
   ↓
④ 7章を学習 → エピソード分析
   ↓
⑤ 実践 → 改善
```

### 2. ステップバイステップ

#### **ステップ1：CLI で診断を実施**

```bash
cd cli
npm install
npm run dev
```

実行内容：
- ユーザー名を入力
- ビッグファイブ診断（10問）に回答
- 愛着タイプ診断（20問）に回答
- 診断結果が表示される
- `results/{userId}_diagnostic.json` に保存

#### **ステップ2：Claude.ai を開く**

**PC の場合**：
```
https://claude.ai/
→ 新しいチャットを開始
```

**スマホの場合**：
```
Claude アプリを開く
→ 新しいチャットを開始
```

#### **ステップ3：診断結果を入力**

1. **CLI で保存された JSON をコピー**
2. **Claude.ai のチャット入力欄にペースト**
3. **送信**

デヴィが自動で対応します（カスタム指示設定済みの場合）

#### **ステップ4：デヴィとの講義を開始**

デヴィが診断結果に基づいて、第1章から順序通り講義を進めます。

### 3. カスタム指示の設定（重要）

**初回セットアップ**：

1. **Claude.ai または Claude アプリを開く**
2. **右上の設定⚙️をクリック**
3. **「Custom Instructions」を選択**
4. **以下の内容をペースト**：

```
## あなたの役割

あなたは「デヴィ」という恋愛コーチです。
以下の設定を厳密に守ってください：

GitHub 設定ファイル：
https://github.com/Hachi-Lawliet/LoveWithX/blob/main/CLAUDE.md

## 学習カリキュラム

全7章を順序通り進めてください：
https://github.com/Hachi-Lawliet/LoveWithX/blob/main/curriculum/curriculum_romance_psychology.md

## 知識ベース

必要に応じて以下の論文サマリーを参照：
- 愛着理論: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_attachment.md
- ビッグファイブ: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_personality.md
- 恋愛感情: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_romantic_love.md
- 男女の違い: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_gender_differences.md
- コミュニケーション: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_communication.md
- 信頼と親密さ: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_trust_intimacy.md
- 男性らしさ: https://github.com/Hachi-Lawliet/LoveWithX/blob/main/knowledge/papers_summary_masculinity.md

## 初回対応

ユーザーが診断結果（JSON）をペーストしたら、
その結果をもとに第1章から講義を開始してください。

タイプ別に最適な説明を心がけてください。
```

5. **保存**

これ以降、新しいチャットを開くたびにデヴィが自動で機能します。

---

## 進捗状況

### 完成済み
- [x] ディレクトリ構造
- [x] デヴィのキャラクター設定（CLAUDE.md）
- [x] 診断システム仕様書
- [x] 知識源リスト

### 進行中
- [ ] 論文・知識源の収集
- [ ] ビッグファイブ診断の問題セット作成
- [ ] 愛着タイプ診断の問題セット作成
- [ ] カリキュラム作成（恋愛心理学 7〜10章）
- [ ] オフライン学習ノートの生成

### 未着手
- [ ] Web UI / CLI の実装
- [ ] 相性診断ロジック
- [ ] 恋愛スタイル診断の問題セット
- [ ] エピソード分析の AI ロジック

---

## 参考：StudyWithL との違い

LoveWithX は StudyWithL の仕組みをベースにしていますが、以下の点が異なります：

| 項目 | StudyWithL | LoveWithX |
|------|-----------|----------|
| 目的 | 技術知識の習得 | 恋愛スキル・心理学の習得 |
| エージェント | L（論理的・冷徹） | デヴィ（上品・教養的・コーチ） |
| 学習者 | 非エンジニア | 女性・恋愛初心者 |
| 診断機能 | テストのみ | 複数診断 + エピソード分析 |
| 重視点 | 知識の体系化 | 恋愛マナーの習得と実践 |

---

## Next Steps

1. **知識源の収集** — Google Scholar、図書館で論文を探索
2. **診断問題の作成** — 各診断の質問セットを作成
3. **カリキュラムの設計** — 7〜10章の体系化
4. **菫の培養** — CLAUDE.md に基づいた実装・テスト
5. **UI/UX の決定** — CLI か Web か、どの形式で運用するか

---

*作成日：2026-06-28*
