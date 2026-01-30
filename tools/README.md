<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README-ja.md">日本語 (Japanese)</a>
</p>

# Tools
These are Python scripts that assist the operation of the [SLP List View](https://github.com/hetima/ComfyUI-SingleLinePicker).


## slp_buld_csv.py

It reads CSV or TSV files and exports text converted into a format usable with the SLP List View.

```
python path/to/slp_build_folder.py path/to/file.csv
```

When executed, it parses .csv or .tsv with the first column as display text and the second column as output text, then saves the `#section` formatted text file as filename.slp.txt.

```
python path/to/slp_build_folder.py path/to/folder
```

When executed, it parses all .csv and .tsv files within the folder. The filename is displayed as text, and the content parsed using the above method is stored as text output after base64 encoding, then saved as output.slp.txt. The output format is structured as a two-level nested hierarchy. By connecting two SLP List Views and applying them to the first node, you can enable functionality like selecting a category before choosing an item.

![screenshot](../assets/slp04.jpg)

To apply this result, connect the exported text file to the SLP List View using a node that reads file contents, or paste the contents into `source_text` in the parameters of node info panel.

## slp_build_folder.py

Load the folder, gather all the .txt files within it, and output the text converted into a format usable by the SLP List View.

```
python path/to/slp_build_folder.py -d path/to/folder
```

When executed, it parses all .txt files within the folder. It stores the filename as display text and the contents as output text, saving the result as output.slp.txt.

```
python path/to/slp_build_folder.py -dd path/to/folder
```

When the `-dd` option is specified, the above processing is performed on all subfolders within the folder. Subfolder names are stored as display text, and processing results are stored as output text, saved under the filename `output.slp.txt`. This creates a nested structure.

To apply this result, connect the exported text file to the SLP List View using a node that reads file contents, or paste the contents into `source_text` in the parameters of node info panel.
