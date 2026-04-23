import { slugify } from 'payload/shared'
import type { CollectionConfig, FieldHook } from 'payload'
import { generateSlugHook } from './hooks/generate-slug.hook'
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

// fields
// - title
// - slug (auto-generated from title)
// - content (rich text, WYSWYG editor)
// - content_summary (auto-filled from content; for SEO and article cards)
// - read_time_in_mins (auto-generated)
// - cover_image
// - author (relations)
// - status  (draft , published)
// - published_at ( only visible when status is published)

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: { beforeValidate: [generateSlugHook] },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: { beforeValidate: [generateContentSummaryHook] },
        },
        // Virtual field (not persisted):
        // - Removes itself before saving (beforeChange)
        // - Recomputed on fetch (afterRead)
        // - Uses average reading speed (200 wpm), NOT user-specific
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        delete siblingData.readTimeInMins
                    },
                ],
                afterRead: [
                    /* data represents the document based on the fields you defined in that collection
                    data.id <-- auto-added        
                    data.createdAt <-- auto-added   
                    data.updatedAt <-- auto-added     
                    */
                    ({ data }) => {
                        const text = convertLexicalToPlaintext({ data: data?.content }).trim()
                        const wordsPerMinute = 200
                        const words = text.split(/\s+/).length
                        return Math.max(1, Math.ceil(words / wordsPerMinute))
                    },
                ],
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: [
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
            ],
            defaultValue: 'draft',
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === 'published', // make is show only when status is published and not draft
                date: { pickerAppearance: 'dayAndTime' },
            },
        },
    ],
}
