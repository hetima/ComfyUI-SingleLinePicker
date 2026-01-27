import re

class AnyType(str):
    """A special class that is always equal in not equal comparisons. Credit to pythongosssss"""
    def __ne__(self, __value: object) -> bool:
        return False

any_type = AnyType("*")

class SLPFilenamePrefix:

    NAME = "HetimaSLPFilenamePrefix"
    DISPLAY_NAME = "SLP Filename Prefix"
    
    CATEGORY = "SingleLinePicker"
    DESCRIPTION = "Builds a filename_prefix and return one includes placeholder replacements."

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "filename_prefix": ("STRING", {"multiline": False, "default": "%date:yyyy-MM-dd%/$1", "tooltip": 'can include "%date:%", "$1", "$2", "$3" and "$4"'}),
            },
            "optional": {
                "$1": (any_type, {"multiline": False, "default": "", "forceInput": True, "tooltip": 'replace "$1" with this value'}),
                "$2": (any_type, {"multiline": False, "default": "", "forceInput": True, "tooltip": 'replace "$2" with this value'}),
                "$3": (any_type, {"multiline": False, "default": "", "forceInput": True, "tooltip": 'replace "$3" with this value'}),
                "$4": (any_type, {"multiline": False, "default": "", "forceInput": True, "tooltip": 'replace "$4" with this value'}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    OUTPUT_TOOLTIPS = ("built filename_prefix",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    
    def to_storing(self, val):
        if isinstance(val, str) and len(val) > 0:
            val = val.splitlines()[0]
            trans = val.maketrans("?/<>\\:*|\"", "_________")
            val = val.translate(trans)
            return val
        if isinstance(val, (int, float, bool)):
            return str(val)
        return ""
    
    def execute(self, **kwargs):
        filename_prefix = kwargs["filename_prefix"]
        if not filename_prefix:
            return ""
        
        s1 = self.to_storing(kwargs.get("$1", ""))
        s2 = self.to_storing(kwargs.get("$2", ""))
        s3 = self.to_storing(kwargs.get("$3", ""))
        s4 = self.to_storing(kwargs.get("$4", ""))
        mapping = {"$1": s1, "$2": s2, "$3": s3, "$4": s4,}
        
        pattern = re.compile("|".join(re.escape(k) for k in mapping.keys()))
        filename_prefix = pattern.sub(lambda m: mapping[m.group(0)], filename_prefix)
        
        return (filename_prefix,)
