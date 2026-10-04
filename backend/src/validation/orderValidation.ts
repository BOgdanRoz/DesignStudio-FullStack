
export function orderValidation(data: any) {
    const errors: string[] = []
    // name check
    if (typeof data.name !== "string" || data.name.trim() === "") {
        errors.push("Name is required")
    }

    // email check
    if (typeof data.email !== "string" || data.email.trim() === "") {
        errors.push("Email is required")
    }
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(data.email)) {
        errors.push("Email doesn't have valid format")
    }

    // phone check
    if (typeof data.phone !== "string" || data.phone.trim() === "") {
        errors.push("Phone is required")
    }

    // serviceId check
    if (typeof data.serviceId !== "number" || !Number.isInteger(data.serviceId)) {
        errors.push("Invalid format of service")
    }

    // company check OPTIONAL
    if (data.company !== undefined && typeof data.company !== "string" ) {
        errors.push("Invalid format of company")
    }

    // details check OPTIONAL
    if (data.details !== undefined && typeof data.details !== "string" ) {
        errors.push("Invalid format of details")
    }

    return errors
}