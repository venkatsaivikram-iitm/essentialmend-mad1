import { $, ap$, c$, r$, rm$, showInfoMsg } from "./utils/common-utils";
import { API_RESPONSE } from "./constants/api-constants";
import { redirect } from "./utils/app-route-util";
import { regexMap } from "./utils/regex-utils";
import cryptoJs from "crypto-js";

const REGISTER_TYPE = {
    SIGN_IN: "signin",
    SIGN_UP: "signup"
};

const REGISTER_USER_TYPE = {
    USER: "user",
    PROFESSIONAL: "professional"
};

const registerForm = $("#register-form");
const registerButton = $("#register-btn");
const registerSwitchButton = $("#register-switch-btn");
const togglePasswordButton = () => $("#toggle-password-btn");

let availableServices = [];
let currentRegisterType = registerButton.dataset.type ?? REGISTER_TYPE.SIGN_IN;
let currentRegisterUserType = REGISTER_USER_TYPE.USER;
let currentServiceType = "";

const handleTogglePassword = () => {
    const passwordInput = $("#password");
    const passwordType = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", passwordType === "password" ? "text" : "password");
    if (passwordType !== "password") {
        togglePasswordButton().classList.toggle("bi-eye-slash-fill");
        togglePasswordButton().classList.remove("bi-eye-fill");
    } else {
        togglePasswordButton().classList.toggle("bi-eye-fill");
        togglePasswordButton().classList.remove("bi-eye-slash-fill");
    }
};

function validateCredentials(opts = {}) {
    const { userType, name, email, password, service, experience, description, location, pincode, duration, price } = opts;
    let result = true;
    if (currentRegisterType === REGISTER_TYPE.SIGN_UP) {
        if (location.length === 0 || pincode.length < 6 || duration <= 0 || price <= 0) {
            result = false
        } else if (userType === REGISTER_USER_TYPE.USER && !(
            regexMap.name.test(name) && 
            regexMap.email.test(email) &&
            regexMap.password.test(password)
        )) {
            result = false;
        } else if (userType === REGISTER_USER_TYPE.PROFESSIONAL && ! (
            regexMap.name.test(name) && 
            regexMap.email.test(email) &&
            regexMap.password.test(password) &&
            availableServices.find((serviceType) => serviceType.sid === service) &&
            experience >= 0 &&
            description?.length > 0
        )) {
            result = false;
        }
    } else if (currentRegisterType === REGISTER_TYPE.SIGN_IN) {
        if (!(regexMap.email.test(email) && regexMap.password.test(password))) {
            result = false;
        }
    }

    return result;
}

function handleSignIn() {
    const _credentials = {
        email: $("#email").value,
        password: $("#password").value
    };
    const areCredentialsValid = validateCredentials(_credentials);
    if (areCredentialsValid) {
        const credentials = new FormData();
        credentials.append("email", _credentials.email);
        credentials.append("password", cryptoJs.SHA256(_credentials.password).toString());

        fetch("/api/signin", {
            method: "POST",
            body: credentials
        })
        .then((response) => response.json())
        .then((response) => {
            showInfoMsg(response.data.message, response.result);
            if (response.result === API_RESPONSE.SUCCESS) {
                // setTimeout(() => redirect("/dashboard"), 3000)
            } else {
                $("#password").focus(function() { $(this).select() } );
            }
        }).catch((error) => {
            showInfoMsg("Error occured in signing in, Try again", "danger");
        })
    } else {
        showInfoMsg("Entered Credentials are not in the expected format", "warning")
    }
}

function handleSignUp() {
    const _credentials = {
        userType: $("#user-type").value,
        name: $("#name").value,
        email: $("#email").value,
        password: $("#password").value,
        service: $("#service")?.value,
        experience: $("#experience")?.value,
        description: $("#description")?.value,
        location: $("#location")?.value,
        pincode: String($("#pincode")?.value),
        duration: $("#duration")?.value,
        price: $("#price")?.value
    };
    const areCredentialsValid = validateCredentials(_credentials);
    if (areCredentialsValid) {
        const credentials = new FormData();
        Object.keys(_credentials).forEach((cred) => {
            credentials.append(cred, _credentials[cred]);
        })
        credentials.set("password", cryptoJs.SHA256(credentials.password).toString())

        fetch("/api/signup", {
            method: "POST",
            body: credentials
        })
        .then((response) => response.json())
        .then((response) => {
            showInfoMsg(response.data.message, response.result);
            if (response.result === API_RESPONSE.SUCCESS) {
                // setTimeout(() => redirect("/dashboard"), 3000)
            } else {
                ($("#description") || $("#password"))?.focus(function() { $(this).select() } );
            }
        }).catch((error) => {
            showInfoMsg("Error occured in signing up, Try again", "danger");
        })
    } else {
        showInfoMsg("Entered Credentials are not in the expected format", "warning")
    }
}

function handleRegister(event) {
    if (currentRegisterType === REGISTER_TYPE.SIGN_IN) {
        handleSignIn(event);
    } else if (currentRegisterType === REGISTER_TYPE.SIGN_UP) {
        handleSignUp(event);
    }
}

const handleUserTypeChange = (event) => {
    const userType = $("#user-type")?.value;
    if (!userType) {
        return;
    }
    if (userType === REGISTER_USER_TYPE.USER) {
        rm$(registerForm, [$("#service"), $("#experience"), $("#description")]);
    } else if (userType === REGISTER_USER_TYPE.PROFESSIONAL) {
        const professionalInputs = [];
        if (!$("#service")) {
            const serviceInput = c$("select", {
                classNames: [],
                attrs: {
                    name: "service",
                    id: "service"
                }
            });
            r$(serviceInput, ["", ...availableServices].map((serviceType) => c$("option", {
                classNames: [],
                attrs: {
                    selected: serviceType.type === currentServiceType,
                    value: serviceType.sid || ""
                },
                content: serviceType === "" ? "Service Type" : serviceType.name
            })));
            serviceInput.value = "";
            professionalInputs.push(serviceInput);
        }
        if (!$("#experience")) {
            const experienceInput = c$("input", {
                classNames: ["register-input"],
                attrs: {
                    name: "experience",
                    placeholder: "experience",
                    type: "number",
                    id: "experience"
                }
            });
            professionalInputs.push(experienceInput);
        }
        if (!$("#description")) {
            const descriptionInput = c$("textarea", {
                classNames: ["register-input"],
                attrs: {
                    name: "description",
                    placeholder: "Description",
                    id: "description"
                }
            });
            professionalInputs.push(descriptionInput);
        }
        if (!$("#duration")) {
            const durationInput = c$("input", {
                classNames: ["register-input"],
                attrs: {
                    name: "duration",
                    placeholder: "Duration",
                    type: "number",
                    id: "duration"
                }
            });
            professionalInputs.push(durationInput);
        }
        if (!$("#price")) {
            const priceInput = c$("input", {
                classNames: ["register-input"],
                attrs: {
                    name: "price",
                    placeholder: "Price",
                    type: "number",
                    id: "price"
                }
            });
            professionalInputs.push(priceInput);
        }
        ap$(registerForm, professionalInputs);
    }
};

function handleRegisterSwitch() {
    if (currentRegisterType === REGISTER_TYPE.SIGN_IN) {
        const userTypeInput = c$("select", {
            classNames: [],
            attrs: {
                name: "user-type",
                id: "user-type"
            }
        });
        r$(userTypeInput, Object.values(REGISTER_USER_TYPE).map((userType) => c$("option", {
            classNames: [],
            attrs: {
                selected: userType === currentRegisterUserType,
                value: userType
            },
            content: `${userType.slice(0,1).toUpperCase()}${userType.slice(1).toLowerCase()}`
        })));
        userTypeInput.value = currentRegisterUserType;

        const nameInput = c$("input", {
            classNames: ["register-input"],
            attrs: {
                name: "name",
                placeholder: "FullName",
                type: "text",
                id: "name"
            }
        });

        const emailInput = c$("input", {
            classNames: ["register-input"],
            attrs: {
                name: "email",
                placeholder: "Email",
                type: "text",
                id: "email"
            }
        });

        const passwordInput = c$("div", {
            classNames: ["position-relative"]
        });
        r$(passwordInput, [
            c$("input", {
                classNames: ["register-input"],
                attrs: {
                    name: "password",
                    placeholder: "Password",
                    type: "password",
                    id: "password"
                }
            }), 
            c$("i", {
                classNames: ["bi", "bi-eye-slash-fill", "position-absolute", "top-50", "end-0", "translate-middle", "cursor-pointer"],
                attrs: {
                    id: "toggle-password-btn"
                }
            })
        ]);

        const locationInput = c$("input", {
            classNames: ["register-input"],
            attrs: {
                name: "location",
                placeholder: "Location",
                type: "text",
                id: "location"
            }
        });
        
        const pincodeInput = c$("input", {
            classNames: ["register-input"],
            attrs: {
                name: "pincode",
                placeholder: "Pincode",
                type: "number",
                id: "pincode",
                maxlength: 6
            }
        });

        $("#register-type-text").textContent = "Sign Up Now";
        r$(registerForm, [userTypeInput, nameInput, emailInput, passwordInput, locationInput, pincodeInput]);
        handleUserTypeChange();
        registerButton.textContent = "Sign Up";
        registerSwitchButton.textContent = "Already a User? Sign In";
        registerButton.setAttribute("data-type", REGISTER_TYPE.SIGN_UP);
        registerSwitchButton.setAttribute("data-type", REGISTER_TYPE.SIGN_UP);

        userTypeInput.addEventListener("change", handleUserTypeChange);

        currentRegisterType = REGISTER_TYPE.SIGN_UP;

    } else if (currentRegisterType === REGISTER_TYPE.SIGN_UP) {
        currentRegisterUserType = REGISTER_USER_TYPE.USER;
        currentServiceType = "";
        $("#user-type").removeEventListener("change", handleUserTypeChange);

        const username = c$("input", {
            classNames: ["register-input"],
            attrs: {
                name: "email",
                placeholder: "Email",
                id: "email",
                type: "text"
            }
        });

        const password = c$("div", {
            classNames: ["position-relative"]
        });
        r$(password, [
            c$("input", {
                classNames: ["register-input"],
                attrs: {
                    name: "password",
                    placeholder: "Password",
                    type: "password",
                    id: "password"
                }
            }), 
            c$("i", {
                classNames: ["bi", "bi-eye-slash-fill", "position-absolute", "top-50", "end-0", "translate-middle", "cursor-pointer"],
                attrs: {
                    id: "toggle-password-btn"
                }
            })
        ]);

        $("#register-type-text").textContent = "Sign In Now";
        r$(registerForm, [username, password]);
        registerButton.textContent = "Sign In";
        registerSwitchButton.textContent = "New User? Sign Up";
        
        currentRegisterType = REGISTER_TYPE.SIGN_IN;
    }
    togglePasswordButton().addEventListener("click", handleTogglePassword);
} 

function listenEvents() {
    registerButton.addEventListener("click", handleRegister);
    registerSwitchButton.addEventListener("click", handleRegisterSwitch);
    togglePasswordButton().addEventListener("click", handleTogglePassword);
}

function fetchRequirements() {
    // TODO: handle service type fetch
    availableServices = window.services;
}

listenEvents();
fetchRequirements();