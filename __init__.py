from .single_line_picker import SLPSingleLinePicker
from .slp_lora_loader import SLPLoraLoader, SLPLoraLoaderModelOnly


NODE_CLASS_MAPPINGS = {
  SLPSingleLinePicker.NAME: SLPSingleLinePicker,
  SLPLoraLoader.NAME: SLPLoraLoader,
  SLPLoraLoaderModelOnly.NAME: SLPLoraLoaderModelOnly,
}

NODE_DISPLAY_NAME_MAPPINGS = {
  SLPSingleLinePicker.NAME: SLPSingleLinePicker.DISPLAY_NAME,
  SLPLoraLoader.NAME: SLPLoraLoader.DISPLAY_NAME,
  SLPLoraLoaderModelOnly.NAME: SLPLoraLoaderModelOnly.DISPLAY_NAME,
}


WEB_DIRECTORY = "./js"
