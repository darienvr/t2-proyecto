<template>
    <table class="w-full border-collapse table-fixed !max-h-[90%] min-h-[650px]">
        <thead>
            <th class="w-[140px] relative px-2 cursor-pointer"
                :class="section.currentSection == 'pisos' ? 'border !border-[#002B6B] !border-b-white text-[#002B6B] z-[5]' 
                : 'border-l border-t border-slate-200 z-[4]'"
                @click="changeSection('pisos')">
                <div class="w-full flex flex-row items-center text-center">
                    <i class="fa-duotone fa-solid fa-building"></i>
                    <span class="w-full font-light">Pisos</span>
                </div>
            </th>
            <th class="w-[140px] relative h-full px-2 cursor-pointer"
                :class="section.currentSection == 'resumen' ? 'border !border-[#002B6B] !border-b-white text-[#002B6B] z-[5]' 
                    : 'border-r border-t border-slate-200 z-[4]'"
                @click="changeSection('resumen')">
                <div class="w-full flex flex-row items-center text-center">
                    <i class="fa-duotone fa-solid fa-table"></i>
                    <span class="w-full font-light">Resumen</span>
                </div>
            </th>
            <th class="w-full text-right"> 
                <div class="flex flex-row flex-grow justify-end">
                    <div class="border border-slate-200 rounded-md shadow-md text-center !mb-1 cursor-pointer"
                        @click.stop="toggleDropdown('showDropdownOpciones', true)">
                        <i class="fa-solid fa-gear"></i>
                        <span class="font-light px-2">Opciones</span>
                    </div>
                    
                </div>
            </th>
        </thead>
        <!-- Seccion de gestion de la fase -->
        <tbody class="relative">
            <tr >
                <!-- Seccion de pisos -->
                <td v-if="section.currentSection == 'pisos'" colspan="3" class="w-full border h-full max-h-full border-[#002B6B] px-1 py-3">
                    <div v-if="pisos.length > 0" class="flex flex-row flex-grow w-full justify-between">
                        <div class="flex flex-row h-fit w-fit max-w-[30%] shadow-[4px_0_6px_#e2e8f0,0_2px_10px_#e2e8f0] border-2
                            border-slate-200 rounded-sm">
                            <!-- Seccion de pisos -->
                            <div class="w-fit max-h-[80vh] p-2">
                                <ul class="border h-full border-slate-200 rounded-sm overflow-auto scrollbar-hidden">
                                    <!-- Lista de pisos -->
                                    <li v-for="(piso, index) in pisos" :key="index" class="w-full px-4 py-2 text-center text-sm font-light 
                                        border-b-2 border-slate-200 cursor-pointer" @click.stop="changePiso(piso)">{{ piso.name }}</li>
                                </ul>
                            </div>

                            <!-- Seccion de sectores -->
                            <div v-if="currentPiso" class="w-auto px-4 py-2 text-base font-bold h-fit 
                                !max-h-[67vh] text-orange">
                                <div @click.stop="enableNewSectorRow()" class="cursor-pointer">
                                    <button class="">
                                        <i class="fa-solid fa-square-plus text-orange"></i>
                                    </button>
                                    <span class="ml-2">Añadir sector</span>
                                </div>

                                <!-- lista de sectores -->
                                <div class="overflow-auto h-full max-h-[60vh] scrollbar-hidden py-4"  ref="containerSectores">
                                    <table class="border-collapse text-black text-base font-light text-center table-auto relative" :class="addingNewSector ? 'ml-4' : ''">
                                        <!-- Thead oculto para mantener ancho de celdas -->
                                        <thead class="sr-only">
                                            <tr>
                                                <th class="border w-14 border-slate-200">N°</th>
                                                <th class="border w-40 border-slate-200">Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody class="font-light text-center relative">
                                            <!-- Nueva fila para agregar sector -->
                                            <tr v-if="addingNewSector" class="relative">
                                                <td class="border w-fit bg-[rgb(228,197,158)] relative border-slate-200">
                                                    <button @click.stop="disableNewSectorRow()"
                                                        class="absolute -left-2 z-20 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center bg-red-600 rounded-full">
                                                        <i class="fa-solid fa-trash text-white text-xs"></i>
                                                    </button>
                                                    <input @input="handleInputNewSector()" type="text" class="max-w-[20px] text-center bg-transparent" v-model="newSector.desSector" placeholder="...">
                                                </td>
                                                <td class="border w-40 border-slate-200">
                                                    <input @input="handleInputNewSector()" type="text" class="text-center bg-transparent" v-model="newSector.name" placeholder=" ">
                                                </td>
                                            </tr>
                                            <!-- Lista de sectores -->
                                            <tr v-for="(currentSector, index) in getSectores" :key="index" class="relative">
                                                <td v-if="currentSector.codPiso" class="border relative !w-fit p-0 text-xs h-fit bg-[rgb(228,197,158)] border-slate-200 whitespace-nowrap">
                                                    <button @click="toggleNewSectorDropdown(currentSector.id)" class="px-1 py-2 hover:rounded-md hover:bg-[rgba(0,0,0,0.2)]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                                                    <input type="text"
                                                        class="bg-transparent text-center outline-none border-none w-auto max-w-[70px]"
                                                        v-model="currentSector.desSector"
                                                        :style="{ width: `min(${currentSector.desSector.length + 2}ch, 9ch)` }">
                                                    <button v-if="sectorDropdownOpen == currentSector.id" @click="deleteSector(currentSector.id)" 
                                                        class="absolute right-0 -bottom-4 bg-white text-black rounded-md p-1 z-30"
                                                        ref="btnEliminar{{ currentSector.id }}">
                                                        <i class="fa-solid fa-trash"></i> Eliminar
                                                    </button>

                                                </td>
                                                <td v-else class="border max-w-[70px] !w-fit px-2 text-xs h-fit bg-slate-300 border-slate-200">
                                                    {{ currentSector.desSector }}
                                                </td>
                                                <td v-if="currentSector.codPiso" class="border w-40 text-sm h-fit break-words border-slate-200">
                                                    <textarea class="w-full h-full min-h-full min-w-full px-1 !max-w-[70px] text-center 
                                                        bg-transparent resize-none overflow-hidden break-words outline-none border-none"
                                                        :style="{ height: $refs['txt-' + index]?.scrollHeight + 'px' }"
                                                        v-model="currentSector.name" rows="2"/>
                                                </td>
                                                <td v-else class="border w-40 text-xs h-fit break-words border-slate-200">
                                                    {{ currentSector.name }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div class="flex flex-row flex-grow w-full max-w-[70%]">
                            <!-- Seccion de actividades x sectores -->
                            <div class="flex flex-grow flex-col border border-slate-200 rounded-md p-4 h-fit w-full
                                shadow-[4px_0_6px_#e2e8f0,0_2px_10px_#e2e8f0]">
                                <span v-if="!currentPiso" class="font-light text-sm"> Seleccione un piso para añadir la información</span>
                                <div v-if="currentPiso" class="flex flex-row w-full justify-between">
                                    <div class="flex gap-5 items-center">
                                        <h2 class="text-lg uppercase">{{ currentPiso.name }}</h2>
                                        <div class="cursor-pointer text-[15px]">
                                            <button class="">
                                                <i class="fa-solid fa-square-plus text-orange"></i>
                                            </button>
                                            <span class="ml-2 text-orange font-bold">Añadir Actividades</span>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div v-if="currentPiso && currentTableView == 2" class="flex-row justify-between text-xs font-light my-2">
                                                <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload" />
                                                <button class="px-3 bg-orange-500 rounded-sm text-white mr-3" @click="triggerFileInput">
                                                    Subir plano
                                                </button>
                                            </div>
                                        <label class="inline-flex items-center cursor-pointer">
                                            <span v-if="currentTableView == 2" class="mr-1 text-sm font-medium ">Ver pisos</span>
                                            <span v-else class="mr-1 text-sm font-medium ">Ver planos</span>
                                            <input type="checkbox" v-model="currentTableView" :true-value="1" :false-value="2" class="absolute -translate-x-1/2 peer appearance-none rounded-md" />
                                            <span class="w-12 h-6 flex items-center flex-shrink-0 ml-2 p-1 border border-black bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-black after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                                        </label>
                                    </div>
                                </div>
                                <div v-if="currentPiso && currentTableView == 1" class="flex-row justify-between text-xs font-light my-2">
                                    <!-- Los porcentajes salen en funcion al total de actividades y su estado -->
                                    <span>Avance al dia</span>
                                    <span class="py-1 px-3 border ml-2 border-slate-200 rounded-md">{{ getTodayDate }}</span>
                                    <span class="ml-4">Completo (C):</span>
                                    <span class="ml-2 text-green-500 font-bold"> {{ getPorcentajeCompleto }} </span>
                                    <span class="ml-4">Pendiente (P):</span>
                                    <span class="ml-2 text-gray-500 font-bold"> {{ getPorcentajePendiente }} </span>
                                    <span class="ml-4">En proceso (EN):</span>
                                    <span class="ml-2 text-orange font-bold"> {{ getPorcentajeEnProceso }} </span>
                                    <span class="ml-4">No aplica (EN):</span>
                                    <span class="ml-2 text-yellow-900 font-bold"> {{ getPorcentajeNoAplicable }} </span>
                                </div>

                                <div v-if="currentPiso && currentTableView == 2" class="flex-row justify-between text-xs font-light my-2">
                                    <div class="flex gap-2 flex-wrap max-w-[500px]">
                                        <span
                                            v-for="sector in sectoresPlanos.filter(s => !s.ubicado)"
                                            :key="sector.id"
                                            class="cursor-grab border-2 border-blue-800 bg-blue-200 px-1 w-[60px] text-center"
                                            draggable="true"
                                            @dragstart="dragStart(sector, $event)"
                                        >
                                            {{ sector.desSector }} - <span class="font-semibold">0%</span>
                                        </span>
                                    </div>
                                    <div
                                        v-if="imagePreview"
                                        class="relative border border-gray-300 mt-4 w-full h-[400px]"
                                        @dragover.prevent
                                        @drop="dropSector"
                                        >
                                        <img :src="imagePreview" alt="Vista previa del plano" class="w-full h-full" />

                                        <!-- Posicionar los sectores sobre el plano -->
                                        <div
                                            v-for="sector in sectoresPlanos.filter(s => s.ubicado)"
                                            :key="sector.id"
                                            class="absolute cursor-grab border-2 border-blue-800 bg-blue-200 text-xs px-1"
                                            v-show="sector.x !== null && sector.y !== null"
                                            :style="{ top: sector.y + 'px', left: sector.x + 'px' }"
                                            draggable="true"
                                            @dragstart="dragStart(sector, $event)"
                                        >
                                            {{ sector.desSector }} - <span class="font-semibold">0%</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- tabla de estados x actividades -->
                                <div v-if="currentPiso && currentTableView == 1" class="overflow-x-auto scrollbar-hidden max-h-[70vh]">
                                    <table class="text-sm border-collapse">
                                        <thead>
                                            <tr>
                                                <th class="border border-slate-200 bg-[rgb(246,246,246)] font-light px-4 py-2">Actividades</th>
                                                <th v-for="(currentSector, index) in getSectores" :key="index"
                                                    class="border border-slate-200 bg-slate-300 font-light px-4 py-2 min-w-[30px]"
                                                    :class="currentSector.codPiso ? 'bg-[rgb(228,197,158)]':''">
                                                    {{ currentSector.desSector }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(currentActividad, index) in actividades" :key="index">
                                                <td class="border border-slate-200 bg-[rgb(246,246,246)] 
                                                    h-fit break-words whitespace-normal text-xs font-light px-4 py-2 max-w-[160px]">{{ currentActividad.name }}</td>
                                                <td v-for="(currentSector, index) in getSectores" :key="index" 
                                                    class="border border-slate-200 relative p-0" 
                                                    @click="toggleDropdown('showActividadXSectorStatus', { codSector: currentSector.id, codActividad: currentActividad.id})">
                                                        <!-- Select personalizado -->
                                                        <div class="absolute inset-0 flex items-center justify-center cursor-pointer" 
                                                            :class="getEstadoBg(getEstadoActividadXSector(currentSector.id, currentActividad.id))">
                                                            {{ getEstadoAbrev(getEstadoActividadXSector(currentSector.id, currentActividad.id)) }}
                                                        </div>

                                                        <!-- Opciones -->
                                                        <ul v-if="dropdownsStatus.showActividadXSectorStatus.codSector == currentSector.id
                                                            && dropdownsStatus.showActividadXSectorStatus.codActividad == currentActividad.id" 
                                                            class="absolute w-fit bg-white border border-gray-300 shadow-lg z-30">
                                                            <li v-for="(estado, index) in estadosActividadXSector" :key="index"
                                                                @click="selectEstado(currentSector.id, currentActividad.id, estado.id)"
                                                                class="p-2 text-center cursor-pointer hover:bg-gray-200">
                                                                <span class="px-2 py-1 rounded" :class="getEstadoBg(estado.id)">
                                                                    {{ estado.abrev }}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </div>
                    </div>


                    <!-- Opciones de agregado de pisos y sectores -->
                    <div v-if="dropdownsStatus.showDropdownOpciones" class="absolute right-2 top-2 z-50 shadow-[4px_0_6px_#e2e8f0,0_2px_10px_#e2e8f0] border-2
                            border-slate-200 rounded-sm w-[35%] max-w-[40%] h-[95%] bg-white">
                        <div>
                            <h1 class="font-light text-lg py-2 px-4 flex flex-row flex-grow justify-between text-center">
                                <div>
                                    <i class="fa-solid fa-gear"></i>
                                    <span class="px-2">Opciones</span>
                                </div>
                                <i @click="toggleDropdown('showDropdownOpciones')" class="fa-solid fa-angle-right cursor-pointer p-1"></i>
                            </h1>
                        </div>
                        
                        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange"/>
                        <div class="p-4 flex flex-col flex-grow h-full max-h-[90%]">

                            <!-- Paso 1: Indicar Número de Pisos -->
                            <div class="relative flex flex-col flex-grow h-[50px]">
                                <div class="flex items-center space-x-2">
                                    <span class="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-700 text-sm font-semibold bg-white z-10">1</span>
                                    <span @click.stop="togglePasoOpciones(1)"  class="font-bold text-xs text-black ">Pisos</span>
                                    <i @click.stop="togglePasoOpciones(1)" class="fa-solid fa-play text-black cursor-pointer"
                                    :class="dropdownOpciones.showPaso1 ? 'rotate-90' : 'rotate-180'"></i>
                                </div>

                                <!-- Contenido para agregar sectores -->
                                <div v-if="dropdownOpciones.showPaso1"  class="ml-8 mt-2 max-w-md flex flex-col flex-grow">
                                    <!-- Campo Número de Sectores -->
                                    <div class="flex justify-between text-xxs">
                                        <label for="numPisos" class="text-gray-700">Número de Pisos</label>
                                        <input type="number" id="numPisos" v-model="numPisos" min="1" step="1" 
                                            class="border border-gray-300 rounded-md text-center w-12 h-fit focus:border-black">
                                    </div>
                                </div>
                            </div>


                              <!-- Paso 2: Manejador de sectores -->
                              <div class="relative flex flex-col flex-grow pb-5">
                                <div class="flex items-center space-x-2">
                                    <span class="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-700 text-sm font-semibold bg-white z-10">2</span>
                                    <span @click.stop="togglePasoOpciones(2)" class="font-bold text-xs text-black ">Manejador de sectores global</span>
                                    <i @click.stop="togglePasoOpciones(2)" class="fa-solid fa-play text-black cursor-pointer"
                                        :class="dropdownOpciones.showPaso2 ? 'rotate-90' : 'rotate-180'"></i>
                                </div>

                                <!-- Contenido para agregar sectores -->
                                <div v-if="dropdownOpciones.showPaso2" class="ml-8 mt-2 max-w-md flex flex-col flex-grow">
                                    <!-- Campo Número de Sectores -->
                                    <div class="flex justify-between text-xxs">
                                        <label for="numSectores" class="text-gray-700">Número de sectores</label>
                                        <input type="number" id="numSectores" v-model="numSectores" min="1" step="1" 
                                            class="border border-gray-300 rounded-md text-center w-12 h-fit focus:border-black">
                                    </div>

                                    <!-- Campo Nombre de Sectores -->
                                    <div class="text-xxs h-full max-h-[90%]">
                                        <label for="nombreSectores" class="block text-gray-700">Nombre de sectores</label>
                                        <textarea id="nombreSectores" v-model="nombreSectores"
                                            class="border border-gray-300 rounded-md w-full p-2 resize-none h-full min-h-[30%] max-h-[80%]
                                            scrollbar-hidden"
                                            placeholder="Nombre de sectores"></textarea>
                                        <p class="text-xxsmall text-gray-500 mt-1">* Añadir los nombres en orden</p>
                                    </div>
                                </div>

                                
                                <!-- Paso final - Boton de guardado -->
                                <div class="flex justify-end mt-auto">
                                    <button @click="saveActividades()" class="bg-orange-500 text-white text-xs border border-orange rounded-md px-6 h-fit ">Guardar</button>
                                </div>
                            </div>
                            <!-- Paso 3: Actividades -->
                            <div class="relative">
                                <div class="flex items-center space-x-2">
                                    <span class="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-700 text-sm font-semibold bg-white z-10">3</span>
                                    <span @click.stop="togglePasoOpciones(3)" class="font-bold text-xs text-black cursor-pointer">Actividades</span>
                                    <i @click.stop="togglePasoOpciones(3)" class="fa-solid fa-play text-black cursor-pointer"
                                        :class="dropdownOpciones.showPaso3 ? 'rotate-90' : 'rotate-180'"></i>
                                </div>
                                <div v-if="dropdownOpciones.showPaso3">
                                    <p class="text-xs text-gray-500 ml-8">Subir lista de actividades para todos los pisos.</p>

                                    <!-- Subida de archivos -->
                                    <div class="border-2 border-dashed border-gray-300 bg-gray-100 text-gray-500 
                                        text-xs py-8 px-2 max-w-[80%] text-center rounded-md cursor-pointer mt-2 mx-auto">
                                        <span class="text-blue-600">Arrastre o <span @click="selectFile()" class="underline">seleccione los archivos</span></span>
                                    </div>
                                    <div v-if="file" class="my-3 px-4 ml-4">
                                        <div class="flex items-center justify-between rounded-md">
                                            <div class="flex items-center gap-2">
                                                <i class="fa-solid fa-file text-gray-600"></i>
                                                <span class="text-xxs font-light" :class="fileHasError ? 'text-red-500' : ''"> {{ fileName }}</span>
                                            </div>
                                        </div>
                                        <ProgressBar class="pl-3 !w-11/12 h-2 border border-transparent rounded-sm"
                                            v-if="!successFileProcess"
                                            :progress="uploadProgress" :progressColor="progressColor"/>
                                        <!-- Botones de carga -->
                                        <div class="block mt-1 w-11/12 " v-if="successFileUpload && !successFileProcess">
                                            <div class=" flex gap-1 justify-end text-xxs">
                                                <button @click="deleteFile()"
                                                    class="text-orange400 border rounded-sm px-4
                                                        border-orange400">
                                                    <span >Limpiar</span>
                                                </button>
                                                <button @click="uploadDocument()"
                                                    class="text-white border rounded-sm px-4"
                                                    :class="fileHasError == true ?
                                                        'bg-slate-400 border-slate-400 cursor-not-allowed'
                                                        :'border-orange bg-orange-500 cursor-pointer'"
                                                    :disabled="fileHasError">
                                                    <span>Subir Plantilla</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div v-if="successFileProcess">
                                            <span class="text-xs text-green-500 font-light">Archivo subido correctamente</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Línea punteada -->
                                <!-- <div class="absolute left-3 top-6 bottom-[-40px] w-0.5 border-l-2 border-dotted border-gray-400"></div> -->
                            </div>

                          

                        </div>
                    </div>

                </td>

                <!-- Seccion de resumen -->
                <td v-else colspan="3" class="w-full border h-full max-h-full border-[#002B6B] align-top px-1">
                    <div class="flex flex-row w-full font-light text-sm h-auto px-4 py-2">
                        <span>Fecha: {{ getTodayDate2 }}</span>
                        <span class="ml-5"><i class="fa-solid fa-square text-green-500"></i> Completo</span>
                        <span class="ml-5"><i class="fa-solid fa-square text-orange400"></i> En progreso</span>
                        <span class="ml-5"><i class="fa-solid fa-square text-gray-500"></i> Pendiente</span>
                    </div>
                    <div class="flex flex-row h-[90%] max-h-[90%] overflow-auto scrollbar-hidden ml-2">
                        <table class="border-collapse text-sm table-fixed">
                            <thead class="bg-slate-200 sticky top-0 z-10">
                                <tr class="bg-slate-200">
                                    <th class="!min-w-[320px]">ACTIVIDAD</th>
                                    <th v-for="(piso, index) in pisos" :key="index"
                                        class="border !border-slate-200 bg-slate-300 font-light px-4 py-1 min-w-[30px] text-xs">
                                        {{ piso.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(actividad, index) in actividades" :key="index">
                                    <td class="border border-slate-200 bg-[rgb(246,246,246)] 
                                        h-fit break-words whitespace-normal text-xs font-light px-4 py-2 max-w-[160px]">
                                        {{ actividad.name }}
                                    </td>
                                    <td v-for="(piso, index) in pisos" :key="index" class="border border-slate-200"
                                        :class="getBgResumenActividadXPiso(piso.id, actividad.id)">
                                        <div class="h-full w-full text-center"> {{ getResumenActividadXPiso() }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>

            </tr>

        </tbody>
    </table>
</template>
<script>

import ProgressBar from './ProgressBar.vue';

export default {
    name: "fase-tres",
    components: {
        ProgressBar
    },

    data: () => ({
        nameProyecto: "",
        section: {
            currentSection: "pisos",
            borderClass: "",
        },
        currentPiso: null,
        numPisos: null, 
        pisos: [
        ],
        //pisos: [],
        actividades: [
            { id: 1, name: "Winchado de tuberias"},
            { id: 2, name: "PICOTEO Y COLOCACION DE PUNTOS EN LOSA"},
            { id: 3, name: "TARRAJEO DE TECHO"},
            { id: 4, name: "TARRAJEO DE VERTICALES Y DERRAMES"},
            { id: 5, name: "TRAZOS PARA ALBAÑILERIA INTERIOR"},
            { id: 6, name: "LEVANTAMIENTO DE PUNTOS ELECTRICOS"},
            { id: 7, name: "TUBERIAS COLGADAS IISS (DESAGUE Y AGUA))"},
            { id: 8, name: "ANCLAJE DE REFUERZOS PARA ALBAÑILERIA INTERIOR"},
            { id: 9, name: "ASENTADO DE ALBAÑILERIA INTERIOR"},
            { id: 10, name: "FIJACION DE PUNTOS SANITARIOS"},
            { id: 11, name: "FIJACION DE PUNTOS SANITARIOS(MEZCLADORAS)"},
            { id: 12, name: "INSTALACION DE DUCTOS MECANICOS"},
            { id: 13, name: "REMATES DE ASENTADO DE ALBAÑILERIA"},
            { id: 14, name: "SELLO CORTAFUEGO EN TABIQUERIA"},
            { id: 15, name: "DRYWALL (1ER PERFILERIA+ 1ERA CARA)"},
        ],
        sectores: [
            { id: 1, name: "Habitacion doble", desSector: "1" ,estado: 1, openDropdown: false, codPiso: null, },
            { id: 2, name: "Habitacion simple", desSector: "2", openDropdown: false, codPiso: null, },
            { id: 3, name: "Habitacion doble", desSector: "3", openDropdown: false, codPiso: null, },
            { id: 4, name: "Habitacion doble", desSector: "4", openDropdown: false, codPiso: null, },
            { id: 5, name: "Habitacion discapacitado", desSector: "5", openDropdown: false, codPiso: null, },
            { id: 6, name: "Habitacion simple", desSector: "6", openDropdown: false, codPiso: null, },
            { id: 7, name: "Habitacion simple", desSector: "7", openDropdown: false, codPiso: null, },
            { id: 8, name: "Habitacion simple", desSector: "8", openDropdown: false, codPiso: null, },
            { id: 9, name: "Habitacion simple", desSector: "9", openDropdown: false, codPiso: null, },
            { id: 10, name: "Habitacion simple", desSector: "10", openDropdown: false, codPiso: null, },
            { id: 11, name: "Habitacion simple", desSector: "11", openDropdown: false, codPiso: null, },
            { id: 12, name: "Habitacion simple", desSector: "12", openDropdown: false, codPiso: null, },
            { id: 13, name: "Habitacion doble", desSector: "13", openDropdown: false, codPiso: null, },
            { id: 14, name: "Habitacion familiar", desSector: "14", openDropdown: false, codPiso: null, },
            { id: 15, name: "Habitacion familiar", desSector: "PASADIZO", openDropdown: false, codPiso: 1, },
            { id: 16, name: "Habitacion familiar", desSector: "PASADIZO", openDropdown: false, codPiso: 1, },
            { id: 17, name: "Habitacion discapacitado", desSector: 102, openDropdown: false, codPiso: 2, },
        ],
        currentTableView: 1, // 1 = ver pisos, 2 = ver planos 
        addingNewSector: false,
        newSector: {
            id: null,
            name: null,
            desSector: null,
            openDropdown: false,
            codPiso: true,
        },
        timers: {
            timerNewSector: null,
        },
        dropdownsStatus: {
            showSectorOptions: false,
            showActividadXSectorStatus: { codActividad: null, codSector: null },
            showDropdownOpciones: false, 
        },
        sectorDropdownOpen: null,
        estadosActividadXSector: [
            { id: 1, name: "Completo", abrev: "C", bgColor: "bg-green-500"},
            { id: 2, name: "Pendiente", abrev: "P", bgColor: "bg-gray-500"},
            { id: 3, name: "En proceso", abrev: "EN", bgColor: "bg-orange-500"},
            { id: 4, name: "No aplicable", abrev: "NA", bgColor: "bg-yellow-900"},
        ],
        dropdownOpciones: {
            showPaso1: true,
            showPaso2: true,
            showPaso3: true,
        },
        file: null,
        fileName: '',
        isDragging: false,
        downloadedTemplate: false, //def false
        fileHasError: false, // def false
        successFileUpload: false, //def false
        uploadProgress: 0, //def 0
        progressColor: "rgb(0 43 107)",//'red',
        errorLogs: '',
        successFileProcess: false,
        selectedFilePlanos: null,
        imagePreview: null,
        sectoresPlanos: [
            { id: 1, name: "Habitacion doble", desSector: "1" ,estado: 1, openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 2, name: "Habitacion simple", desSector: "2", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false  },
            { id: 3, name: "Habitacion doble", desSector: "3", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 4, name: "Habitacion doble", desSector: "4", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 5, name: "Habitacion discapacitado", desSector: "5", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 6, name: "Habitacion simple", desSector: "6", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 7, name: "Habitacion simple", desSector: "7", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 8, name: "Habitacion simple", desSector: "8", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 9, name: "Habitacion simple", desSector: "9", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 10, name: "Habitacion simple", desSector: "10", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 11, name: "Habitacion simple", desSector: "11", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 12, name: "Habitacion simple", desSector: "12", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 13, name: "Habitacion doble", desSector: "13", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
            { id: 14, name: "Habitacion familiar", desSector: "14", openDropdown: false, codPiso: null, x: null, y: null, ubicado: false },
        ],
        draggedSector: null,
    }),
    computed: {
        getCurrentProject(){
            return sessionStorage.getItem("constraintNameProy");
        },
        getSectores(){
            let sectores = this.sectores.filter(sector => sector.codPiso == this.currentPiso.id || sector.codPiso == null);
            //let sectoresGlobal = this.sectores;
            //let sectoresXpisos = this.pisos.find(piso => piso.id == this.currentPiso.id).sectores;
            //let sectores = [...sectoresGlobal, ...sectoresXpisos];
            return sectores;
        },
        getTodayDate(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}.${month}.${year}`
        },
        getTodayDate2(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}/${month}/${year}`
        },
        getPorcentajeCompleto(){
            let percent = 54;
            let total = 587;
            return percent + '% - ' + total;
        },
        getPorcentajePendiente(){
            let percent = 53;
            let total = 57;
            return percent + '% - ' + total;
        },
        getPorcentajeEnProceso(){
            let percent = 1;
            let total = 9;
            return percent + '% - ' + total;
        },
        getPorcentajeNoAplicable(){
            let percent = 10;
            let total = 111;
            return percent + '% - ' + total;
        },
        getActividadesPisoActual(){
            return this.pisos.find(piso => piso.id == this.currentPiso.id).actividades || [];
        },
    },
    methods: {
        togglePasoOpciones(paso){
            switch (paso) {
                case 1:
                    this.dropdownOpciones.showPaso1 = !this.dropdownOpciones.showPaso1;
                    break;
                case 2:
                this.dropdownOpciones.showPaso2 = !this.dropdownOpciones.showPaso2;
                    break;
                case 3:
                    this.dropdownOpciones.showPaso3 = !this.dropdownOpciones.showPaso3;
                    break;
            }
        },
        selectFile(){
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                const validMimeTypes = [
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                    "application/vnd.ms-excel" // .xls
                ];
                if (!validMimeTypes.includes(selectedFile.type)) {
                    toast.error("Solo se permiten archivos Excel (.xlsx, .xls)", {
                        autoClose: 2500,
                    });
                    this.$refs.fileInput.value = ""; // Resetear input de archivo
                    return;
                }
                this.file = selectedFile;
                this.fileName = selectedFile.name;
                this.isDragging = false;
                this.fileHasError = false;
                this.successFileUpload = true;
                this.progressColor = 'rgb(0 43 107)';
                this.uploadProgress = 0;
                //this.errorLogs = '';
                this.simulateProgress();
            }
        },
        simulateProgress() {
            this.uploadProgress = 0;
            let progressInterval = setInterval(() => {
                if (this.uploadProgress < 100) {
                this.uploadProgress += 10;
                } else {
                clearInterval(progressInterval);
                }
            }, 100);
        },
        deleteFile(){
            this.file = null;
            this.fileName = '';
            this.fileHasError = false;
            this.successFileUpload = false;
            this.uploadProgress = 0;
            this.errorLogs = '';
            this.progressColor = 'rgb(0 43 107)';
        },
        uploadDocument(){
            this.actividades = [
                { id: 1, name: "Winchado de tuberias"},
                { id: 2, name: "PICOTEO Y COLOCACION DE PUNTOS EN LOSA"},
                { id: 3, name: "TARRAJEO DE TECHO"},
                { id: 4, name: "TARRAJEO DE VERTICALES Y DERRAMES"},
                { id: 5, name: "TRAZOS PARA ALBAÑILERIA INTERIOR"},
                { id: 6, name: "LEVANTAMIENTO DE PUNTOS ELECTRICOS"},
                { id: 7, name: "TUBERIAS COLGADAS IISS (DESAGUE Y AGUA))"},
                { id: 8, name: "ANCLAJE DE REFUERZOS PARA ALBAÑILERIA INTERIOR"},
                { id: 9, name: "ASENTADO DE ALBAÑILERIA INTERIOR"},
                { id: 10, name: "FIJACION DE PUNTOS SANITARIOS"},
                { id: 11, name: "FIJACION DE PUNTOS SANITARIOS(MEZCLADORAS)"},
                { id: 12, name: "INSTALACION DE DUCTOS MECANICOS"},
                { id: 13, name: "REMATES DE ASENTADO DE ALBAÑILERIA"},
                { id: 14, name: "SELLO CORTAFUEGO EN TABIQUERIA"},
                { id: 15, name: "DRYWALL (1ER PERFILERIA+ 1ERA CARA)"},
            ];
            this.successFileProcess = true;
        },
        handleInputNewSector() {
            clearTimeout(this.timers.timerNewSector);
            this.timers.timerNewSector = setTimeout(() => {
                this.addNewSector();
            }, 5000);
        },
        addNewSector(){
            let sector = {...this.newSector};
            sector.codPiso = this.currentPiso.id;
            sector.id = this.sectores.length + 1;
            this.sectores.push(sector);
            this.disableNewSectorRow();
        },
        deleteSector(codSector){
            this.sectores = this.sectores.filter(sector => sector.id !== codSector);
        },

        changeSection(section){
            this.section.currentSection = section
        },
        changePiso(piso){
            if (this.currentPiso == null) {
                this.currentPiso = piso;
                return;
            } else if (this.currentPiso.id == piso.id){
                this.currentPiso = null;
                return;
            }
            this.currentPiso = piso;
        },
        enableNewSectorRow(){
            this.addingNewSector = true;
            this.$nextTick(() => {
                if (this.$refs.containerSectores) {
                    this.$refs.containerSectores.scrollTop = 0; // Mueve el scroll del div específico al inicio
                }
            });
        },
        disableNewSectorRow(){
            this.addingNewSector = false;
            this.newSector = {
            id: null,
            name: null,
            desSector: null,
            openDropdown: false,
            codPiso: true,
            };
        },
        getEstadoBg(estadoId) {
            const estado = this.estadosActividadXSector.find(e => e.id === estadoId);
            return estado ? estado.bgColor : "bg-white";
        },
        getEstadoActividadXSector(codSector, codActividad){
            const actividadXSector = this.pisos.find(piso => piso.id == this.currentPiso.id).actividadesXSectores.find(
                sxa => sxa.codSector == codSector && sxa.codActividad == codActividad);
            return actividadXSector ? actividadXSector.codEstado : null;
        },
        toggleDropdown(dropdownName, value) {
            if (dropdownName == "showActividadXSectorStatus") { 
                if (this.dropdownsStatus.showActividadXSectorStatus.codSector == value.codSector 
                    && this.dropdownsStatus.showActividadXSectorStatus.codActividad == value.codActividad){
                    this.dropdownsStatus.showActividadXSectorStatus.codSector = null;
                    this.dropdownsStatus.showActividadXSectorStatus.codActividad = null;
                    return;
                }
                this.dropdownsStatus[dropdownName] = value;
                return;
            } 

            if (this.dropdownsStatus[dropdownName] == value) {
                this.dropdownsStatus[dropdownName] = null;
                return;
            }
            
            this.dropdownsStatus[dropdownName] = value;
        },
        selectEstado(codSector, codActividad , estadoId) {
            let sxa = this.pisos.find(piso => piso.id == this.currentPiso.id).actividadesXSectores.find(
                sxa => sxa.codSector == codSector && sxa.codActividad == codActividad
            );
            if (sxa) {
                sxa.codEstado = estadoId;
                return;
            } else {
                this.pisos.find(piso => piso.id == this.currentPiso.id).actividadesXSectores.push({
                    id: this.pisos.find(piso => piso.id == this.currentPiso.id).actividadesXSectores.length + 1,
                    codSector: codSector,
                    codActividad: codActividad,
                    codEstado: estadoId,
                });
            }
            sector.estado = estadoId;
            sector.openDropdown = false;
        },
        getEstadoAbrev(estadoId) {
            const estado = this.estadosActividadXSector.find(e => e.id === estadoId);
            return estado ? estado.abrev : "";
        },
        adjustTextareaWidth(event) {
            event.target.style.width = "auto";  
            let newWidth = event.target.scrollWidth;
            event.target.style.width = newWidth > 70 ? "70px" : newWidth + "px"; 
        },
        toggleNewSectorDropdown(idSector) {
            if (this.sectorDropdownOpen == idSector) {
                this.sectorDropdownOpen = null;
            } else {
                this.sectorDropdownOpen = idSector;
            }
        },
        getResumenActividadXPiso(){
            return 99+'%';
        },
        getBgResumenActividadXPiso(){
            return 'bg-green-500';
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFilePlanos = file;
                this.imagePreview = URL.createObjectURL(file);
                console.log("Archivo seleccionado:", file);
            }
        },
        dragStart(sector, event) {
            this.draggedSector = sector;
        },

        // Suelta el sector y guarda su posición
        dropSector(event) {
            if (!this.draggedSector) return;

            // Obtener posición relativa dentro de la imagen
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Actualizar la posición y marcarlo como ubicado
            this.draggedSector.x = x;
            this.draggedSector.y = y;
            this.draggedSector.ubicado = true;

            // Resetear la variable de arrastre
            this.draggedSector = null;
        }
    },
    watch: {
    numPisos(newVal) {
        const total = Number(newVal);
        if (Number.isInteger(total) && total > 0) {
        this.pisos = Array.from({ length: total }, (_, i) => ({
            id: i + 1,
            name: `Piso ${i + 1}`,
            sectores: [],
            actividadesXSectores: []
        }));
        } else {
        this.pisos = [];
        }
    }
}
};
</script>
<style>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

.hidden {
  display: none;
}
</style>