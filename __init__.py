from .single_line_picker import SLPSingleLinePicker
from .slp_lora_loader import SLPLoraLoader, SLPLoraLoaderModelOnly
from .slp_filename_prefix import SLPFilenamePrefix
from .slp_directory_list import SLPDirectoryContents

NODE_CLASS_MAPPINGS = {
  SLPSingleLinePicker.NAME: SLPSingleLinePicker,
  SLPLoraLoader.NAME: SLPLoraLoader,
  SLPLoraLoaderModelOnly.NAME: SLPLoraLoaderModelOnly,
  SLPFilenamePrefix.NAME: SLPFilenamePrefix,
  SLPDirectoryContents.NAME: SLPDirectoryContents
}

NODE_DISPLAY_NAME_MAPPINGS = {
  SLPSingleLinePicker.NAME: SLPSingleLinePicker.DISPLAY_NAME,
  SLPLoraLoader.NAME: SLPLoraLoader.DISPLAY_NAME,
  SLPLoraLoaderModelOnly.NAME: SLPLoraLoaderModelOnly.DISPLAY_NAME,
  SLPFilenamePrefix.NAME: SLPFilenamePrefix.DISPLAY_NAME,
  SLPDirectoryContents.NAME: SLPDirectoryContents.DISPLAY_NAME,
}


WEB_DIRECTORY = "./js"
