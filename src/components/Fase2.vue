<template>
    <div>
        <div class="flex gap-2 justify-between">
            <div>
                <button 
                    class="px-4 py-2 font-bold border-2 border-b-white border-[#002B6B] text-[#002B6B] rounded-tl-lg text-sm">
                    Manejador Gráfico
                </button>
            </div>
        </div>
        <div class="w-full border-2 relative border-[#002B6B] overflow-hidden">
        
            <div class="w-[95%] max-w-full mx-auto py-2">
                <div class="w-full flex justify-center font-normal text-xs gap-3">
                    <div v-for="(estado, index) in estados" :key="index" class="flex gap-1 items-center">
                        <p class="w-[15px] h-[15px]" :class="estado.color"></p>
                        <p class="pt-[1px]">{{ estado.nombre }}</p>
                    </div>
                </div>
            </div>
            
            <div class="absolute top-3 left-2 z-10 flex flex-col gap-2">
                <!-- Seleccion de Forma de Figuras -->
                <div class="dropdownStyle whitespace-nowrap bg-white w-[180px] h-[40px] text-xs font-normal flex items-center justify-between px-2"
                @click="toggleSection('isShapeExpanded')">
                    <p>
                        Insertar Actividades
                    </p>
                    <p>
                    <i class="fa-solid fa-caret-right text-sm"></i>
                    </p>
                </div>
                <div v-if="isShapeExpanded">
                    <div class="flex flex-col p-1 gap-2 bg-white border border-gray-200 rounded-md shadow-lg text-xs relative">
                        <div class="p-1 flex gap-1 items-center">
                            <i v-if="isUniform" class="fa-solid fa-city"  @click="toggleUniform()"></i>
                            <i v-else class="fa-solid fa-building"  @click="toggleUniform()"></i>
                            <p>Pisos Uniformes</p>
                            <input v-if="!isUniform" v-model="numberUniform" type="text" class="w-[40px] border rounded-md px-2 border-gray-400">
                        </div>
                    </div>
                </div>
                <div v-if="isShapeExpanded">
                    <div class="flex flex-col p-1 gap-2 bg-white border border-gray-200 rounded-md shadow-lg text-xs">
                        <h2 class="p-1 text-xs">Insertar Actividades</h2>
                        <input v-model="newActivity.nombre" class="text-center border border-gray-200 rounded-md" type="text" placeholder="Actividad">
                        <div class="pb-[1px] flex flex-col gap-1">
                            <span class="flex justify-between">
                                <p class="font-normal">Pisos</p>
                                <input
                                v-model.number="newActivity.pisos"
                                :disabled="numberUniform !== null && numberUniform !== 0"
                                class="w-20 appearance-auto border border-gray-200 rounded-md text-center"
                                type="number"
                                placeholder="Pisos"
                                />                  
                            </span>
                            <span class="flex justify-between">
                                <p class="font-normal">Sectores</p>
                                <input v-model.number="newActivity.sectores" class="w-20 appearance-auto border border-gray-200 rounded-md text-center" placeholder="Sectores" type="number" name="" id="">
                            </span>
                        </div>
                        <div class="flex justify-end gap-2">
                            <button @click="resetForm" class="text-orange border border-orange rounded-md py-[0.5px] px-1">Cancelar</button>
                            <button @click="addActivity" class="text-white border border-orange bg-orange-500 rounded-md py-[0.5px] px-3">Crear</button>
                        </div>
                    </div>
                </div>
            
                <!-- Orden de las Secciones -->
                <!-- <div @click="toggleSection('isCellOptions')" class="dropdownStyle whitespace-nowrap bg-white w-[180px] h-[40px] text-xs font-normal flex items-center justify-between px-2">
                    <p>
                        Opciones de Celda
                    </p>
                    <p>
                        <i class="fa-solid fa-caret-right text-sm"></i>
                    </p>
                </div>
                <div v-if="isCellOptions">
                    <div class="flex flex-col p-1 gap-2 bg-white border border-gray-200 rounded-md shadow-lg text-xs w-[180px]">
                        <div class="relative">
                            <div class="flex justify-between items-center">
                                <p class="font-normal">Actividades</p>
                                <button @click.stop="toggleSection('isActivityMenu')" 
                                class="text-gray-400 text-center border border-gray-300 rounded-md w-[100px]">
                                    {{ selectedActivity ? selectedActivity.nombre : 'Actividades' }}
                                </button>
                            </div>
                            <div v-if="isActivityMenu" class="absolute left-[180px] top-0 bg-white border border-gray-200 rounded-md shadow-lg text-xs w-[80px]">
                                <button v-for="(activity, index) in activities" 
                                        :key="'activity-' + index"
                                        @click="selectActivity(activity)"
                                        class="block w-full px-2 py-1 hover:bg-gray-100">
                                    {{ activity.nombre }}
                                </button>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <p class="font-normal">Desde</p>
                            <input v-model="celdaDesde" 
                                @input="formatearInput('celdaDesde', $event)" 
                                class="text-center border border-gray-200 rounded-md w-[100px]" 
                                type="text" placeholder="(1, 1)">
                        </div>
                        <div class="flex justify-between">
                            <p class="font-normal">Hasta</p>
                            <input v-model="celdaHasta" 
                                @input="formatearInput('celdaHasta', $event)" 
                                class="text-center border border-gray-200 rounded-md w-[100px]" 
                                type="text" placeholder="(1, 1)">
                        </div>
                        <div class="relative">
                            <div class="flex justify-between">
                                <p class="font-normal">Opcion</p>
                                <button @click.stop="toggleSection('isOptionMenu')" 
                                    class="text-gray-400 text-center border border-gray-300 rounded-md w-[100px]">
                                        {{ selectedOption ? selectedOption.nombre : 'Opcion' }}
                                </button>
                                <div v-if="isOptionMenu" class="absolute left-[180px] top-0 bg-white border border-gray-200 rounded-md shadow-lg text-xs w-[240px]">
                                    <button v-for="(estado, index) in estados" :key="index"
                                        @click="selectOption(estado)"
                                        class="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100">
                                        <span>{{ estado.nombre }}</span>
                                        <span class="w-[10px] h-[10px] rounded-full" :class="estado.color"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end gap-2">
                            <button class="text-orange border border-orange rounded-md py-[0.5px] px-1">Cancelar</button>
                            <button @click="pintarCeldas()" class="text-white border border-orange bg-orange-500 rounded-md py-[0.5px] px-3">Guardar</button>
                        </div>
                    </div>
                </div> -->
            
                <div v-if="isShapeExpanded">
                    <div class="flex flex-col p-1 gap-2 bg-white border border-gray-200 rounded-md shadow-lg text-xs relative">
                    <h2 class="p-1">Actividades</h2>

                    <div
                        v-for="(activity, index) in visibleActivities"
                        :key="index"
                        class="pb-1"
                    >
                        <input
                        type="text"
                        v-model="activity.nombre"
                        class="text-center font-normal rounded-md border border-gray-200 w-full focus:border-gray-400"
                        />
                        <div class="flex flex-col gap-1 pt-2">
                        <span class="flex justify-between">
                            <p class="font-normal">Pisos</p>
                            <input
                            v-model.number="activity.pisos"
                            type="number"
                            class="w-16 appearance-auto border border-gray-200 rounded-md text-center focus:border-gray-400"
                            />
                        </span>
                        <span class="flex justify-between">
                            <p class="font-normal">Sectores</p>
                            <input
                            v-model.number="activity.sectores"
                            type="number"
                            class="w-16 appearance-auto border border-gray-200 rounded-md text-center focus:border-gray-400"
                            />
                        </span>
                        </div>
                    </div>

                    <div class="w-full flex justify-end">
                        <button
                        v-if="activities.length > 4"
                        @click="handleClickActividades()"
                        class="w-[60px] text-[11px]  text-white bg-orange-500 p-1 rounded-sm"
                    >
                        Ver Más
                    </button>
                    </div>
                    </div>
                </div>
                
            </div>
            
            <!-- Contenedor de la tabla-->
            <div  class="w-[95%] mx-0 mt-5 overflow-auto scrollbar-y-hidden">
                <div ref="table" class="pt-2 pb-10 px-10 min-h-[700px] relative w-full flex items-end gap-10"
                    :style="{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', maxWidth: '100%' }">
                    <template v-if="activities.length > 0">
                        <div v-for="(activity, index) in getFilteredActivities" :key="'activity-' + index" class="w-full flex flex-col">
                        <div class="flex">
                            <!-- Columna de numeración de Pisos -->
                            <div class="flex flex-col justify-end mr-2 relative">
                                <span class="text-sm font-normal -rotate-90 writing-mode-vertical-lr absolute -left-8 bottom-3">PISOS</span>
                                <div v-for="piso in [...Array(activity.pisos).keys()].map(n => n + 1).reverse()"
                                    :key="'piso-' + piso"
                                    class="h-[30px] flex items-center justify-center font-normal text-gray-700 text-sm z-90">
                                    {{ piso }}
                                </div>
                            </div>

                            <!-- Tabla principal -->
                            <div  class="border border-gray-400" ref="tablaActividades">
                                <table class="border-collapse">
                                    <thead>
                                        <tr>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="piso in [...Array(activity.pisos).keys()].map(n => n + 1).reverse()" 
                                            :key="'piso-' + piso">
                                            <td v-for="sector in activity.sectores" 
                                                :key="'sector-' + sector + '-piso-' + piso"
                                                class="border border-gray-400 w-[30px] h-[30px] cursor-pointer"
                                                :class="[getCellColor(index, piso, sector),
                                                    (selectionActivity == activity.nombre && selectedCells.includes(`${piso}-${sector}`)) ? '!bg-blue-300' : '' ]"
                                                @contextmenu.prevent="openColorMenu($event, index, piso, sector)"
                                                @mousedown="startSelection($event, piso, sector, activity.nombre)"
                                                @mousemove="updateSelection(piso, sector)"
                                                @mouseup="endSelection(); openColorMenu($event, index, piso, sector)">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Fila de numeración de Sectores -->
                        <div class="flex mt-2">
                            <div>
                                <div class="flex relative">
                                    <div v-for="sector in activity.sectores" :key="'sector-' + sector"
                                        class="w-[32px] flex items-center justify-center font-normal text-sm text-gray-700">
                                        {{ sector }}
                                    </div>
                                    <span class="text-sm font-normal absolute -bottom-6">SECTORES</span>
                                </div>
                            </div>
                        </div> 
                        <div class="relative mb-2">
                            <div class="text-center w-fit z-90 absolute -bottom-12 uppercase font-bold text-sm">
                                <span>{{ activity.nombre }}</span>
                            </div>
                        </div>
                        </div>
                    </template>
                    <template v-else>
                    <p class="text-gray-500 text-sm">No hay actividades creadas aún.</p>
                    </template>
                    <div v-if="showColorMenu" 
                        class="popupEstados absolute bg-white shadow-lg border rounded-md p-2 opacity-0 transition-opacity"
                        :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }">
                        <div class="flex flex-col items-center justify-center gap-1">
                            <div v-for="estado in flagsColor" :key="estado.bgColor"
                                class="relative flex items-center group">
                                <span class="fa-solid fa-flag cursor-pointer"
                                    :class="estado.textColor"
                                    @click="setCellColor(estado.bgColor)">
                        </span>
                                <div class="absolute left-full ml-4 text-xs font-light !w-fit whitespace-nowrap border border-slate-200 bg-white
                                    rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {{ estado.nombre }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            
        
        </div>

       <div  v-if="isActividadesOpen"  class="w-[400px] bg-white border-l border-gray-200 transition-all duration-300 ml-4 fixed right-0 top-12 h-full pt-5 px-4 z-20">
        <SideBarActividades @cerrar-panel="isActividadesOpen = false" :activities = "activities"
         />
        </div>
    </div>
    <div class="mb-2 flex items-center gap-2">
        <label for="zoomControl">Zoom:</label>
        <input
          id="zoomControl"
          type="range"
          min="50"
          max="200"
          v-model="zoomLevel"
          class="w-40"
        />
        <span>{{ zoomLevel }}%</span>
      </div>
</template>
     
<script>
import SideBarActividades from "./SideBarActividades.vue";
     export default {
       name: "fase-dos",
       components: {
            SideBarActividades
        },
       data() {
         return {
            isShapeExpanded: false,
            showAllActivities: false,
            isCellOptions: false,
            isActivityMenu: false,
            isOptionMenu: false,
            isDocumentosOpen : false,
            isUniform: false,
            numberUniform: null,
            selectedShape: "vertical",
            isActividadesOpen: false,
            shapes: [
                { label: "Rectángulo Vertical", value: "vertical" },
                { label: "Rectángulo Horizontal", value: "horizontal" },
                { label: "Cuadrado", value: "square" }
            ],
            isInsertExpanded: false,
            isActivityExpanded: false,
            newActivity: {
                nombre: '',
                pisos: null,
                sectores: null
            },
            activities: [],
            selectedCell: null, 
            cellColors: {}, 
            showColorMenu: false,
            menuPosition: { x: 0, y: 0 },
            colors: [
                { name: "Rojo", value: "#ff5e5e" },
                { name: "Verde", value: "#5eff7b" },
                { name: "Azul", value: "#5e96ff" }
            ],
            estados: [
                { "nombre": "Ejecutado histórico", "color": "bg-blue-700" },
                { "nombre": "Programado para la próxima semana", "color": "bg-gray-400" },
                { "nombre": "Ejecutado la semana anterior", "color": "bg-purple-700" },
                { "nombre": "Ejecutado", "color": "bg-orange-500" },
                { "nombre": "Aprobado por calidad", "color": "bg-[#85D254]" }
            ],
            selectedActivity: null,
            selectedOption: null,
            celdaDesde: '',
            celdaHasta: '',
            coloredCells: {},
            flagsColor: [
                { bgColor: "bg-blue-700", textColor: "text-blue-700", nombre: "Ejecutado histórico"},
                { bgColor: "bg-gray-400", textColor: "text-gray-400", nombre: "Programado para la próxima semana"},
                { bgColor: "bg-purple-700", textColor: "text-purple-700", nombre: "Ejecutado la semana anterior"},
                { bgColor: "bg-orange-500", textColor: "text-orange", nombre: "Ejecutado"},
                { bgColor: "bg-[#85D254]", textColor: "text-[#85D254]", nombre: "Aprobado por calidad"}
            ],
            dropdownStates: {
                showDropdownFiltros: false,
            },
            filterModel: {
                visible: false,
                showTiposFiltro: false,
                showValorFiltro: false,
                desFiltro: null,
                tipoFiltro: null,
                filtrosBasicos: [],
                valorFiltro: {
                    valor: null,
                    id: null,
                },
                estadoFiltro:{
                    id: null,
                    descripcion: null,
                    color: null,
                    borderClass: null
                },
                fechaFiltro: {
                    tipoFecha: null,
                    subtipoFecha: null,
                    tipoFiltroFecha: null,
                    basicFilter: [],
                    date: '',
                    startDate: '',
                    endDate: '',
                    month: '',
                    valorEstatico: null,
                },
            },
            //Filtros aplicados temporalmente
            filtros: {
                estado: null,
                actividad: null,
            },
            translateXDropdownFiltros: 0,
            zoomLevel: 100,
            isSelecting: false,
            selectedCells: [],
            selectionActivity: null,
            startCell: {
                row: null,
                column: null
            },
         };
       },
       computed: {
        visibleActivities() {
        return this.showAllActivities ? this.activities : this.activities.slice(0, 4);
        },
        getFilteredActivities() {
            return this.activities.filter(activity => {
                if (this.filtros.actividad != null) {
                    return activity.nombre === this.filtros.actividad;
                } else {
                    return true;
                }
            });
        },
        shapeClasses() {
           return {
             'w-40 h-64': this.selectedShape === 'vertical',
             'w-64 h-40': this.selectedShape === 'horizontal',
             'w-48 h-48': this.selectedShape === 'square'
           };
         },
        getCurrentProject(){
            return sessionStorage.getItem("constraintNameProy");
        },
        getFiltersData(){
            let estados = [
                { id: 1, descripcion: "Ejecutado histórico", color: "bg-blue-700" },
                { id: 2, descripcion: "Programado para la próxima semana", color: "bg-gray-400" },
                { id: 2, descripcion: "Ejecutado la semana anterior", color: "bg-purple-700" },
                { id: 2, descripcion: "Ejecutado", color: "bg-orange-500" },
                { id: 2, descripcion: "Aprobado por calidad", color: "bg-[#85D254]" }
            ];
            let actividades = this.activities.map(activity => ({
                id: activity.nombre,
                valor: activity.nombre
            }));
            let datosFiltro = [
                {
                    desFiltro: 'Estado',
                    tipoFiltro: 'StatusList',
                    estadosFiltro: estados,
                },
                {
                    desFiltro: 'Actividad',
                    tipoFiltro: 'ValuesList',
                    valoresFiltro: [...actividades],
                }
            ];
            return datosFiltro;
        },
        getCurrentFilters(){
            let desFiltros = {
                estado: 'Estado',
                actividad: 'Actividad',
            }
            let datosRequeridos = {
                estado: [
                    { id: 1, descripcion: "Ejecutado histórico", color: "bg-blue-700" },
                    { id: 2, descripcion: "Programado para la próxima semana", color: "bg-gray-400" },
                    { id: 3, descripcion: "Ejecutado la semana anterior", color: "bg-purple-700" },
                    { id: 4, descripcion: "Ejecutado", color: "bg-orange-500" },
                    { id: 5, descripcion: "Aprobado por calidad", color: "bg-[#85D254]" }
                ],
                actividad: this.activities.map(a => ({ ...a, id: a.nombre, tempValor: a.nombre})),
            };
            return Object.entries(this.filtros)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => {
                let dataReturn = {};
                switch (key) {
                    case 'estado':
                        dataReturn = { ...this.filterModel };
                        dataReturn.desFiltro = desFiltros[key];
                        dataReturn.tipoFiltro = 'StatusList';
                        dataReturn.estadoFiltro = {
                            id: value,
                            descripcion: datosRequeridos[key].find(e => e.id == value).descripcion,
                            color: datosRequeridos[key].find(d => d.id == value).color,
                            borderClass: null
                        }
                        break;
                    case 'actividad':
                        dataReturn = { ...this.filterModel };
                        dataReturn.desFiltro = desFiltros[key];
                        dataReturn.tipoFiltro = 'ValuesList';
                        dataReturn.valorFiltro = {
                            id: value,
                            tempValor: datosRequeridos[key].find(d => d.id == value).tempValor
                        }
                        break;
                }
                return dataReturn;
            });
        }
       },
    methods: {
        toggleSection(section) {
          this[section] = !this[section];
        },
        toggleExpandActivities() {
        this.showAllActivities = !this.showAllActivities;
        },
        getShapeStyle(shape) {
          switch (shape) {
            case "vertical":
              return { width: "30px", height: "60px" };
            case "horizontal":
              return { width: "60px", height: "30px" };
            case "square":
              return { width: "40px", height: "40px" };
            default:
              return {};
          }
        },
        toggleUniform(){
            this.isUniform = !this.isUniform;
            this.numberUniform = null;
        },
        handleClickDocumentos() {
            this.isDocumentosOpen = !this.isDocumentosOpen;
        },
        handleClickActividades() {
            this.isActividadesOpen = !this.isActividadesOpen;
        },
        addActivity() {
            if (this.newActivity.nombre && this.newActivity.pisos > 0 && this.newActivity.sectores > 0) {
                console.log(this.newActivity)
                this.activities.push({ ...this.newActivity }); 
                //this.currentActivity = { ...this.newActivity }; 
                this.resetForm();
                this.isInsertExpanded = false;
            }
        },
        resetForm() {
        this.newActivity = {
            nombre: '',
            pisos: this.numberUniform !== null && this.numberUniform !== 0 ? this.numberUniform : null,
            sectores: null
        };
        },
        openColorMenu(event, activityIndex, piso, sector) {
            const table = this.$refs.table; // Referencia a la tabla
            const cellRect = event.target.getBoundingClientRect();
            const containerRect = table.getBoundingClientRect();

            this.selectedCell = { activityIndex, piso, sector };

            this.showColorMenu = true;
            this.$nextTick(() => {
                const popup = document.querySelector('.popupEstados');
                if (!popup) return;

                const popupHeight = popup.offsetHeight;
                let zoomFactor = this.zoomLevel / 100;

                let adjustedX = ((cellRect.left - containerRect.left ) / zoomFactor );
                let adjustedY = ((cellRect.top - containerRect.top) / zoomFactor)  - popupHeight;

                this.menuPosition = { x: adjustedX, y: adjustedY };
                //Mostrar el selector de estadoss
                popup.style.opacity = '1';
            });
        },
        setCellColor(bgColor) {
            if (this.selectedCell) {
                if (this.selectedCells.length > 0) {
                    this.selectedCells.forEach(sc => {
                        if (!this.coloredCells[this.selectionActivity]) {
                            this.coloredCells[this.selectionActivity] = {};
                        }
                        this.coloredCells[this.selectionActivity][sc] = bgColor;
                    });
                    // Resetear la selección
                    this.selectedCells = [];
                    this.selectionActivity = null;
                    this.startCell = { row: null, column: null };
                    this.showColorMenu = false;
                    return;
                }
                const { activityIndex, piso, sector } = this.selectedCell;
                const activity = this.activities[activityIndex]; 

                if (!activity) return; 

                if (!this.coloredCells[activity.nombre]) {
                    this.coloredCells[activity.nombre] = {};
                }

                this.coloredCells[activity.nombre][`${piso}-${sector}`] = bgColor;
            }
            this.showColorMenu = false;
        },
        getCellColor(activityIndex, piso, sector) {
            const activity = this.activities[activityIndex];
            if (!activity || !this.coloredCells[activity.nombre]) return "bg-white";

            return this.coloredCells[activity.nombre][`${piso}-${sector}`] || "bg-white";
        },

        selectActivity(activity) {
            this.selectedActivity = activity;
            this.isActivityMenu = false; 
        },
        selectOption(estado) {
            this.selectedOption = estado;
            this.isOptionMenu = false; 
        },
        formatearInput(campo, event) {
            let input = event.target.value; 
            input = input.replace(/[^0-9,]/g, "");

            let partes = input.split(",");

            let fila = partes[0] ? partes[0].slice(0, 2) : "";
            let columna = partes[1] ? partes[1].slice(0, 2) : "";

            this[campo] = `(${fila}${partes.length > 1 ? ", " : ""}${columna})`;
        },
        obtenerCoordenadas(celda) {
            const match = celda.match(/\((\d+),\s*(\d+)\)/);
            return match ? [parseInt(match[1]), parseInt(match[2])] : null;
        },
        pintarCeldas() {
            if (!this.selectedActivity || !this.selectedOption) {
                alert("Selecciona una actividad y un estado antes de guardar.");
                return;
            }

            const desde = this.obtenerCoordenadas(this.celdaDesde);
            const hasta = this.obtenerCoordenadas(this.celdaHasta);

            if (!desde || !hasta) {
                alert("Formato incorrecto en las celdas.");
                return;
            }

            const [filaDesde, columnaDesde] = desde;
            const [filaHasta, columnaHasta] = hasta;

            if (!this.coloredCells[this.selectedActivity.nombre]) {
                this.coloredCells[this.selectedActivity.nombre] = {};  
            }

            for (let fila = filaDesde; fila <= filaHasta; fila++) {
                for (let columna = columnaDesde; columna <= columnaHasta; columna++) {
                    const key = `${fila}-${columna}`;
                    this.coloredCells[this.selectedActivity.nombre][key] = this.selectedOption.color;
                }
            }
        },
        updateFilterDropdownVisibility() {
            this.dropdownStates.showDropdownFiltros = !this.dropdownStates.showDropdownFiltros;
            if (this.getCurrentFilters.length > 0 ){
                this.getCurrentFilters.forEach(cf => {
                    cf.showTiposFiltro = false;
                    cf.showValorFiltro = false
                });
            }
            if (this.dropdownStates.showDropdownFiltros) {
                this.$nextTick(() => {
                    this.adjustFiltrosPosition();
                });
            }
        },
        adjustFiltrosPosition() {
            this.$nextTick(() => {
                // Utilizar solo si la seccion filtros se desborda !!!!!!
                const dropdown = this.$refs.showDropdownFiltros?.$el;
                if (!dropdown) return;

                const dropdownRect = dropdown.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                let translateX = viewportWidth - dropdownRect.left;

                this.translateXDropdownFiltros = translateX;
            });
        },
        updateFilter(currentFilter, ind){
            switch (currentFilter.desFiltro){
                case 'Estado':
                    this.filtros.estado = currentFilter.estadoFiltro.id;
                    break;
                case 'Actividad':
                    this.filtros.actividad = currentFilter.valorFiltro.id;
                    break;
            }
        },
        pushNewFilter(datosFiltroNuevo){
            switch (datosFiltroNuevo.desFiltro){
                case 'Estado':
                    this.filtros.estado = datosFiltroNuevo.estadoFiltro.id;
                    break;
                case 'Actividad':
                    this.filtros.actividad = datosFiltroNuevo.valorFiltro.id;
                    break;
            }
        },
        deleteFilter(filter){
            switch (filter.desFiltro){
                case 'Estado':
                    this.filtros.estado = null;
                    break;
                case 'Actividad':
                    this.filtros.actividad = null;
                    break;
            }
        },
        startSelection(event, piso, sector, activity) {
            if (event.button !== 0) return;

            this.isSelecting = true;
            this.selectedCells = [];
            
            // Estableciendo la celda incial
            this.startCell.row = piso;
            this.startCell.column = sector;
            this.selectedCells.push(`${piso}-${sector}`);
            this.selectionActivity = activity;
        },
        updateSelection(piso, sector) {
            if (!this.isSelecting) {
                return;
            }
            let newSeleccion = [];
            //Definiendo los limites del area seleccionada
            const minFila = Math.min(this.startCell.row, piso);
            const maxFila = Math.max(this.startCell.row, piso);
            const minColumna = Math.min(this.startCell.column, sector);
            const maxColumna = Math.max(this.startCell.column, sector);

            // Agregando las celdas del area rectangular generado
            for (let f = minFila; f <= maxFila; f++) {
                for (let c = minColumna; c <= maxColumna; c++) {
                    newSeleccion.push(`${f}-${c}`);
                }
            }
            this.selectedCells = newSeleccion;
        },
        endSelection() {
            this.isSelecting = false;
        },

        handleClickOutside(event) {
            const tablas = this.$refs.tablaActividades || [];
            let clickDentroTabla = false;

            if (Array.isArray(tablas)) {
                clickDentroTabla = tablas.some(tabla => tabla.contains(event.target));
            } else if (tablas instanceof HTMLElement) {
                clickDentroTabla = tablas.contains(event.target);
            }

            if (!clickDentroTabla) {
                this.showColorMenu = false;
                this.isSelecting = false;
                this.selectedCells = [];
                this.selectionActivity = null;
                this.startCell = { row: null, column: null };
            }


            if (this.$refs.showDropdownFiltros?.$el) {
                if (!this.$refs.showDropdownFiltros.$el.contains(event.target)) {
                    this.dropdownStates.showDropdownFiltros = false;
                }
            }
        },
    },
    watch: {
    numberUniform(newVal) {
        if (newVal !== null && this.newActivity) {
            this.newActivity.pisos = Number(newVal);
        }
    }
    },
    async mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
     };
     </script>
     
     <style scoped>
        .border-dashed {
        border-style: dashed;
        }
        .dropdownStyle {
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); 
        cursor: pointer;
        }

        input[type="number"] {
            -webkit-appearance: textfield; 
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: auto; 
        }
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-y-hidden {
    overflow-x: auto;
}

.scrollbar-y-hidden::-webkit-scrollbar:vertical {
    display: none;
}
     </style>
