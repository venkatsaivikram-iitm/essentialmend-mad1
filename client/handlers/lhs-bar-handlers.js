import { MODULES_ID_LIST, MODULES_ID_COMPONENT_MAP } from "../constants/module-constants.js"
import { $, c$, r$ } from "../utils/common-utils.js";


const mainWrapper = $("#main-wrapper");
const contentWrapper = $("#content-wrapper");

function handleChangeModule(moduleId) {
    const moduleComponent = MODULES_ID_COMPONENT_MAP[moduleId];

    if (!MODULES_ID_LIST.includes(moduleId) || !moduleComponent) {
        return;
    }

    MODULES_ID_LIST.forEach((_moduleId) => {
        const moduleComponent = MODULES_ID_COMPONENT_MAP[_moduleId];
        if (!moduleComponent) {
            return;
        }

        const selected = moduleId === _moduleId;

        moduleComponent.children[0].setAttribute("src", `/static/assets/${_moduleId}-${selected ? "light" : "dark"}.svg`);
        moduleComponent.classList[selected ? "add" : "remove"]("lhs-bar-item--selected");
    })
}

function getContent (moduleId) {
    const content = c$("h1", {
        content: moduleId
    });

    return [content];
}

function updateContent(moduleId) {
    const content = getContent(moduleId);
    r$(contentWrapper, content);
}

function handleModuleComponentClick (event) {
    const moduleId = event.currentTarget.dataset.module;

    if (!moduleId) {
        return;
    }

    mainWrapper.dataset.module = moduleId;

    handleChangeModule(moduleId);

    updateContent(moduleId);

}

export { handleChangeModule, updateContent, handleModuleComponentClick };
