<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README-ja.md">日本語 (Japanese)</a>
</p>

# ComfyUI-SingleLinePicker

リストからワンクリックでテキストを選択できるComfyUIのカスタムノードです。LoRAやプロンプトの切り替え作業を劇的に改善します。

![screecshot01](./assets/slp01.jpg)

## Nodes

### Single Line Picker

入力されたテキストを個々の行のリストとして表示します。選択された行を出力します。

表示されるテキストは、複数行テキストを出力する適当なノードからINPUTの`text`に繋げることで反映されます。最初の実行時やテキストの内容が変わると選択状態がリセットされ、何も出力しません。ノードを選択したときに出てくるツールボックスから部分実行を行えば全体の工程を行わずにテキストが流れ込みます。内容が固定の場合は一度読み込まれたら接続を切っても大丈夫です。

ノード情報パネルのParametersで`source_text`を直接編集することでも内容を変更できます。

ノードを選択したときに出てくるツールボックスに ![icon](./assets/lora.svg) マークのボタンが追加されます。これをクリックすると、インストールしているLoRAの一覧を取得しリストに表示します。後述するSLP Lora Loaderに直接出力できます。

**辞書モード**：テキストの一行目に`#dict`と記入すると2行目以降をコロンを挟んで「表示テキスト: 出力されるテキスト」と解釈して処理します。長い文章を簡潔なタイトルで把握することができます。

![screecshot02](./assets/slp02.jpg)


### SLP Lora Loader / SLP Lora Loader (Model Only)

デフォルトのローダーとほぼ同じです。LoRAファイルの指定部分がコンボボックスではなくテキストになっているのでSingle Line Pickerを直接繋げることができます。

出力パラメータ`stem`を持っています。LoRAファイルの拡張子を除いたファイル名を出力します（[audioscavenger/save-image-extended-comfyui](https://github.com/audioscavenger/save-image-extended-comfyui) はLoRAの名前を参照することができますが、SLP Lora Loaderの`lora_name`を参照しようとするとエラーが出たため名前を`lora_name_text`に変更しています。この`lora_name_text`を参照したとしてもエラーにはなりませんが、正常な値は取得できません。`stem`出力を加工するなりして対応してください）。

## Changelog

### 1.0.0
- 最初のリリース
