import { LanguageCode, CustomFields } from '@vendure/core';

const CollectionCustomFields: CustomFields['Collection'] = [
    {
        name: 'featured',
        type: 'boolean',
        label: [
            {languageCode: LanguageCode.en, value: 'Mark as featured'},
            {languageCode: LanguageCode.it, value: 'Metti in evidenza'}
        ],
        description: [
            {languageCode: LanguageCode.en, value: 'Check this box to show this facet in featured facets selection (e.g. home page slider)'},
            {languageCode: LanguageCode.it, value: 'Spunta questa casella per inserire questo attributo tra quelli in evidenza (es. slider nella home page)'}
        ],
        defaultValue: false
    }
];

const ProductCustomFields: CustomFields['Product'] = [
    {
        name: 'featured',
        type: 'boolean',
        label: [
            {languageCode: LanguageCode.en, value: 'Mark as featured'},
            {languageCode: LanguageCode.it, value: 'Metti in evidenza'}
        ],
        description: [
            {languageCode: LanguageCode.en, value: 'Check this box to show this product with more relevance in its facets'},
            {languageCode: LanguageCode.it, value: 'Spunta questa casella mostrare il prodotto con maggiore evidenza nelle rispettive pagine'}
        ],
        defaultValue: false
    }
];

export { ProductCustomFields, CollectionCustomFields };