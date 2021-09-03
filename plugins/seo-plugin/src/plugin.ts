import { PluginCommonModule, VendurePlugin, VendureConfig, RuntimeVendureConfig } from '@vendure/core';
import { ProductSeoFields, CollectionSeoFields } from './custom-fields';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: (config: VendureConfig) => {
    config.customFields!.Collection!.push(...CollectionSeoFields!);
    config.customFields!.Product!.push(...ProductSeoFields!);
    return config as RuntimeVendureConfig;
  }
})
export class SeoPlugin {}