import type { CollectionConfig } from 'payload'
import { generateBlurDataURL, isEligibleForBlurDataURL } from './lib/generate-blur-data-url'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: true,
            admin: { hidden: true },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            async ({ operation, data, req }) => {
                // only generate blur hash on create
                if (operation !== 'create') return data

                // 1. Check for Eligibility  - check it being qualified or allowed to do something / whether you meet the requirements
                if (!isEligibleForBlurDataURL(req.file?.mimetype)) return data

                // 2. If it is , generate blur hash
                const base64 = await generateBlurDataURL(req.file?.data)
                if (!base64) return data

                // 3. set it to data.blurDataUrl
                data.blurDataUrl = base64
                console.log('Generated blur data URL for:', data.filename)

                // 4. return data
                return data
            },
        ],
    },
}
