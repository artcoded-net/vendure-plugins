import { LanguageCode, CustomFields } from '@vendure/core';

export const ProductSeoFields: CustomFields['Product'] = [
    {
        name: 'seoDescription',
        type: 'localeString',
        length: 65535,
        label: [
            {languageCode: LanguageCode.en, value: 'SEO Description'},
            {languageCode: LanguageCode.it, value: 'Descrizione per SEO'}
        ],
        description: [
            {languageCode: LanguageCode.en, value: 'Set this field if you want to use a specific description for search engines and social media (recommended)'},
            {languageCode: LanguageCode.it, value: 'Imposta questa descrizione se vuoi una specifica descrizione per motori di ricerca e social media (raccomandato)'}
        ]
    }
];

export const CollectionSeoFields: CustomFields['Collection'] = [
    {
        name: 'seoDescription',
        type: 'localeString',
        length: 65535,
        label: [
            {languageCode: LanguageCode.en, value: 'SEO Description'},
            {languageCode: LanguageCode.it, value: 'Descrizione per SEO'}
        ],
        description: [
            {languageCode: LanguageCode.en, value: 'Set this field if you want to use a specific description for search engines and social media (recommended)'},
            {languageCode: LanguageCode.it, value: 'Imposta questa descrizione se vuoi una specifica descrizione per motori di ricerca e social media (raccomandato)'}
        ]
    }
];