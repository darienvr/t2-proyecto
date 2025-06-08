<template>
    <div class="w-full h-full">
       <div class="flex items-center justify-between mb-2 px-2">
        <p class="text-base font-semibold">Lista de Actividades</p>
        <button @click="cerrarDropdown">
          <img
            src="../../assets/modal-close.svg"
            alt="Cerrar"
            @click="$emit('cerrar-panel')"
          />
        </button>
      </div> 
 
      <div class="px-2 text-xs font-normal">
          <div class="overflow-x-auto w-full">
             <table class="global border-collapse border border-gray-300 mt-2 text-left">
                <thead>
                   <tr class="bg-blue-100 w-full">
                      <th class="border border-gray-300 px-3 py-2">Nombre</th>
                      <th class="border border-gray-300 px-3 py-2">Pisos</th>
                      <th class="border border-gray-300 px-3 py-2">Sectores</th>
                   </tr>
                </thead>
                
             <tbody>
                <tr v-for="(item, index) in activities" :key="index" class=" w-full hover:bg-gray-100">
                   <td class="border border-gray-200 px-3 py-2 flex items-center gap-1">
                      <i class="fa-solid fa-image"></i>
                      <p>{{ item.nombre }}</p>
                   </td>
                   <td class="border border-gray-300 px-3 py-2 text-center">
                      <p>{{ item.pisos }}</p>
                   </td>
                   <td class="border border-gray-300 px-3 py-2 text-center">
                    <p>{{item.sectores }}</p>
                   </td>
                </tr>
             </tbody>
             </table>
          </div>
       </div>
    </div>
 
 
 </template>
 
 <script>
 
  export default {
    name: "SideBarActividades",
    props:{
       activities: Array,
    },
    data() {
     return {
       historial: [
         { nombre: "Grafico 1", fecha: "25/02/2024" },
         { nombre: "Grafico 1", fecha: "21/01/2025" },
         { nombre: "Grafico 1", fecha: "25/01/2025" },
         { nombre: "Grafico 1", fecha: "25/02/2025" },
       ]
     };
   },
    methods: {
      cerrarDropdown() {
        this.$emit("cerrar-panel");
      }
    }
 }
 
 </script>
 <style>
    .global{
       width: 100% !important;
    }
 </style>