<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README-ja.md">日本語 (Japanese)</a>
</p>

# ComfyUI-SingleLinePicker

リストからワンクリックでテキストを選択できるComfyUIのカスタムノードです。LoRAやプロンプトの切り替え作業を劇的に改善します。

![screecshot01](./assets/slp01.jpg)

## Nodes

### SLP List View

入力されたテキストを個々の行のリストとして表示します。選択された行を出力します。

表示されるテキストは、複数行テキストを出力する適当なノードからINPUTの`text`に繋げることで反映されます。最初の実行時やテキストの内容が変わると選択状態がリセットされ、何も出力しません。ノードを選択したときに出てくるツールボックスから部分実行を行えば全体の工程を行わずにテキストが流れ込みます。内容が固定の場合は一度読み込まれたら接続を切っても大丈夫です。

ノード情報パネルのParametersで`source_text`を直接編集することでも内容を変更できます。

ノードを選択したときに出てくるツールボックスに ![icon](./assets/lora.svg) マークのボタンが追加されます。これをクリックすると、インストールしているLoRAの一覧を取得しリストに表示します。後述するSLP Lora Loaderに直接出力できます。

**辞書モード**：テキストの一行目に`#dict`と記入すると2行目以降をコロンを挟んで「表示テキスト: 出力されるテキスト」と解釈して処理します。長い文章を簡潔なタイトルで把握することができます。

例：
```
#dict
first:output value
second:other value
third:last value
```

**セクションモード**：テキストの一行目に`#section`と記入すると2行目以降を「\[表示テキスト\](改行)出力されるテキスト」の連続と解釈して処理します。表示テキストの行全体を角括弧で囲み、次の行から出力されるテキストを記入します。出力されるテキストは改行を含めることができます。

例：
```
#section
[first]
output value
[second]
other
value
[third]
last value
```

![screecshot02](./assets/slp02.jpg)

csv, tsvやテキストファイル群から整形済みテキストを生成する[Pythonスクリプトが付属しています](./tools/README-ja.md)。出力テキストをSLP List Viewで読める形式にすると、二重構造のリストを再現することができます。SLP List Viewを2つ繋げて最初のノードに適用することで、カテゴリーを選んでから項目を選ぶようなことができるようになります。付属スクリプトで簡単に作ることができます。

![screecshot05](./assets/slp05.jpg)

### SLP Lora Loader / SLP Lora Loader (Model Only)

デフォルトのローダーとほぼ同じです。LoRAファイルの指定部分がコンボボックスではなくテキストになっているのでSLP List Viewを直接繋げることができます。

出力パラメータ`stem`を持っています。LoRAファイルの拡張子を除いたファイル名を出力します。次節のSLP Filename Prefixで利用できます。


### SLP Filename Prefix

「画像を保存」などのファイルを書き出すノードは`filename_prefix(ファイル名_プレフィックス)`パラメータを持ち`%date:%`方式で現在の日付時刻を設定できます。ただしこれはフロントエンドで前処理されるため、実行中の出力と組み合わせることが難しいのです。`filename_prefix`にインプット接続しても日付時刻の処理はされません。

それを解決するためにこのノードでは、日付時刻の処理に加えてプレースホルダによる文字列置き換えを行った結果を出力します。「画像を保存」などの`filename_prefix`に有効な値を渡すことができます。

プレースホルダは`$1` `$2` `$3` `$4`と最大4個作ることができ、それぞれ同名のインプットで置き換えられます。入力は文字列と数値に対応しています。

![screecshot03](./assets/slp03.jpg)


## Changelog

- ノード表示名を `SLP List View` に変更

### 1.2.0
- `#section`モードを追加
- ヘルパースクリプト `slp_buld_csv.py` と `slp_build_folder.py` を追加
- SLP List View 同士の接続に対応


### 1.1.0
- カスタムノード SLP Filename Prefix を追加

### 1.0.0
- 最初のリリース
