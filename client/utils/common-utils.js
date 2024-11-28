const BOOTSTRAP_ELEMENT_CLASSNAMES_MAP = {
    button: ["btn"],
    input: ["form-control"],
    select: ["form-select"],
};


function extend(obj, addObj) {
    return {
        ...obj,
        ...addObj
    }
}

function setHTML (element, htmlString) {
    element?.setHTMLUnsafe?.(htmlString);
}

function $(selector) {
    return document.querySelector(selector);
}

function a$(selector) {
    return document.querySelectorAll(selector);
}

function c$(_element, opts = {}, extraOpts = {}) {
    if (!_element) return;

    extraOpts = extend(extraOpts, {
        applyBootstrap: true
    });

    const { classNames = [], attrs = {} } = opts;
    if (extraOpts.applyBootstrap) {
        classNames.push(...(BOOTSTRAP_ELEMENT_CLASSNAMES_MAP[_element] || []))
    }

    const element = document.createElement(_element);
    element.classList.add(...classNames);

    Object.keys(attrs).forEach((attr) => {
        element.setAttribute(attr, attrs[attr]);
    })

    if (opts.content) {
        element.textContent = opts.content;
    }

    return element;
}

function ap$(element, nodes = []) {
    if (!element.nodeName) {
        return;
    }

    nodes.forEach((node) => {
        element.appendChild(node);
    })
}

function r$(element, nodes = []) {
    if (!element.nodeName) {
        return;
    }

    element.replaceChildren();
    nodes.forEach((node) => {
        element.appendChild(node);
    })
}

function rm$(element, nodes = []) {
    if (!element.nodeName) {
        return;
    }

    nodes.forEach((node) => {
        if (element?.contains?.(node)) {
            element?.removeChild?.(node);
        }
    });
}

function showInfoMsg(msg, type, opts = {}) {
    if (type === "failure") type = "danger";

    const msgElement = c$("div", {
        classNames: ["info-msg-container", "alert", `alert-${type}`],
        attrs: {}
    });

    msgElement.textContent = msg;

    document.body.appendChild(msgElement);

    setTimeout(() => {
        document.body.removeChild(msgElement);
        if (opts.reloadOnTimeout) {
            window.location.reload();
        }
    }, 3000);
    if (opts.forceReload) {
        window.location.reload();
    }
}

export { $, a$, c$, ap$, r$, rm$, showInfoMsg, setHTML };