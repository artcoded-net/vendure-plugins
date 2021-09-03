import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { CollectionCustomFields, ProductCustomFields } from "./custom-fields";

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: (config) => {
    config.customFields.Collection.push(...CollectionCustomFields!);
    config.customFields.Product.push(...ProductCustomFields!);
    return config;
  },
})
export class FeaturedPlugin {}
