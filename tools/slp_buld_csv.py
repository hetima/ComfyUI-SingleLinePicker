import argparse
import base64
import csv
from pathlib import Path

def output_to_file(output_content, file_path):
    """指定されたファイル名で内容を保存"""
    file_path = Path(file_path)
    if not output_content:
        print(f"No content to write for {file_path}")
        return
    file_path.write_text(output_content, encoding='utf-8')
    print(f"Successfully saved to: {file_path}")
    
def process_csv_or_tsv(file_path):
    """
    CSV/TSVを処理し、1行ずつリストに追加して最後に結合します。
    """
    path = Path(file_path)
    if not path.is_file():
        return ""

    delim = '\t' if path.suffix.lower() == '.tsv' else ','
    results = ["#section"]
    
    try:
        with path.open(encoding='utf-8', newline='') as f:
            reader = csv.reader(f, delimiter=delim)
            for row in reader:
                if len(row) >= 2 and row[0] and row[1]:
                    # [title]
                    results.append(f"[{row[0]}]")
                    # body (改行コード正規化)
                    results.append(row[1].replace('\r\n', '\n').replace('\r', '\n'))
                    
                    # 3列目がある場合の追加処理
                    if len(row) >= 3:
                        results.append("---")
                        results.append(row[2].replace('\r\n', '\n').replace('\r', '\n'))
    except Exception as e:
        return f"Error processing {path.name}: {e}"

    if len(results) <= 1:
        return ""
    return "\n".join(results)

def merge_folder_files(target_dir):
    """フォルダ内の全ファイルを処理し、結果をBase64化して連結"""
    target_dir = Path(target_dir)
    final_results = ["#section"]
    
    files = sorted([f for f in target_dir.iterdir() if f.suffix.lower() in ['.csv', '.tsv']])
    
    for file in files:
        content = process_csv_or_tsv(file)
        if content:
            b64_encoded = base64.b64encode(content.encode('utf-8')).decode('utf-8')
            final_results.append(f"[{file.stem}]")
            final_results.append(":::base64:::")
            final_results.append(b64_encoded)
    if len(final_results) <= 1:
        return ""            
    return "\n".join(final_results)

def process_csv(target_path):
    """単体ファイル処理"""

    target_path = Path(target_path)
    if target_path.suffix.lower() not in ['.csv', '.tsv']:
        print("Error: Target path must be a .csv or .tsv file")
        return
    
    content = process_csv_or_tsv(target_path)
    output_file_path = target_path.with_suffix('.slp.txt')
    output_to_file(content, output_file_path)

def process_folder(target_path):
    target_path = Path(target_path)
    if not target_path.is_dir():
        print("Error: Target path must be a directory.")
        return
        
    content = merge_folder_files(target_path)
    output_file_path = target_path / "output.slp.txt"
    output_to_file(content, output_file_path)

def main():
    parser = argparse.ArgumentParser(description='Converts CSV/TSV to SLP compatible text file.')
    parser.add_argument('path', help='Path to the target CSV/TSV file or directory')

    args = parser.parse_args()
    target_path = Path(args.path)

    if target_path.is_dir():
        # フォルダ一括処理
        process_folder(target_path)
    elif target_path.suffix.lower() in ['.csv', '.tsv']:
        # 単体ファイル処理
        process_csv(target_path)
    
    else:
        print("Error: Target path must be a .csv or .tsv file or directory.")


if __name__ == '__main__':
    main()