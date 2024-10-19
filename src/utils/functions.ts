
export const validateEmail = (email: string): boolean =>  {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}

export const validateDocument = (document: string): boolean => {
    document = document.replace(/[^\d]/g, '');
    
    if (document.length !== 11 || /^(\d)\1+$/.test(document)) {
        return false;
    }

    let sum: number;
    let rest: number;

    // Validação do primeiro dígito verificador
    sum = 0;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(document.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }
    if (rest !== parseInt(document.substring(9, 10))) {
        return false;
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(document.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }
    if (rest !== parseInt(document.substring(10, 11))) {
        return false;
    }

    return true;
}

export const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ]*\s+[A-Za-zÀ-ÿ\s]*$/;
    return nameRegex.test(name) && name.replace(/[^A-Za-zÀ-ÿ]/g, '').length >= 2;
}
