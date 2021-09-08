import { LanguageCode, CustomFields } from "@vendure/core";

const ProductVariantCustomFields: CustomFields["ProductVariant"] = [
  {
    name: "weight",
    type: "float",
    min: 0,
    label: [
      { languageCode: LanguageCode.en, value: "Weight" },
      { languageCode: LanguageCode.it, value: "Peso" },
    ],
  },
  {
    name: "weightUoM",
    type: "string",
    options: [
      { value: "g" },
      { value: "kg" },
      // { value: 'lb' }, { value: 'oz' } TODO: add these UoM
    ],
    label: [
      { languageCode: LanguageCode.en, value: "Weight unit of measure" },
      { languageCode: LanguageCode.it, value: "Unità di misura per il peso" },
    ],
  },
];

export default ProductVariantCustomFields;
