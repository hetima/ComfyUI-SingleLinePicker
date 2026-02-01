import { app } from "../../scripts/app.js"
import { api } from "../../scripts/api.js";
import { ComfyWidgets } from "../../scripts/widgets.js";
import { uploader } from './libUploadFile.js';


app.registerExtension({
    name: "hetima.SLPSingleLinePicker",

    // https://docs.comfy.org/custom-nodes/js/context-menu-migration
    getNodeMenuItems(node) {
        const items = []
        // Add items only for specific node types
        if (node.comfyClass === "HetimaSingleLinePicker") {
            items.push(null); // Separator
            items.push({
                content: "Get Lora List",
                callback: () => {
                    node?.listLoraFiles?.();
                }
            });
            items.push({
                content: "Upload File...",
                callback: () => {
                    node?.uploadFile?.();
                }
            })
        }
        return items
    },
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "HetimaSingleLinePicker") {
            const style = document.createElement("style");
            style.innerText = `
                .single-line-picker-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;

                    overflow-x: hidden;
                    overflow-y: auto;
                    white-space: nowrap;

                    background-color: var(--bg-color);
                    color: var(--fg-color);
                }
                .single-line-picker-list-item {
                    cursor: default;
                    user-select: none;
                    padding: 3px;
                    font-size: 12px;
                }
                .single-line-picker-list-item-selected {
                    background-color: var(--fg-color);
                    color: var(--bg-color);
                }

            `;
            document.head.appendChild(style);

            const base64prefix = ":::base64:::";
            const decodeBase64Unicode = function (input) {
                let rawBase64 = input;

                if (input.startsWith(base64prefix)) {
                    rawBase64 = input.slice(base64prefix.length);
                }else{
                    return "";
                }
                //bytes = Uint8Array.fromBase64(rawBase64);
                const binString = atob(rawBase64);
                const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
                return new TextDecoder().decode(bytes);
            }

            const addListItem = function (container) {
                const itm = document.createElement("div");
                itm.className = "single-line-picker-list-item";
                container.appendChild(itm);
            };

            const setItemData = function (itm, label, realText) {
                itm.innerText = label;
                itm.dataset.realText = realText;
            }

            const selectItem = function (itm) {
                if (!itm.classList.contains("single-line-picker-list-item-selected")) {
                    itm.classList.add("single-line-picker-list-item-selected");
                }
            };

            const deselectItem = function (itm) {
                if (itm.classList.contains("single-line-picker-list-item-selected")){
                    itm.classList.remove("single-line-picker-list-item-selected");
                }
            };

            const selectedText = function (container) {
                var result = "";
                const lineCount = container.childElementCount;
                for (let index = 0; index < lineCount; index++) {
                    const div = container.children[index];
                    if (div.classList.contains("single-line-picker-list-item-selected")) {
                        if (result != "") {
                            result += "\n";
                        }
                        result += div.dataset.realText;
                    }
                }
                return result;
            }
            
            const selectedIndexes = function (container) {
                var result = "";
                const lineCount = container.childElementCount;
                for (let index = 0; index < lineCount; index++) {
                    const div = container.children[index];
                    if (div.classList.contains("single-line-picker-list-item-selected")) {
                        if (result != "") {
                            result += ",";
                        }
                        result += index.toString();
                    }
                }
                return result;
            }
            

            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const ret = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                const node = this;
                this.initialized = false;

                this.dictMode = false;
                this.sectionMode = false;

                node.properties = node.properties || {};
                node.properties.selected_indexes = node.properties.selected_indexes || "";


                this.textListWidget = ComfyWidgets["STRING"](this, "source_text", ["STRING", { multiline: true }], app).widget;
                this.textListWidget.inputEl.readOnly = true;
                this.textListWidget.callback = async (v) => {
                    this.textListChanged();
                }
                this.textListWidget.hidden = true;

                this.selectedTextWidget = ComfyWidgets["STRING"](this, "selected_text", ["STRING", { multiline: true }], app).widget;
                this.selectedTextWidget.inputEl.readOnly = true;
                this.selectedTextWidget.hidden = true;

                // this.stemTextWidget = ComfyWidgets["STRING"](this, "stem", ["STRING", { multiline: false }], app).widget;
                // this.stemTextWidget.hidden = true;

                const container = document.createElement("div");
                container.className = "single-line-picker-container";
                // container.style.width = "100%";
                // container.style.height = "100%";
                // container.style.position = "relative";
                // container.style.display = "flex";
                // container.style.flexDirection = "column";
                // container.style.overflowX = "hidden";
                // container.style.overflowY = "auto";
                // container.style.whiteSpace = "nowrap";
                // container.style.background = "transparent";

                node.container = container;
                node.container.addEventListener('click', (e) => {
                    const lists = Array.from(e.currentTarget.children);
                    const clicked_index = lists.findIndex(list => list === e.target);
                    // -1 is deselect all
                    const lineCount = this.container.childElementCount;
                    for (let index = 0; index < lineCount; index++) {
                        const div = this.container.children[index];
                        if (index == clicked_index) {
                            selectItem(div);
                        }else{
                            deselectItem(div);
                        }
                    }
                    if (clicked_index > 0) {
                    }
                    node.selectionChanged(null);
                    e.stopPropagation();
                });

                node.listWidget = node.addDOMWidget("list", "TEXTLIST", container, {
                    serialize: false,
                    computeSize: () => {
                        const width = Math.max(node.size[0] || 200, 200);
                        const height = Math.max(node.size[1] || 200, 200);
                        return [width, height];
                    },
                });

                this.properties.selected_indexes = "";
                this.selectedTextWidget.value = "";
                this.initialized = true;
                return ret;
            };

            const onExecuted = nodeType.prototype.onExecuted;
            nodeType.prototype.onExecuted = function (message) {
                onExecuted?.apply(this, arguments);
                this.setTextList(message?.text);
            };

            nodeType.prototype.selectionChanged = function (forceValue = null) {
                if (forceValue === null) {
                    forceValue = selectedIndexes(this.container);
                } else {
                    const idxs = forceValue.split(",").map(str => parseInt(str, 10));
                    const lineCount = this.container.childElementCount;
                    for (let index = 0; index < lineCount; index++) {
                        const div = this.container.children[index];
                        if (idxs.includes(index)) {
                            selectItem(div);
                        } else {
                            deselectItem(div);
                        }
                    }
                }
                this.properties.selected_indexes = forceValue;
                const text = selectedText(this.container);
                this.selectedTextWidget.value = text;

                // propagate value to the output nodes
                if (this.outputs?.length > 0 && this.initialized){
                    let outputText = text;
                    for (const output of this.outputs) {
                        if (output?.links?.length > 0) {
                            for (const linkId of output.links) {
                                const link = this.graph.links[linkId];
                                if (!link) continue;
                                const targetNode = this.graph.getNodeById(link.target_id);
                                if (targetNode?.type === "HetimaSingleLinePicker") {
                                    const targetWidget = targetNode.widgets?.find(w => w.name === "source_text");
                                    if (targetWidget) {
                                        setTimeout(() => {
                                            targetWidget.value = outputText;
                                        }, 0);
                                    }
                                }
                            }
                        }
                    }
                }

                if (this.initialized) {
                    setTimeout(() => {
                        this.setDirtyCanvas(true, true);
                    }, 0);
                }

                // const firstLine = text.split('\n')[0];
                // const stem = firstLine.substring(
                //     Math.max(firstLine.lastIndexOf("/"), firstLine.lastIndexOf("\\")) + 1,
                //     firstLine.lastIndexOf("."));
                // this.stemTextWidget.value = stem || firstLine;
            }

            nodeType.prototype.textListChanged = function () {
                if (!this.container) {
                    return;
                }

                const text = this.textListWidget.value;
                const texts = text.split('\n');
                let lineCount = texts.length;

                // read the configuration from the first line
                if (lineCount > 1 && this.parseConfig(texts[0])) {
                    texts.shift();
                    lineCount--;
                }
                
                let sections = null;
                if (this.sectionMode){
                    sections = this.parseSectionFormat(texts);
                    lineCount = sections.length / 2;
                }

                // match the number of elements
                const needs = lineCount - this.container.childElementCount;
                if (needs > 0){
                    for (let index = 0; index < needs; index++) {
                        addListItem(this.container);
                    }
                } else if (needs < 0) {
                    for (let index = 0; index > needs; index--) {
                        this.container.lastElementChild.remove();
                    }
                }

                //section
                if (this.sectionMode) {
                    if (sections?.length > 0) {
                        if (sections.length % 2 !== 0) {
                            sections.pop();
                        }
                        let count = 0;
                        for (let i = 0; i < sections.length; i += 2) {
                            const title = sections[i];
                            const body = sections[i + 1];
                            const div = this.container.children[count];
                            setItemData(div, title, body);
                            deselectItem(div);
                            count++;
                        }
                    }
                } else {
                    // normal, dict
                    for (let index = 0; index < lineCount; index++) {
                        const div = this.container.children[index];
                        let realText = texts[index];
                        let label = texts[index];
                        if (this.dictMode) {
                            const items = texts[index].split(':');
                            if (items.length > 1) {
                                label = items.shift().trim();
                                realText = items.join(':').trim();
                            }
                        }

                        setItemData(div, label, realText);
                        deselectItem(div);
                    }
                }

                this.properties.selected_indexes = "";
                this.selectedTextWidget.value = "";
                // this.stemTextWidget.value = "";
                this.setDirtyCanvas(true, true);
            };

            nodeType.prototype.setTextList = function (texts) {
                let text = "";
                if (typeof texts === 'string') {
                    text = texts;
                } else {
                    text = texts?.join?.("") || "";
                }
                if (this.textListWidget) {
                    if (this.textListWidget.value != text) {
                        this.textListWidget.value = text;
                    }
                }
            };

            nodeType.prototype.listLoraFiles = function () {
                async function fetchCheckpoints() {
                    try {
                        const response = await api.fetchApi("/models/loras");
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return await response.json();
                    } catch (error) {
                        console.error("Failed to retrieve the model:", error);
                    }
                }

                fetchCheckpoints().then((value) => {
                    this.setTextList(value?.join?.("\n"));
                });
            };

            nodeType.prototype.uploadFile = function () {
                uploader.uploadFile((success, text) => {
                    if (success) {
                        this.setTextList(text);
                    }
                });
            };

            const configRegex = /(#\w+)(?::("([^"\\]|\\.)*"|\S+))?/g;
            // const escapeRegex = /\\(.)/g
            nodeType.prototype.parseConfig = function (txt) {
                // reset
                this.dictMode = false;
                this.sectionMode = false;

                if (!txt.startsWith("#")) {
                    return false;
                }
                configRegex.lastIndex = 0;
                const result = Object.fromEntries(
                    Array.from(txt.matchAll(configRegex), m => {
                        const key = m[1].toLowerCase();
                        let value = m[2] || "";
                        if (value.endsWith(',')) {
                            value = value.slice(0, -1);
                        }
                        // When enclosed in double quotation, perform quote removal and escape decoding.
                        // if (value.startsWith('"') && value.endsWith('"')) {
                        //     escapeRegex.lastIndex = 0;
                        //     value = value.slice(1, -1).replace(escapeRegex, '$1');
                        // }

                        return [key, value];
                    })
                );
                const keys = Object.keys(result);
                if (keys.length == 0) {
                    return false;
                }
                if (keys.includes("#dict")) {
                    this.dictMode = true;
                } else if (keys.includes("#section")) {
                    this.sectionMode = true;
                }

                return true;
            }

            nodeType.prototype.parseSectionFormat = function (lineArray) {
                const result = [];
                let currentBody = [];
                let currentTitle = null;
                let includesBase64 = false;

                lineArray.forEach((line) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return;
                    // [label]
                    if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                        // prev section
                        if (currentTitle !== null && currentBody.length > 0) {
                            result.push(currentTitle, currentBody.join('\n'));
                        }
                        // reset
                        currentTitle = trimmedLine.substring(1, trimmedLine.length - 1);
                        currentBody = [];
                    } else {
                        // accumulate the body
                        if (currentTitle !== null) {
                            if (currentBody.length == 0 && trimmedLine === base64prefix) {
                                includesBase64 = true;
                            }
                            currentBody.push(trimmedLine);
                        }
                    }
                });

                // push last section
                if (currentTitle !== null && currentBody.length > 0) {
                    result.push(currentTitle, currentBody.join('\n'));
                }

                if (includesBase64) {
                    for (let index = 0; index < result.length; index++) {
                        const itm = result[index];
                        if (itm.startsWith(base64prefix)) {
                            result[index] = decodeBase64Unicode(result[index]);
                        }

                    }
                }

                return result;
            }

            nodeType.prototype.onSerialize = function (info) {
                info.properties = {
                    source_text: this.textListWidget.value || "",
                    selected_indexes: this.properties.selected_indexes || ""
                };
                //info.widgets_values = [""];
            };

            nodeType.prototype.onConfigure = function (info) {
                this.initialized = false;
                this.properties = this.properties || {};

                if (info.properties) {
                    this.textListWidget.value = info.properties.source_text || ""; //call textListChanged()
                    this.properties.selected_indexes = info.properties.selected_indexes || "";
                }
                this.selectionChanged(this.properties.selected_indexes);
                this.initialized = true;
            };
        }
    },
});


