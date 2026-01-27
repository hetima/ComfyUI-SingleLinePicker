const { app } = window.comfyAPI.app;
const { applyTextReplacements } = window.comfyAPI.utils;

app.registerExtension({
    name: "hetima.SLPFilenamePrefix",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "HetimaSLPFilenamePrefix") {

            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const ret = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;

                const widget = this.widgets.find((w) => w.name === "filename_prefix");
                widget.serializeValue = () => {
                    return applyTextReplacements(app, widget.value);
                };

                return ret;
            };
        }
    },
});
