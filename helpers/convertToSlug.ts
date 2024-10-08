import unidecode from "unidecode"

export const convertToSlug = (text: string): string => {
    const unidecodeText = unidecode(text.trim())
    
    const slug: string = unidecodeText.replace(/\s+/g, "-") // thay khoảng trắng bằng dấu "-"
    return slug
}