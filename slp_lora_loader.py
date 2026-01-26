
import folder_paths
import comfy.sd
import comfy.utils
from pathlib import Path

class SLPLoraLoader:
    
    NAME = "HetimaSLPLoraLoader"
    DISPLAY_NAME = "SLP Lora Loader"
    CATEGORY = "SingleLinePicker"
    
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL", {"tooltip": "The diffusion model the LoRA will be applied to."}),
                "clip": ("CLIP", {"tooltip": "The CLIP model the LoRA will be applied to."}),
                "lora_name_text": ("STRING", {"tooltip": "The name of the LoRA."}),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01, "tooltip": "How strongly to modify the diffusion model. This value can be negative."}),
                "strength_clip": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01, "tooltip": "How strongly to modify the CLIP model. This value can be negative."}),
            }
        }

    RETURN_TYPES = ("MODEL", "CLIP", "STRING")
    RETURN_NAMES = ("MODEL", "CLIP", "stem")
    OUTPUT_TOOLTIPS = ("The modified diffusion model.", "The modified CLIP model.", "The stem of lora file")
    FUNCTION = "load_lora"

    DESCRIPTION = "LoRAs are used to modify diffusion and CLIP models, altering the way in which latents are denoised such as applying styles. Multiple LoRA nodes can be linked together."

    def load_lora(self, model, clip, lora_name_text, strength_model, strength_clip):
        if not lora_name_text:
            return (model, clip, "")
        if strength_model == 0 and strength_clip == 0:
            return (model, clip, "")


        lora_path = folder_paths.get_full_path_or_raise("loras", lora_name_text.splitlines()[0])
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                self.loaded_lora = None

        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)

        model_lora, clip_lora = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora, Path(lora_path).stem)

class SLPLoraLoaderModelOnly(SLPLoraLoader):
    
    NAME = "HetimaSLPLoraLoaderModelOnly"
    DISPLAY_NAME = "SLP Lora Loader (Model Only)"
    
    CATEGORY = "SingleLinePicker"
    
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": { "model": ("MODEL",),
                              "lora_name_text": ("STRING",),
                              "strength_model": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL", "stem")
    RETURN_NAMES = ("MODEL", "stem")
    OUTPUT_TOOLTIPS = ("The modified diffusion model.", "The stem of lora file")
    
    FUNCTION = "load_lora_model_only"

    def load_lora_model_only(self, model, lora_name_text, strength_model):
        result = self.load_lora(model, None, lora_name_text, strength_model, 0)
        return (result[0], result[2])
