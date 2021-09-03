import { LanguageCode, ShippingEligibilityChecker } from '@vendure/core';

export const valueShippingEligibilityChecker = new ShippingEligibilityChecker({
    code: 'value-shipping-eligibility-checker',
    description: [
        { languageCode: LanguageCode.en, value: 'Value Based Shipping Eligibility Checker' },
        { languageCode: LanguageCode.it, value: "Filtra in base al valore dell'ordine" }
    ],
    args: {
        orderMinimum: {
            type: 'int',
            config: { inputType: 'money' },
            ui: { component: 'currency-form-input' },
            label: [
              { languageCode: LanguageCode.en, value: 'Minimum order value' },
              { languageCode: LanguageCode.it, value: "Valore minimo dell'ordine" },
            ],
            description: [
                {
                    languageCode: LanguageCode.en,
                    value: 'Order is eligible only if its total is greater or equal to this value',
                },
                {
                    languageCode: LanguageCode.it,
                    value: "L'ordine è adatto a questo metodo di spedizione solo se il suo valore è almeno pari a questo",
                },
            ],
        },
    },
    check: (ctx, order, args) => {
        return order.totalWithTax >= args.orderMinimum;
    },
});
