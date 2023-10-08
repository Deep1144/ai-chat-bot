export function stringToResponseOptions(responseString): string[] {
    const optionsArray = responseString.split("\n");

    const cleanOptions = optionsArray.map(option => option.trim().replace("- ", "")).filter(option => option !== "");

    return cleanOptions;
}
