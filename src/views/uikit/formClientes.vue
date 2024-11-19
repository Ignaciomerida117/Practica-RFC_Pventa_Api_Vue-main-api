<script setup>

import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';

const nombre = ref('');
const apellidoP = ref('');
const apellidoM = ref('');
const date = ref(null);
const rfc = ref('');

const toast = useToast();

const checarCampos = () => {
    if (nombre.value.trim() !== '' && apellidoP.value.trim() !== '' && apellidoM.value.trim() !== '') {
        if (date.value && !isNaN(new Date(date.value).getTime())) {
            const rfcGenerado = generarRFC(nombre.value, apellidoP.value, apellidoM.value, date.value);
            rfc.value = rfcGenerado;
            toast.add({ severity: 'success', summary: 'Éxito', detail: 'El RFC puede ser generado con éxito', life: 3000 });
        } else {
            toast.add({ severity: 'warn', summary: 'Atención', detail: 'Selecciona una fecha válida.', life: 3000 });
        }
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Verifica que los campos estén completos.', life: 3000 });
    }
};

function generarRFC(nombre, apellidoP, apellidoM, fecha) {
    const year = fecha.getFullYear().toString().substring(2);
    const caracteresAleatorios = generarCaracteresAleatorios(7); 
    const rfcGenerado = apellidoP.substring(0, 2).toUpperCase() +
                       apellidoM.substring(0, 1).toUpperCase() +
                       nombre.substring(0, 1).toUpperCase() +
                       year +
                       caracteresAleatorios;

    return rfcGenerado;
}

function generarCaracteresAleatorios(longitud) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let resultado = "";
    for (let i = 0; i < longitud; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h3>Generar el RFC de una persona</h3>
                <h5>Nombre(s):</h5> <br>
                <InputText class="col-5" type="text" v-model="nombre" placeholder="Ingresa el nombre(s)..." /> <br>
                <h5>Apellido Paterno:</h5> <br>
                <InputText class="col-5" type="text" v-model="apellidoP" placeholder="Ingresa el apellido paterno..." /> <br>
                <h5>Apellido Materno:</h5> <br>
                <InputText class="col-5" type="text" v-model="apellidoM" placeholder="Ingresa el apellido materno..." /> <br>
                <h5>Fecha de Nacimiento:</h5> <br>
                <Calendar class="col-5" v-model="date" dateFormat="dd/mm/yy" showIcon /> <br>
                <h5>RFC Generado:</h5> <br>
                <InputText class="col-5" v-model="rfc" disabled placeholder="RFC..." /> <br>

                <Toast />
                <Button class="mt-3" label="Generar" severity="success" icon="pi pi-check" @click="checarCampos"/>
            </div>
        </div>
    </div>
</template>