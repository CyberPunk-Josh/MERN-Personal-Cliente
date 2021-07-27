export function minLengthValidations(inputData, minLength) {
    const { value } = inputData;
    removeClassErrorSucces(inputData)

    if(value.length >= minLength){
        inputData.classList.add("success");
        return true;
    } else {
        inputData.classList.add("error");
        return false;
    }
}

export function emailValidation(inputData){
    // eslint-disable-next-line
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData;
    removeClassErrorSucces(inputData);

    const resultValidations = emailValid.test(value);

    if(resultValidations) {
        inputData.classList.add('success');
        return true
    } else {
        inputData.classList.add('error');
        return false;
    }
}

function removeClassErrorSucces(inputData){
    inputData.classList.remove("success");
    inputData.classList.remove("error");
}