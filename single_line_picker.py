
class SLPSingleLinePicker:

    NAME = "HetimaSingleLinePicker"
    DISPLAY_NAME = "SLP List View"
    
    CATEGORY = "SingleLinePicker"
    DESCRIPTION = "Select one line from the text list with a single click."

    @classmethod
    def INPUT_TYPES(cls):
        return {
        "optional": {
            "text": ("STRING", {"multiline": True, "default": "", "forceInput": True, "tooltip": "text content for list"}),
        },
        "hidden": {
            "source_text": ("STRING", {}),
            "selected_text": ("STRING", {}),
            # "stem": ("STRING", {}),
        },
    }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    OUTPUT_TOOLTIPS = ("text content of selected line",)
    OUTPUT_NODE = True
    FUNCTION = "executed"
    
    def executed(self, text=None, source_text=None, selected_text=None, **kwargs):
        if not text:
            return {"ui": { "text": source_text }, "result": (selected_text,)}
        if text == source_text:
            return {"ui": { "text": source_text }, "result": (selected_text,)}

        return {"ui": { "text": text }, "result": ("",)}
