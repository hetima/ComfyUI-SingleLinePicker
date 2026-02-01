
const SLPFileUploaderStyles = `
.slp-fileupload-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    animation: slp-fileupload-fadein 0.3s ease forwards;
}

.slp-fileupload-overlay.slp-fileupload-closing {
    animation: slp-fileupload-fadeout 0.2s ease forwards;
}

@keyframes slp-fileupload-fadein {
    to { opacity: 1; }
}

@keyframes slp-fileupload-fadeout {
    to { opacity: 0; }
}

.slp-fileupload-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: scale(0.9);
    animation: slp-fileupload-scalein 0.3s ease forwards;
}

.slp-fileupload-overlay.slp-fileupload-closing .slp-fileupload-container {
    animation: slp-fileupload-scaleout 0.2s ease forwards;
}

@keyframes slp-fileupload-scalein {
    to { transform: scale(1); }
}

@keyframes slp-fileupload-scaleout {
    to { transform: scale(0.9); }
}

.slp-fileupload-header {
    padding: 32px 32px 0;
    text-align: center;
}

.slp-fileupload-title {
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
}

.slp-fileupload-subtitle {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
}

.slp-fileupload-dropzone {
    margin: 24px 32px;
    border: 3px dashed #d1d5db;
    border-radius: 16px;
    padding: 48px 24px;
    text-align: center;
    transition: all 0.3s ease;
    background: #f9fafb;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.slp-fileupload-dropzone.slp-fileupload-dragover {
    border-color: #667eea;
    background: #eef2ff;
    transform: scale(1.02);
}

.slp-fileupload-dropzone.slp-fileupload-hasfile {
    border-color: #10b981;
    background: #ecfdf5;
    padding: 24px;
}

.slp-fileupload-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    color: #9ca3af;
    transition: color 0.3s;
}

.slp-fileupload-dropzone.slp-fileupload-dragover .slp-fileupload-icon {
    color: #667eea;
}

.slp-fileupload-dropzone.slp-fileupload-hasfile .slp-fileupload-icon {
    color: #10b981;
}

.slp-fileupload-text {
    font-size: 18px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 8px;
}

.slp-fileupload-hint {
    font-size: 13px;
    color: #9ca3af;
}

.slp-fileupload-fileinfo {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.slp-fileupload-dropzone.slp-fileupload-hasfile .slp-fileupload-fileinfo {
    display: flex;
}

.slp-fileupload-dropzone.slp-fileupload-hasfile .slp-fileupload-text-main {
    display: none;
}

.slp-fileupload-fileicon {
    width: 40px;
    height: 40px;
    background: #10b981;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 12px;
}

.slp-fileupload-filedetails {
    text-align: left;
}

.slp-fileupload-filename {
    font-weight: 600;
    color: #1f2937;
    font-size: 16px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.slp-fileupload-filesize {
    font-size: 13px;
    color: #6b7280;
}

.slp-fileupload-preview {
    margin: 0 32px 24px;
    flex: 1;
    min-height: 200px;
    max-height: 300px;
    background: #f3f4f6;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    display: none;
    flex-direction: column;
}

.slp-fileupload-preview.slp-fileupload-active {
    display: flex;
}

.slp-fileupload-preview-header {
    background: #e5e7eb;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #d1d5db;
}

.slp-fileupload-preview-content {
    flex: 1;
    padding: 16px;
    overflow: auto;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #374151;
    white-space: pre-wrap;
    word-break: break-all;
}

.slp-fileupload-footer {
    padding: 24px 32px 32px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-top: 1px solid #f3f4f6;
}

.slp-fileupload-btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    outline: none;
}

.slp-fileupload-btn-cancel {
    background: #f3f4f6;
    color: #4b5563;
}

.slp-fileupload-btn-cancel:hover {
    background: #e5e7eb;
}

.slp-fileupload-btn-ok {
    background: #667eea;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
}

.slp-fileupload-btn-ok:hover:not(:disabled) {
    background: #5568d3;
    transform: translateY(-1px);
    box-shadow: 0 6px 8px -1px rgba(102, 126, 234, 0.4);
}

.slp-fileupload-btn-ok:disabled {
    background: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
}

.slp-fileupload-error {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: #ef4444;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 10001;
}

.slp-fileupload-error.slp-fileupload-show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
`;

export const uploader = {
    _stylesInserted: false,

    _insertStyles() {
        if (this._stylesInserted) return;
        const style = document.createElement('style');
        style.textContent = SLPFileUploaderStyles;
        document.head.appendChild(style);
        this._stylesInserted = true;
    },

    _formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    _parseDelimitedFile(text, delimiter) {
        const result = [];
        let currentLine = [];
        let currentField = '';
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (inQuotes) {
                if (char === '"') {
                    if (nextChar === '"') {
                        currentField += '"';
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    currentField += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === delimiter) {
                    currentLine.push(currentField);
                    currentField = '';
                } else if (char === '\n') {
                    currentLine.push(currentField);
                    if (currentLine.length >= 1) {
                        const col1 = currentLine[0].trim();
                        const col2 = currentLine.length > 1 ? currentLine[1] : '';
                        result.push(`[${col1}]\n${col2}`);
                    }
                    currentLine = [];
                    currentField = '';
                } else if (char === '\r') {
                    // Handle CRLF (skip \r, wait for \n)
                    continue;
                } else {
                    currentField += char;
                }
            }
        }

        // Process last line if exists
        if (currentField || currentLine.length > 0) {
            currentLine.push(currentField);
            if (currentLine.length >= 1) {
                const col1 = currentLine[0].trim();
                const col2 = currentLine.length > 1 ? currentLine[1] : '';
                result.push(`[${col1}]\n${col2}`);
            }
        }

        return result.join('\n');
    },

    _showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'slp-fileupload-error';
        errorEl.textContent = message;
        document.body.appendChild(errorEl);

        errorEl.offsetHeight; // Force reflow

        errorEl.classList.add('slp-fileupload-show');
        setTimeout(() => {
            errorEl.classList.remove('slp-fileupload-show');
            setTimeout(() => errorEl.remove(), 300);
        }, 3000);
    },

    uploadFile(callback) {
        this._insertStyles();

        // Remove existing overlay if any
        const existingOverlay = document.querySelector('.slp-fileupload-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        let fileContent = null;
        let isDelimitedFile = false;
        let fileExtension = '';

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'slp-fileupload-overlay';

        overlay.innerHTML = `
            <div class="slp-fileupload-container">
                <div class="slp-fileupload-header">
                    <h2 class="slp-fileupload-title">Upload File to Single Line Picker</h2>
                    <p class="slp-fileupload-subtitle">Supported formats: CSV, TSV, TXT (text files)</p>
                </div>
                
                <div class="slp-fileupload-dropzone">
                    <div class="slp-fileupload-text-main">
                        <svg class="slp-fileupload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                            </path>
                        </svg>
                        <div class="slp-fileupload-text">Drag & drop file here</div>
                        <div class="slp-fileupload-hint">or click to select file</div>
                    </div>
                    
                    <div class="slp-fileupload-fileinfo">
                        <div class="slp-fileupload-fileicon">TXT</div>
                        <div class="slp-fileupload-filedetails">
                            <div class="slp-fileupload-filename">filename.txt</div>
                            <div class="slp-fileupload-filesize">0 KB</div>
                        </div>
                    </div>
                    
                    <input type="file" accept=".csv,.tsv,.txt,text/plain" style="display: none;">
                </div>

                <div class="slp-fileupload-preview">
                    <div class="slp-fileupload-preview-header">Preview</div>
                    <pre class="slp-fileupload-preview-content"></pre>
                </div>

                <div class="slp-fileupload-footer">
                    <button class="slp-fileupload-btn slp-fileupload-btn-cancel">Cancel</button>
                    <button class="slp-fileupload-btn slp-fileupload-btn-ok" disabled>OK</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Get elements
        const dropZone = overlay.querySelector('.slp-fileupload-dropzone');
        const fileInput = overlay.querySelector('input[type="file"]');
        const btnCancel = overlay.querySelector('.slp-fileupload-btn-cancel');
        const btnOk = overlay.querySelector('.slp-fileupload-btn-ok');
        const previewContainer = overlay.querySelector('.slp-fileupload-preview');
        const previewContent = overlay.querySelector('.slp-fileupload-preview-content');
        const fileNameEl = overlay.querySelector('.slp-fileupload-filename');
        const fileSizeEl = overlay.querySelector('.slp-fileupload-filesize');
        const fileExtEl = overlay.querySelector('.slp-fileupload-fileicon');

        const allowedExtensions = ['csv', 'tsv', 'txt'];

        // Drag and drop events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('slp-fileupload-dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('slp-fileupload-dragover');
            }, false);
        });

        // Handle drop
        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        }, false);

        // Click to select
        dropZone.addEventListener('click', (e) => {
            if (e.target !== btnCancel && e.target !== btnOk) {
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });

        const handleFile = (file) => {
            const extension = file.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(extension)) {
                this._showError(`Unsupported file format. Only .csv, .tsv, and .txt files are allowed.`);
                return;
            }

            fileExtension = extension;
            isDelimitedFile = (extension === 'csv' || extension === 'tsv');

            // Display file info
            fileNameEl.textContent = file.name;
            fileSizeEl.textContent = this._formatFileSize(file.size);
            fileExtEl.textContent = extension.toUpperCase();

            dropZone.classList.add('slp-fileupload-hasfile');

            // Read file
            const reader = new FileReader();
            reader.onload = (e) => {
                const rawContent = e.target.result;

                // Process content if CSV or TSV
                if (isDelimitedFile) {
                    const delimiter = extension === 'tsv' ? '\t' : ',';
                    fileContent = "#section\n" + this._parseDelimitedFile(rawContent, delimiter);
                } else {
                    fileContent = rawContent;
                }

                // Show preview (first 2000 chars)
                const previewText = fileContent.length > 2000
                    ? fileContent.substring(0, 2000) + '\n\n... (' + (fileContent.length - 2000) + ' more characters)'
                    : fileContent;

                previewContent.textContent = previewText;
                previewContainer.classList.add('slp-fileupload-active');

                // Enable OK button
                btnOk.disabled = false;
            };

            reader.onerror = () => {
                this._showError('Failed to read file.');
            };

            reader.readAsText(file);
        };

        // Cancel button
        btnCancel.addEventListener('click', () => {
            closeView(false, null);
        });

        // OK button
        btnOk.addEventListener('click', () => {
            if (fileContent !== null) {
                closeView(true, fileContent);
            }
        });

        // Close view function
        const closeView = (ok, text) => {
            overlay.classList.add('slp-fileupload-closing');
            setTimeout(() => {
                overlay.remove();
                if (typeof callback === 'function') {
                    callback(ok, text);
                }
            }, 200);
        };

        // ESC key to cancel
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeView(false, null);
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);

        // Click overlay background to cancel
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeView(false, null);
            }
        });
    }
};
