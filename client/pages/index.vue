<script setup lang="ts">
import { useDevtoolsClient, onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import type { ServerFunctions, ClientFunctions } from '../../src/types/rpc/my-module'

const RPC_NAMESPACE = 'my-module-rpc'

// Uncommenting this breaks the devtools client
// onDevtoolsClientConnected(async (client) => {
//   const rpc = client.devtools.extendClientRpc<ServerFunctions, ClientFunctions>(RPC_NAMESPACE, {
//     showNotification(message) {
//       console.log(message)
//     },
//   })

//   call server RPC functions
//   const options = await rpc.getMyModuleOptions()
//   console.log(options)
// })

const client = useDevtoolsClient()
</script>

<template>
  <div class="relative p-10 n-bg-base flex flex-col h-screen">
    <h1 class="text-3xl font-bold">
      My Module
    </h1>
    <div class="opacity-50 mb-4">
      Nuxt DevTools Integration
    </div>
    <div ref="x"></div>
    <div
      v-if="client"
      class="flex flex-col gap-2"
    >
      <NTip
        n="green"
        icon="carbon-checkmark"
      >
        Nuxt DevTools is connected
      </NTip>
      <div>
        The current app is using
        <code class="text-green">vue@{{ client.host.nuxt.vueApp.version }}</code>
      </div>
      <div>
        <NButton
          n="green"
          class="mt-4"
          @click="client!.host.devtools.close()"
        >
          Close DevTools
        </NButton>
      </div>
    </div>
    <div v-else>
      <NTip n="yellow">
        Failed to connect to the client. Did you open this page inside Nuxt DevTools?
      </NTip>
    </div>

    <div class="flex-auto" />
    <ModuleAuthorNote class="mt-5 " />
  </div>
</template>
