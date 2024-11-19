<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Universidad Autónoma de Chiapas UNACH CAMPUS IV',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Clientes', icon: 'pi pi-fw pi-user', to: '/formClientes' },
            { label: 'Punto de venta', icon: 'pi pi-fw pi-cart-plus', to: '/puntoVenta' },
            { label: 'Comsumir API REST', icon: 'pi pi-fw pi-code', to: '/apiConsumir' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
