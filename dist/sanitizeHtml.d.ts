export default function xss(input: string, allowedTags?: string[], allowedAttributes?: {
    [key: string]: string[];
}): string;
