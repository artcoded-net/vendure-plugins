import { LanguageCode, CustomFields } from '@vendure/core';

const ProductVariantCustomFields: CustomFields['ProductVariant'] = [
  // { 
  // name: 'width', 
  // type: 'float',
  // min: 0,
  // label: [
  //     {languageCode: LanguageCode.en, value: 'Width'},
  //     {languageCode: LanguageCode.it, value: 'Larghezza'}] 
  // },
  // { 
  // name: 'length', 
  // type: 'float',
  // min: 0,
  // label: [
  //     {languageCode: LanguageCode.en, value: 'Length'},
  //     {languageCode: LanguageCode.it, value: 'Lunghezza'}] 
  // },
  // { 
  // name: 'heigth', 
  // type: 'float',
  // min: 0,
  // label: [
  //     {languageCode: LanguageCode.en, value: 'Heigth'},
  //     {languageCode: LanguageCode.it, value: 'Altezza'}] 
  // },
  { 
  name: 'weight', 
  type: 'float',
  min: 0,
  label: [
      {languageCode: LanguageCode.en, value: 'Weight'},
      {languageCode: LanguageCode.it, value: 'Peso'}] 
  },
  {
    name: 'weightUoM',
    type: 'string',
    options: [{ value: 'g' }, { value: 'kg' }, 
    // { value: 'lb' }, { value: 'oz' } TODO: add these UoM
    ],
    label: [
      {languageCode: LanguageCode.en, value: 'Weight unit of measure'},
      {languageCode: LanguageCode.it, value: 'Unità di misura per il peso'}
    ]
  },
  // {
  //   name: 'lengthUnit',
  //   type: 'string',
  //   options: [{ value: 'cm' }, { value: 'ft' }, { value: 'in' }],
  //   label: [
  //     {languageCode: LanguageCode.en, value: 'Distance unit of measure'},
  //     {languageCode: LanguageCode.it, value: 'Unità di misura per le dimensioni'}
  //   ]
  // }
];

export default ProductVariantCustomFields;