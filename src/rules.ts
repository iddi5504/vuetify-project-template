const rules = {
    // General Rules
    required: (value: string) => !!value || 'This field is required.',
    minLength: (length: number) => (value: string) =>
        (value || '').length >= length || `Minimum ${length} characters required.`,
    maxLength: (length: number) => (value: string) =>
        (value || '').length <= length || `Maximum ${length} characters allowed.`,
    email: (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address.',
    phoneNumber: (value: string) =>
        /^\+?[0-9\s\-]{7,15}$/.test(value) || 'Enter a valid phone number.',
    match: (compareValue: string) => (value: string) =>
        value === compareValue || 'Values do not match.',
    numeric: (value: string) =>
        /^[0-9]*$/.test(value) || 'Only numeric values are allowed.',
    alpha: (value: string) =>
        /^[A-Za-z]*$/.test(value) || 'Only alphabetic characters are allowed.',
    alphanumeric: (value: string) =>
        /^[A-Za-z0-9]*$/.test(value) || 'Only alphanumeric characters are allowed.',
    url: (value: string) =>
        /^(https?:\/\/)?([\w\-])+\.{1}[a-zA-Z]{2,63}(\/([\w\-#?=&]+)?)?$/.test(value) || 'Enter a valid URL.',
    positiveNumber: (value: string) =>
        Number(value) > 0 || 'Value must be greater than zero.',

    // Specialized Rules
    passwordStrength: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
        'Password must contain at least 8 characters, including one letter and one number.',
    noSpaces: (value: string) =>
        !/\s/.test(value) || 'No spaces allowed.',
    range: (min: number, max: number) => (value: string) =>
        Number(value) >= min && Number(value) <= max || `Value must be between ${min} and ${max}.`,

    // Date Validation
    validDate: (value: string) =>
        !isNaN(Date.parse(value)) || 'Enter a valid date.',
    futureDate: (value: string) =>
        new Date(value) > new Date() || 'Date must be in the future.',

    isValidLink(link: string) {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;
        return urlPattern.test(link);
    },
    // Custom Regex
    customRegex: (regex: RegExp, message: string) => (value: string) =>
        regex.test(value) || message,
};

export default rules;
