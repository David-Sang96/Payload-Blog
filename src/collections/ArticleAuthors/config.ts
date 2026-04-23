import { CollectionConfig } from 'payload'
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from './constants'

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            unique: true,
            required: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [...ARTICLE_AUTHOR_ROLE_OPTIONS],
            defaultValue: ARTICLE_AUTHOR_ROLE_OPTIONS[0].value,
            required: true,
        },
    ],
}
