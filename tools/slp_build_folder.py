import argparse
import base64
from pathlib import Path

def output_to_file(output_content, target_dir):
    target_dir = Path(target_dir)
    if output_content:
        # 既存ファイルは上書きされる
        target_dir.write_text(output_content, encoding='utf-8')
        print(f"Successfully saved to: {target_dir}")
    else:
        print("No content generated. Check if the directory contains .txt files.")

def get_folder_contents(target_dir):
    """
    フォルダ直下のtxtファイルを読み込み、指定フォーマットの文字列を返します。
    """
    target_dir = Path(target_dir)
    if not target_dir.is_dir():
        return ""

    results = ["#section"]
    # フォルダ直下の .txt ファイルを昇順で取得
    for file_path in sorted(target_dir.glob("*.txt")):
        try:
            # 改行コードを \n に統一して読み込み
            if file_path.name.endswith(".slp.txt"):
                continue
            content = file_path.read_text(encoding='utf-8').replace('\r\n', '\n').replace('\r', '\n')
            results.append(f"[{file_path.stem}]")
            results.append(content)
        except Exception as e:
            results.append(f"[{file_path.stem}]\nError reading file: {e}")

    if len(results) <= 1:
        return ""
    return "\n".join(results)

def process_folder(target_dir):
    """-d: フォルダ内のテキストファイルを処理して保存"""
    target_dir = Path(target_dir)
    output_file = target_dir / "output.slp.txt"
    output_to_file(get_folder_contents(target_dir), output_file)

def merge_subfolder_files(target_dir):
    """
    -dd: サブフォルダ(1階層)ごとに get_folder_contents を実行し、
    結果をbase64エンコードしてまとめます。
    """
    target_dir = Path(target_dir)
    if not target_dir.is_dir():
        print(f"Error: {target_dir} is not a directory.")
        return

    final_results = ["#section"]
    
    # 1階層下のディレクトリのみを抽出
    subdirectories = sorted([d for d in target_dir.iterdir() if d.is_dir()])
    for sub_dir in subdirectories:
        # サブフォルダ内のテキスト情報を取得
        folder_text = get_folder_contents(sub_dir)
        
        # テキストが存在する場合のみ処理
        if folder_text:
            # 文字列をバイトに変換してBase64エンコード
            b64_encoded = base64.b64encode(folder_text.encode('utf-8')).decode('utf-8')
            
            final_results.append(f"[{sub_dir.name}]")
            final_results.append(":::base64:::")
            final_results.append(b64_encoded)

    output_content = ""
    if len(final_results) > 1:
        output_content = "\n".join(final_results)
    output_file = target_dir / "output.slp.txt"
    output_to_file(output_content, output_file)

def main():
    parser = argparse.ArgumentParser(description='Converts text files to SLP compatible text file.')
    parser.add_argument('path', help='Path to the target directory')

    group = parser.add_mutually_exclusive_group()
    group.add_argument('-d', action='store_true', help='Process text files in the folder')
    group.add_argument('-dd', action='store_true', help='Process text files in subfolders and merge them into a single file')

    args = parser.parse_args()
    target_path = Path(args.path)
    target_path = Path(target_path)
    
    if not target_path.is_dir():
        print(f"Error: {target_path} is not a directory.")
        return

    if args.d:
        process_folder(target_path)
    elif args.dd:
        merge_subfolder_files(target_path)
    else:
        # オプションなしの場合は-d
        process_folder(target_path)

if __name__ == '__main__':
    main()
