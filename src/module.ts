import { extendServerRpc, onDevToolsInitialized } from "@nuxt/devtools-kit";
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsSources,
} from "@nuxt/kit";
import { setupDevToolsUI } from "./devtools";
import type { ServerFunctions, ClientFunctions } from "./types/rpc/my-module";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean;
}

const RPC_NAMESPACE = "my-module-rpc";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    devtools: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImportsSources({
      from: resolver.resolve("./types/rpc/my-module"),
      imports: ["ServerFunctions", "ClientFunctions"],
    });

    if (options.devtools) setupDevToolsUI(nuxt, resolver);

    onDevToolsInitialized(async () => {
      const rpc = extendServerRpc<ClientFunctions, ServerFunctions>(
        RPC_NAMESPACE,
        {
          getMyModuleOptions() {
            return options;
          },
        }
      );

      await rpc.broadcast.showNotification("Hello from My Module!");
    });
  },
});
