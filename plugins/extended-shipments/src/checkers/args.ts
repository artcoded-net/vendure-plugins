import { ConfigArgType, LanguageCode } from "@vendure/core";
import { ConfigArgDef } from "@vendure/core/dist/common/configurable-operation";

export const minimumValue: ConfigArgDef<"int"> = {
  type: "int",
  config: { inputType: "money" },
  ui: { component: "currency-form-input" },
  label: [
    { languageCode: LanguageCode.en, value: "Minimum order value" },
    { languageCode: LanguageCode.it, value: "Valore minimo dell'ordine" },
  ],
  description: [
    {
      languageCode: LanguageCode.en,
      value:
        "Order is eligible only if its total is greater or equal to this value",
    },
    {
      languageCode: LanguageCode.it,
      value:
        "L'ordine è adatto a questo metodo di spedizione solo se il suo valore è almeno pari a questo",
    },
  ],
};

export const maximumWeight: ConfigArgDef<"int"> = {
  type: "int",
  ui: { component: "number-form-input", options: { suffix: "kg" } },
  label: [
    { languageCode: LanguageCode.en, value: "Maximum order weight" },
    { languageCode: LanguageCode.it, value: "Peso massimo dell'ordine" },
  ],
  description: [
    {
      languageCode: LanguageCode.en,
      value:
        "Order is eligible only if its total weight is at most equal to this value",
    },
    {
      languageCode: LanguageCode.it,
      value:
        "L'ordine è adatto a questo metodo di spedizione solo se il suo peso totale è al massimo pari a questo",
    },
  ],
};
