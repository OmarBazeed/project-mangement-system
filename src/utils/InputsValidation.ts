// all validations in one place
export const emailValidation = {
	required: "Email is required",
	pattern: {
		value:
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
		message: "Email is invalid",
	},
};

export const passwordValidation = {
	required: "Password is required",
	minLength: {
		value: 6,
		message: "Password must be at least 6 characters long",
	},
	pattern: {
		value:
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
		message:
			"Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
	},
};

export const userNameValidation = {
	required: "Username is required",
	minLength: {
		value: 3,
		message: "Username must be at least 3 characters",
	},
	pattern: {
		value: /^[a-zA-Z]+[0-9]+$/,
		message:
			"Username must contain characters and end with numbers without spaces",
	},
};

export const countryValidation = {
	required: "Country is required",
	minLength: {
		value: 3,
		message: "Country must be at least 3 characters",
	},
	maxLength: {
		value: 30,
		message: "Country must not be more than 30 characters",
	},
	pattern: {
		value: /^[a-zA-Z\s]+$/,
		message: "Country is invalid (only letters)",
	},
};

export const phoneNumberValidation = {
	required: "Phone Number is required",
	pattern: {
		value: /^01[0-2,5]{1}[0-9]{8}$/,
		message: "Invalid phone number format (01XXXXXXXXX)",
	},
};

export const OTPValidation = {
	required: "OTP is required",
	minLength: {
		value: 4,
		message: "OTP must be exactly 4 characters long",
	},
	maxLength: {
		value: 4,
		message: "OTP must be exactly 4 characters long",
	},
};
