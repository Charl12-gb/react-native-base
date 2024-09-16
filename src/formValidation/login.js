export const validate = values => {
    const errors = {};

    if (!values.email_or_phone) {
        errors.email_or_phone = "L'adresse email ou le numéro de téléphone est requis";
    }

    if (!values.password) {
        errors.password = "Le mot de passe est requis";
    }

    return errors;
};