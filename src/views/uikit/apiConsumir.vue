<script>
import axios from 'axios';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';

export default {
    components: {
        Button,
        Column,
        DataTable,
        InputText
    },
    data() {
        return {
            objetos: [],
            idObjeto: '',
            name: '',
            color: '',
            price: ''
        };
    },
    mounted() {
        this.consultarAPIObjetos();
    },
    methods: {
        // Consultar objeto por ID
        async consultarAPI() {
            if (!this.idObjeto) {
                this.$toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, ingrese un ID de producto.', life: 3000 });
                return;
            }
            const apiUrl = `https://api.restful-api.dev/objects/${this.idObjeto}`;
            try {
                const response = await axios.get(apiUrl);
                const objeto = response.data; // Suponiendo que la respuesta es un objeto con los datos.
                this.name = objeto.name || 'Sin nombre';
                this.color = objeto.data?.color || 'Sin color';
                this.price = objeto.data?.price || 'Sin precio';
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos del producto cargados exitosamente.', life:3000 });
            } catch (error) {
                console.error('Hubo un error al consultar la API:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener los datos del producto.', life: 3000 });
            }
        },

        // Consultar todos los objetos
        async consultarAPIObjetos() {
            try {
                const response = await axios.get('https://api.restful-api.dev/objects');
                const objetos = response.data; // Array de objetos
                this.objetos = objetos.map((objeto) => ({
                    id: objeto.id,
                    name: objeto.name || 'Sin nombre',
                    color: objeto.data?.color || 'Sin color',
                    price: objeto.data?.price || 'Sin precio'
                }));
            } catch (error) {
                console.error('Hubo un error al consultar la API:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la lista de Productos.', life: 3000 });
            }
        }
    }
};
</script>

<template>
    <div class="grid p-fluid">
        <!-- Consultar objeto por ID -->
        <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-12">
            <div class="card">
                <h5>Consultar Producto por ID</h5>
                <div class="col-12">
                    <!-- Campo ID Objeto -->
                    <div class="field">
                        <label for="inputId" class="font-bold" style="text-align: left; width: 50%">ID Producto:</label>
                        <InputText id="inputId" type="number" v-model="idObjeto" style="width: 40%; display: block" />
                    </div>

                    <!-- Campo Nombre -->
                    <div class="field">
                        <label for="name" class="font-bold" style="text-align: left; width: 50%">Nombre Del Producto:</label>
                        <InputText id="name" v-model="name" readonly style="width: 40%; display: block" />
                    </div>

                    <!-- Campo Color -->
                    <div class="field">
                        <label for="color" class="font-bold" style="text-align: left; width: 50%">Color Del Producto:</label>
                        <InputText id="color" v-model="color" readonly style="width: 40%; display: block" />
                    </div>

                    <!-- Campo Precio -->
                    <div class="field">
                        <label for="price" class="font-bold" style="text-align: left; width: 50%">Precio Del Producto:</label>
                        <InputText id="price" v-model="price" readonly style="width: 40%; display: block" />
                    </div>

                    <!-- Botón Adaptado -->
                    <Button label="Consultar Datos" icon="pi pi-search" @click="consultarAPI" style="width: 40%; display: block; margin-top: 1rem" />
                </div>
            </div>
        </div>

        <!-- Mostrar lista de objetos -->
        <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-12">
            <div class="card">
                <h5>Lista de Productos</h5>
                <DataTable :value="objetos" showGridlines tableStyle="min-width: 50rem">
                    <!-- Ajustando la alineación de las columnas -->
                    <Column field="id" header="ID" style="text-align: center"></Column>
                    <Column field="name" header="Nombre del producto" style="text-align: left"></Column>
                    <Column field="color" header="Color" style="text-align: left"></Column>
                    <Column field="price" header="Precio" style="text-align: right"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
