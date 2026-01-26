<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README-ja.md">日本語 (Japanese)</a>
</p>

# ComfyUI-SingleLinePicker

This is a custom node for ComfyUI that lets you select single line from lists of text with a single click. It dramatically improves the process of switching LoRA or prompts.

![screecshot01](./assets/slp01.jpg)

## Nodes

### Single Line Picker
Displays the input text as a list of individual lines. Outputs the selected line.

The displayed text is reflected by connecting the `text` input to an appropriate node that outputs multi-line text. During the first execution or when the text content changes, the selection state resets and nothing is output. Performing a partial execution from the toolbox that appears when selecting the node allows text to flow in without running the entire process. If the content is static, it's fine to disconnect after it has been loaded once.

You can also change the content by directly editing `source_text` in the Parameters section of the node information panel.

When select this node, a button marked with the ![icon](./assets/lora.svg) icon will appear in the toolbox. Clicking this button retrieves a list of installed LoRA files and displays them. You can output directly to the SLP Lora Loader described later.

**Dictionary Mode**: Entering `#dict` on the first line of text causes subsequent lines to be interpreted as “Display Text: Output Text” separated by colon. This allows you to grasp long contents with concise titles.

![screecshot02](./assets/slp02.jpg)


### SLP Lora Loader / SLP Lora Loader (Model Only)

It's almost identical to the default loader. Since the LoRA file selection part is text instead of a combo box so that connect a Single Line Picker directly.

It has an output parameter called `stem`. It outputs LoRA filename without file extension ([audioscavenger/save-image-extended-comfyui](https://github.com/audioscavenger/save-image-extended-comfyui) can reference LoRA name, but since attempting to reference `lora_name` in the SLP Lora Loader caused an error, the name has been changed to `lora_name_text`. Referencing this `lora_name_text` will not cause an error, but it will not retrieve the correct value. Please handle this by modifying the `stem` output or similar means). 

## Changelog

### 1.0.0
- Initial release
