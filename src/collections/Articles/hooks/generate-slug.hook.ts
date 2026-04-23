import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { FieldHook } from 'payload'
import { slugify } from 'payload/shared'

export const generateSlugHook: FieldHook = ({ value, data }) => {
    if (value) return slugify(value.trim()) || ''
    return slugify(data?.title?.trim() || '') || ''
}
