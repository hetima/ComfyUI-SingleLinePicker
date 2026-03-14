from pathlib import Path

class SLPDirectoryContents:
    NAME = "HetimaSLPDirectoryContents"
    DISPLAY_NAME = "SLP Directory Contents"
    
    CATEGORY = "SingleLinePicker"
    DESCRIPTION = "Outputs the contents of the directory."
    
    # 毎回読み込む
    @classmethod
    def IS_CHANGED(cls):
        return float("NaN")
            
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"multiline": False, "default": "", "tooltip": 'Path to directory'}),
                "is_full_path": ("BOOLEAN", {"default": True, "tooltip": "Outputs as full path"}),
                "SLP_format": ("BOOLEAN", {"default": False, "tooltip": "Outputs for SLP List View"}),
                "prefix": ("STRING", {"multiline": False, "default": "", "tooltip": "Prefix for each output path"}),
            },
            "optional": {
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    OUTPUT_TOOLTIPS = ("directory contents",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    
    def execute(self, path="", is_full_path=True, SLP_format=False, prefix=""):
        dir_path = Path(path)
        if not path or not dir_path.is_dir():
            return ("",)

        files = sorted([f for f in dir_path.iterdir()])
        result_prefix = ""
        if SLP_format:
            result_prefix = "#dict\n"
        results = []
        for file in files:
            path_str = ""
            if is_full_path:
                path_str = str(file.resolve())
            else:
                path_str = file.name
            if prefix != "":
                path_str = prefix + path_str
            if SLP_format:
                path_str = file.name + ":" + path_str
                
            results.append(path_str)
        
        return (result_prefix + "\n".join(results),)
