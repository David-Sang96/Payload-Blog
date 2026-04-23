import { CollectionConfig } from 'payload'

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
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
            options: [
                { value: 'staff_writer', label: 'Staff Writer' },
                { value: 'guest_writer', label: 'Guest Writer' },
                { value: 'flo_rida', label: 'Flo Rida' },
                { value: 'contributor', label: 'Contributor' },
                { value: 'editor', label: 'Editor' },
            ],
            defaultValue: 'staff_writer',
            required: true,
        },
    ],
}
