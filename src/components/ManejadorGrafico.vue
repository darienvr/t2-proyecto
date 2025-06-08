<template>
  <div class="w-full border-2 relative border-[#002B6B] ">
  
    <div class="w-[95%] mx-auto py-2">
      <div class="w-[85%] flex justify-between float-right text-xs font-light py-1">
  
        <div class="flex gap-3">
          <div class="flex gap-2">
            <p class="w-[15px] h-[15px] bg-[#AAAAAA]"></p>
            <p>No Aplica</p>
          </div>
          <div class="flex gap-2">
            <p class="w-[15px] h-[15px] bg-[#85D254]"></p>
            <p>Finalizados</p>
          </div>
        </div>
  
        <div class="flex gap-3">
          <div class="flex gap-1 items-center">
            <i class="fa-solid fa-circle-exclamation"></i>          
            <p>La orientación y el orden no seran editables tras añadir datos a las secciones</p>
          </div>
  
          <div class="flex gap-2">
            <p class="w-[15px] h-[15px] bg-[#DEE4EB]"></p>
            <p>Paños</p>
          </div>
  
          <div class="flex gap-2">
            <p class="w-[15px] h-[15px] bg-[#D4E3FC]"></p>
            <p>Niveles</p>
          </div>
        </div>
      </div>
    </div>
  
  <!-- CONTENIDO CENTRAL -->
  
    <div class="w-[95%] mx-auto">
        <div class="p-2 relative border border-dashed border-gray-400 w-full h-[1300px] flex items-center justify-center">
           <div class="absolute inset-0">
              <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                 <line x1="0" y1="0" x2="100%" y2="100%" stroke="#999" stroke-dasharray="5,5" />
                 <line x1="100%" y1="0" x2="0" y2="100%" stroke="#999" stroke-dasharray="5,5" />
              </svg>
           </div>
           <div
           :style="{
              ...shapeClasses,
              transform: `scale(${zoomLevel / 160})`,
              transformOrigin: 'center'
            }"
              class="modalSecondary p-5 bg-[#DEE4EB]  h-full flex flex-col items-center justify-center relative"
            >
              <div
                class="bg-white z-10 flex flex-col justify-between p-4 border border-gray-300 shadow-md rounded-md 
                      w-full h-[95%] max-w-[90%] overflow-auto"
                style="word-wrap: break-word;">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fa-solid fa-chart-bar text-black"></i>
                  <p class="font-semibold truncate" :style = "{ fontSize: dynamicCentral }">Resumen</p>
                </div>
                <div v-for="(nivel, index) in nivelesComputed" :key="index" class="mb-2 font-normal flex-col justify-between">
                  <p class="text-sm font-normal truncate" :style = "{ fontSize: dynamicCentral }">
                    {{ nivel.nombre }}
                    <span :class="nivel.actual >= nivel.total ? 'text-green-500' : 'text-orange-400'">
                      {{ Math.round((nivel.actual / nivel.total) * 100) }}%
                    </span>
                  </p>
                  <p class="text-xs text-gray-600 truncate"  :style = "{ fontSize: dynamicCentral }">
                    Concreto {{ nivel.actual }} / {{ nivel.total }}
                  </p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 relative">
                    <div v-if="Math.round((nivel.actual / nivel.total) * 100)"
                      :style="{ width: (nivel.actual / nivel.total) * 100 + '%' }"
                      :class="nivel.actual >= nivel.total ? 'bg-green-500' : 'bg-orange-400'"
                      class="h-2.5 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
  
                <hr class="my-2 border-gray-300" />
  
                <div>
                  <p class="text-sm font-normal truncate" :style = "{ fontSize: dynamicCentral }">
                    TOTAL <span class="text-orange-400">{{ totalPorcentaje }}%</span>
                  </p>
                  <p class="text-xs text-gray-600 font-normal truncate" :style = "{ fontSize: dynamicCentral }">
                    Concreto {{ totalActual }} / {{ totalMaximo }}
                  </p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 relative">
                    <div
                      :style="{ width: totalPorcentaje + '%' }"
                      :class="totalPorcentaje === 100 ? 'bg-green-500' : 'bg-orange-400'"
                      class="h-2.5 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              </div>
  
           <!-- Sección Derecha -->

            <div
                class="mb-6 border rounded absolute z-40 bg-white flex flex-row border-none"
                :style="{ 
                    left: (widthShape + 10) + computedBottom + 'px', 
                    top: computedBottom + 'px',
                    fontSize: (12 * 150 / zoomLevel) + 'px',
                    height: heightShape + 'px'
                }"
                >
                <div class="text-sm space-y-1 flex flex-col flex-grow overflow-hidden">
                    <div v-if="dataDerechaTranspuesta.length" class="text-sm space-y-1 flex flex-col flex-grow overflow-hidden">
                    
                        <!-- Encabezado de columnas -->
                        <div class="flex gap-[2px] pl-10 shrink-0">
                        <div
                            v-for="(col, colIndex) in dataDerechaTranspuesta[0]"
                            :key="'derecha-col-' + colIndex"
                            class="w-14 py-3 flex items-center justify-center font-bold bg-[#D4E3FC]"
                        >
                            {{ colIndex + 1 }}
                        </div>
                        </div>

                        <!-- Sección de filas -->
                        <div class="flex flex-col flex-grow overflow-y-auto gap-[2px]">
                        <div
                            v-for="(filaTranspuesta, filaIndex) in dataDerechaTranspuesta"
                            :key="'derecha-row-' + filaIndex"
                            class="flex gap-[2px] flex-grow"
                        >
                            <div class="flex items-center justify-center font-bold px-4 bg-gray-200">
                            {{ filaIndex + 1 }}
                            </div>

                            <div
                            v-for="(celda, colIndex) in filaTranspuesta"
                            :key="colIndex"
                    
                            :class="[
                                'w-14 flex items-center justify-center border rounded cursor-pointer select-none',
                                {
                                'bg-green-300': celda.estado === 'completado',
                                'bg-gray-300': celda.estado === 'no-aplica',
                                'ring-2 ring-blue-400': celdasSeleccionadas.some(c =>
                                c.row === colIndex  &&
                                c.col === (selectedOrientation === 'AntiHorario' ? filaTranspuesta.length - 1 - filaIndex : filaIndex) && c.seccion === 'derecha'
                            )
                                }
                            ]"
                            @mousedown.left="iniciarSeleccion(
                                colIndex ,
                                selectedOrientation === 'AntiHorario' ? filaTranspuesta.length - 1 - filaIndex : filaIndex, 'derecha'
                            )"
                            @mouseenter="seleccionarCelda(
                                colIndex ,
                                selectedOrientation === 'AntiHorario' ? filaTranspuesta.length - 1 - filaIndex : filaIndex, 'derecha'
                            )"
                            @mouseup.left="handleLeftClick(
                                $event,
                                colIndex ,
                                selectedOrientation === 'AntiHorario' ? filaTranspuesta.length - 1 - filaIndex : filaIndex,
                                'derecha'
                            )"
                            >
                            {{ celda.valor || '---' }}
                            </div>
                        </div>
                    </div>
                </div>

                </div>

                <div class="flex items-center justify-center px-2"
                    :style="{
                        height: heightShape + 'px',
                        transform: 'rotate(90deg)',
                        transformOrigin: 'center',
                        whiteSpace: 'nowrap',
                        fontSize: (12 * 140 / zoomLevel) + 'px',
                        position: 'relative',
                        width: '30px',
                        right: '0px'
                    }">
                    {{ secciones2.derecha.direccion }}
                </div>
                
            </div>
  
            <div v-if="secciones[3].banos < maxBanosHorizontal"  class="absolute z-40   font-normal bg-gray-400 w-full" :style="{ left: (widthShape+10) + 'px', 
            top: secciones[3].banos * ((heightShape / maxBanosHorizontal)- (38 / maxBanosHorizontal)) + 45 + 'px',
            height: heightShape - (secciones[3].banos * ((heightShape / maxBanosHorizontal)- (38 / maxBanosHorizontal)) + 45) + 'px',
            width: widthSeccionDerecha + 'px' ,
             }">
            </div>
  
            <!-- Sección Izquierda -->

            <div class="mb-6 border rounded absolute z-40 bg-white flex flex-row border-none" 
                :style="{ 
                right: (widthShape + 10) + 'px', 
                top: computedTop + 'px', 
                height: heightShape + 'px' 
                }">
                <div class="flex items-center justify-center px-2"
                    :style="{
                    height: heightShape + 'px',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                    whiteSpace: 'nowrap',
                    fontSize: (12 * 140 / zoomLevel) + 'px',
                    position: 'relative',
                    width: '30px',
                    left: '0px'  
                }">
                    {{ secciones2.izquierda.direccion }}
                </div>
                <div class="text-sm space-y-1 flex flex-col flex-grow overflow-hidden">
                    <div v-if="dataIzquierdaTranspuesta.length" class="text-sm space-y-1 flex flex-col flex-grow overflow-hidden">
                        <!-- Header horizontal: niveles -->
                        <div class="flex gap-[2px] pl-10 shrink-0">
                        <div
                            v-for="(nivel, nivelIndex) in dataIzquierdaTranspuesta[0]"
                            :key="'transp-nivel-' + nivelIndex"
                            class="w-14 py-3 flex items-center justify-center font-bold bg-[#D4E3FC]"
                        >
                            {{ nivel.nivel }}
                        </div>
                        </div>

                        <div class="flex flex-col flex-grow overflow-y-auto gap-[2px]">
                        <div
                            v-for="(filaTranspuesta, filaIndex) in dataIzquierdaTranspuesta"
                            :key="'transp-fila-' + filaIndex"
                            class="flex gap-[2px] flex-grow"
                        >
                
                            <div class="flex items-center justify-center font-bold px-4 bg-gray-200">
                            {{ filaIndex + 1 }}
                            </div>

                            <!-- Celdas -->
                            <div
                            v-for="(celda, colIndex) in filaTranspuesta"
                            :key="'transp-celda-' + colIndex"
                        
                            :class="[ 
                                'w-14 flex items-center justify-center border rounded cursor-pointer select-none',
                                {
                                'bg-green-300': celda.estado === 'completado',
                                'bg-gray-300': celda.estado === 'no-aplica',
                                'ring-2 ring-blue-400': celdasSeleccionadas.some(c =>
                                    c.row === (selectedOrientation === 'AntiHorario'
                                    ? filaTranspuesta.length - 1 - colIndex
                                    : dataIzquierdaTranspuesta[0].length - 1 - colIndex) &&
                                                        c.col === (selectedOrientation === 'Horario'
                                    ? filaTranspuesta.length - 1 - filaIndex
                                    : filaIndex) && c.seccion === 'izquierda'
                                    )

                                    
                                }
                            ]"
                            @mousedown.left="iniciarSeleccion(
                                selectedOrientation === 'AntiHorario'
                                            ? filaTranspuesta.length - 1 - colIndex
                                            : dataIzquierdaTranspuesta[0].length - 1 - colIndex,
                                selectedOrientation === 'Horario'
                                            ? filaTranspuesta.length - 1 - filaIndex
                                            : filaIndex, 'izquierda'
                            )"
                            @mouseenter="seleccionarCelda(
                                selectedOrientation === 'AntiHorario'
                                            ? filaTranspuesta.length - 1 - colIndex
                                            : dataIzquierdaTranspuesta[0].length - 1 - colIndex,
                                selectedOrientation === 'Horario'
                                            ? filaTranspuesta.length - 1 - filaIndex
                                            : filaIndex, 'izquierda'
                            )"
                            @mouseup.left="handleLeftClick(
                                $event,
                                selectedOrientation === 'AntiHorario'
                                            ? filaTranspuesta.length - 1 - colIndex
                                            : dataIzquierdaTranspuesta[0].length - 1 - colIndex,
                                selectedOrientation === 'Horario'
                                            ? filaTranspuesta.length - 1 - filaIndex
                                            : filaIndex,
                                'izquierda'
                            )"
                            >
                            {{ celda.valor || '---' }}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="secciones[2].banos < maxBanosHorizontal"  class="absolute z-40   font-normal bg-gray-400 w-full" :style="{ right: (widthShape+10) + 'px', 
            top: secciones[2].banos * ((heightShape / maxBanosHorizontal)- (38 / maxBanosHorizontal)) + 45 + 'px',
            height: heightShape - (secciones[2].banos * ((heightShape / maxBanosHorizontal)- (38 / maxBanosHorizontal)) + 45) + 'px',
            width: widthSeccionIzquierda+ 'px' ,
             }">
            </div>
  
            <!-- Sección Superior -->

            <div
                class="mb-1 border rounded absolute z-40 bg-white flex flex-col border-none"
                :style="{
                    bottom: (heightShape + 10) + 'px',
                    left: 0,
                    width: widthShape + 'px'
                }"
                >
                <p class=" text-center" :style="{ fontSize: (12 * 140/zoomLevel) + 'px'}">{{secciones2.superior.direccion}} </p>
                <div
                    v-if="secciones2.superior.data"
                    class="text-sm flex flex-col space-y-1 overflow-hidden"
                >
                    <!-- Encabezado de columnas -->
                    <div class="flex flex-row pl-10 shrink-0 gap-[2px]">
                    <div
                        v-for="(col, colIndex) in secciones2.superior.data[0]"
                        :key="'superior-col-' + colIndex"
                        class="flex-1 py-3 flex items-center justify-center font-bold bg-gray-200"
                    >
                        {{ colIndex + 1 }}
                    </div>
                    </div>

                    <!-- Filas -->
                    <div
                        v-for="(fila, rowIndex) in [...secciones2.superior.data].reverse()"
                        :key="'superior-row-' + rowIndex"
                        class="flex flex-row gap-[2px]"
                        >
                        <div class="px-4 py-2 flex items-center justify-center font-bold bg-[#D4E3FC]">
                            {{ secciones2.superior.data.length - rowIndex }}
                        </div>

                        <div
                            v-for="(celda, colIndex) in (selectedOrientation === 'AntiHorario' ? fila.slice().reverse() : fila)"
                            :key="colIndex"
                            

                            :class="[
                            'flex-1 py-2 flex items-center justify-center border rounded cursor-pointer select-none',
                            {
                                'bg-green-300': celda.estado === 'completado',
                                'bg-gray-300': celda.estado === 'no-aplica',
                                'ring-2 ring-blue-400': celdasSeleccionadas.some(c =>
                                    c.row === (secciones2.superior.data.length - 1 - rowIndex) &&
                                    c.col === (selectedOrientation === 'AntiHorario' ? fila.length - 1 - colIndex : colIndex) && c.seccion === 'superior'
                                    )
                            }
                            ]"
                            @mousedown.left="iniciarSeleccion(
                            secciones2.superior.data.length - 1 - rowIndex,
                            selectedOrientation === 'AntiHorario' ? fila.length - 1 - colIndex : colIndex, 'superior'
                            )"
                            @mouseenter="seleccionarCelda(
                            secciones2.superior.data.length - 1 - rowIndex,
                            selectedOrientation === 'AntiHorario' ? fila.length - 1 - colIndex : colIndex, 'superior'
                            )"
                            @mouseup.left="handleLeftClick(
                            $event,
                            secciones2.superior.data.length - 1 - rowIndex,
                            selectedOrientation === 'AntiHorario' ? fila.length - 1 - colIndex : colIndex,
                            'superior'
                            )"
                        >
                            {{ celda.valor || '---' }}
                        </div>
                    </div>
                </div>
            </div>
  
            <div v-if="secciones[1].banos < maxNivelesVertical"  class="absolute z-40   font-normal bg-gray-400 w-full" :style="{ bottom: (heightShape + 10)+ 'px', 
            left: secciones[1].banos * ((widthShape / maxNivelesVertical)- (38 / maxNivelesVertical)) + 45 + 'px',
            width: widthShape - (secciones[1].banos * ((widthShape / maxNivelesVertical)- (38 / maxNivelesVertical)) + 45) + 'px',
            height: heightSeccionSuperior - 25 + 'px' ,
             }">
            
            </div>
  
           <!-- Sección Inferior -->

            <div
                class="mb-1 border rounded absolute z-40 bg-white flex flex-col border-none"
                :style="{
                    top: (heightShape + 10) + 'px',
                    left: 0,
                    width: widthShape + 'px'
                }"
                >
                
                <div v-if="secciones2.inferior.data" class="text-sm flex flex-col space-y-1 overflow-hidden">
                    <!-- Cabecera de columnas -->
                    <div class="flex flex-row pl-10 shrink-0 gap-[2px]">
                    <div
                        v-for="(col, colIndex) in secciones2.inferior.data[0]"
                        :key="'col-' + colIndex"
                        class="flex-1 py-3 flex items-center justify-center font-bold bg-gray-200"
                    >
                        {{ colIndex + 1 }}
                    </div>
                    </div>

                    <!-- Filas con cabecera de filas -->
                    <div
                    v-for="(fila, rowIndex) in secciones2.inferior.data"
                    :key="rowIndex"
                    class="flex flex-row gap-[2px]"
                    >
                    <!-- Cabecera de fila -->
                    <div class="px-4 py-2 flex items-center justify-center font-bold bg-[#D4E3FC]">
                        {{ rowIndex + 1 }}
                    </div>

                    <!-- Celdas -->
                    <div
                        v-for="(celda, colIndex) in (selectedOrientation === 'Horario' ? fila.slice().reverse() : fila)"
                        :key="colIndex"
                        
                        :class="[
                            'flex-1 py-2 flex items-center justify-center border rounded cursor-pointer select-none',
                            {
                            'bg-green-300': celda.estado === 'completado',
                            'bg-gray-300': celda.estado === 'no-aplica',
                            'ring-2 ring-blue-400': celdasSeleccionadas.some(c => c.row === rowIndex && c.col === (selectedOrientation === 'Horario' ? fila.length - 1 - colIndex : colIndex) && c.seccion === 'inferior')
                            }
                        ]"
                        @mousedown.left="iniciarSeleccion(rowIndex, selectedOrientation === 'Horario' ? fila.length - 1 - colIndex : colIndex, 'inferior')"
                        @mouseenter="seleccionarCelda(rowIndex, selectedOrientation === 'Horario' ? fila.length - 1 - colIndex : colIndex, 'inferior')"
                        @mouseup.left="handleLeftClick($event, rowIndex, selectedOrientation === 'Horario' ? fila.length - 1 - colIndex : colIndex, 'inferior')"

                    >
                        {{ celda.valor || '---' }}
                    </div>
                    </div>
                </div>
                <p class="text-center" :style="{ fontSize: (12 * 140/zoomLevel) + 'px'}">{{ secciones2.inferior.direccion }}</p>
            </div>
            

            <div v-if="secciones[0].banos < maxNivelesVertical"  class="absolute z-40  text-sm font-normal bg-gray-400 w-full" :style="{ top: (heightShape + 10)+ 'px', 
            left: secciones[0].banos * ((widthShape / maxNivelesVertical)- (38 / maxNivelesVertical)) + 45 + 'px',
            width: widthShape - (secciones[0].banos * ((widthShape / maxNivelesVertical)- (38 / maxNivelesVertical)) + 45) + 'px',
            height: heightSeccionInferior - 25 + 'px' ,
             }">
  
            </div>
            
            <transition name="fade">
            <div v-if="mostrarModal"   class="absolute z-40 bg-white flex flex-col p-1 gap-1 rounded shadow-lg"
            :style="{ top: modalPosition.top + 'px', left: modalPosition.left + 'px' }" >
              <div class="flex flex-col gap-1 items-center">
                <button v-for="opcion in opcionesOption" :key="opcion.valor"
                  @click="aplicarEstado(opcion.valor)" class="flex gap-1 items-center text-sm">
                  {{ opcion.texto }} <i :class="opcion.icono"></i> 
                </button>
              </div>
            </div>
          </transition>
          </div>
        </div>
  
        <div class="mb-2 flex items-center gap-2">
          <label for="zoomControl">Zoom:</label>
          <input
            id="zoomControl"
            type="range"
            min="50"
            max="100"
            v-model="zoomLevel"
            class="w-40"
          />
          <span>{{ zoomLevel }}%</span>
        </div>
        <div>
            <!-- Menú contextual -->
            <div
            v-if="menu.visible"
            :style="{ top: menu.y + 'px', left: menu.x + 'px', position: 'fixed' }"
            class="bg-white border border-gray-300 rounded shadow text-xs z-50 font-normal menu-contextual"
            @click="menu.visible = false"
            >
            <ul>
                <li
                @click="cambiarEstadoCelda('completado')"
                class="px-1 py-1 hover:bg-gray-200 cursor-pointer flex justify-around items-center"
                >
                <span class="w-[65px]">Completado</span>
                <i class="fa-solid fa-circle-check text-green-500"></i>
                </li>
                <li
                @click="cambiarEstadoCelda('no-aplica')"
                class="px-1 py-1 hover:bg-gray-200 cursor-pointer flex justify-around items-center"
                >
                <span  class="w-[65px]">No aplica</span>
                <i class="fa-solid fa-circle text-gray-400"></i>
                </li>
            </ul>
            </div>
        </div>
     </div>
   
   
  </div>
  </template>
   
   <script>
   export default {
     name: "ManejadorGrafico",
     props: {
        secciones: Array,
        opciones: Array,
        opcionesOption: Array,
        selectedOrientation: String,
        secciones2: Object,
    },
     data() {
       return {
        showModal: false,
        tempValue: null,
        tempField: null,
        permitirEdicion : {},
        tempSeccion: null,
        temporizadorEdicion: {},  
        temporizadores: {},
        temporizadorModal: {},
        modalActive: false,
        modalCooldown : false,
        permitirBajarSinModal: {} ,
        lastFocusedInput: null,
         heightSeccionSuperior: 0, 
         heightSeccionInferior:0,
         widthSeccionDerecha:0,
         widthSeccionIzquierda: 0,
         isShapeExpanded: false,
         isHourOrientation: false,
         isOrder: false,
         selectedShape: "vertical",
         widthShape: 0,
         newChangeTable: {
            tabla: "",
            desde: "",
            hasta: "",
            option: "",
          },
         heightShape: 0,
         modalPosition: { top: 0, left: 0 },
         opcionesCelda: ["superior", "inferior", "izquierda", "derecha"],
         shapes: [
           { label: "Rectángulo Vertical", value: "vertical" },
           { label: "Rectángulo Horizontal", value: "horizontal" },
           { label: "Cuadrado", value: "square" }
         ],

        mostrarOpcionesOption: false,
        rightWidth: 0,
        leftWidth: 0,

        niveles: [
          { nombre: "NIVEL 1", actual: 15, total: 23 },
          { nombre: "NIVEL 2", actual: 37, total: 37 },
          { nombre: "NIVEL 3", actual: 20, total: 37 },
  
        ],
        seleccion: {
          derecha: [],
          izquierda: [],
          superior: [],
          inferior: []
        },
        arrastrando: false,
        opcionesBase: ["Superior", "Inferior", "Izquierda", "Derecha"],
        modalAbierto: false,
        seleccionMultiple: [], 
        seleccionando: false,
        seccionActual: '',
        seccionSeleccionada: null,
        mostrarModal: false,
        celdaInicio: null,
        indiceSeleccionado: null,
        isOption: false,
        celdasResaltadas: [], 
        mostrarOpcionesCelda: false,
        modalVisible: false,
        zoomLevel: 100,
        menu: {
            visible: false,
            x: 0,
            y: 0,
            seccion: '',
            row: null,
            col: null,
       },
        celdasSeleccionadas: [],
       };
     },
     computed: {
      dynamicFontSize() {
        const baseZoom = this.zoomLevel >= 90 ? 120 : 100;
        return (12 * baseZoom / this.zoomLevel) + 'px';
      },
      dynamicCentral() {
        const baseZoom = this.zoomLevel >= 90 ? 120 : 90;
        return (12 * baseZoom / this.zoomLevel) + 'px';
      },
        nivelesComputed() {
            const resumenNiveles = {};

            Object.entries(this.secciones2).forEach(([nombreSeccion, seccion]) => {
                // Inicializar niveles
                for (let i = 0; i < seccion.niveles; i++) {
                const nivelKey = `Nivel ${i + 1}`;
                if (!resumenNiveles[nivelKey]) {
                    resumenNiveles[nivelKey] = { nombre: `NIVEL ${i + 1}`, actual: 0, total: 0 };
                }
                }

                // Recorremos las celdas
                seccion.data.forEach((fila) => {
                fila.forEach((celda) => {
                    const nivel = celda.nivel;
                    const nivelKey = `Nivel ${nivel}`;

                    if (nivelKey in resumenNiveles) {
                    if (celda.estado !== "no-aplica") {
                        resumenNiveles[nivelKey].total++;
                    }
                    if (celda.estado === "completado") {
                        resumenNiveles[nivelKey].actual++;
                    }
                    }
                });
                });
            });

            const nivelesOrdenados = Object.values(resumenNiveles).sort(
                (a, b) => parseInt(a.nombre.split(" ")[1]) - parseInt(b.nombre.split(" ")[1])
            );

            const cantidadNiveles = nivelesOrdenados.length;

            // Ajustar zoom según cantidad de niveles
            if (cantidadNiveles > 12) {
                this.zoomLevel = 55;
            } else if (cantidadNiveles >= 9 && cantidadNiveles <= 12) {
                this.zoomLevel = 70;
            } else if (cantidadNiveles === 8) {
                this.zoomLevel = 75;
            } else if (cantidadNiveles === 7) {
                this.zoomLevel = 85;
            } else {
                this.zoomLevel = 100;
            }

            return nivelesOrdenados;
        },
      totalActual() {
        return this.nivelesComputed.reduce((sum, nivel) => sum + nivel.actual, 0);
      },
      totalMaximo() {
        return Object.values(this.secciones2).reduce((sum, seccion) => {
            // Verificar si la sección tiene niveles y datos
            if (seccion.niveles && seccion.data) {
            // Iterar sobre los niveles de cada sección
            for (let i = 0; i < seccion.niveles; i++) {
                // Verificar si la fila de datos existe y tiene celdas
                if (seccion.data[i]) {
                seccion.data[i].forEach(celda => {
                    // Si la celda no tiene estado 'no-aplica', contarla
                    if (celda.estado !== 'no-aplica') {
                    sum++;
                    }
                });
                }
            }
            }
            return sum;
        }, 0);
        },
      totalPorcentaje() {
        return this.totalMaximo ? Math.round((this.totalActual / this.totalMaximo) * 100) : 0;
      },
    
      shapeClasses() {
        const baseHeight = 50;
        const extraHeightPerLevel = 24;
        const height = baseHeight + this.nivelesComputed.length * extraHeightPerLevel;

        if (this.selectedShape === "vertical") {
            this.widthShape = height * 2.8;
            this.heightShape = height * 3.3;
            return {
            width: `${this.widthShape}px`,
            height: `${this.heightShape}px`
            };
        }

        if (this.selectedShape === "horizontal") {
            this.widthShape = height * 3.5;
            this.heightShape = height * 3.1;
            return {
            width: `${this.widthShape}px`,
            height: `${this.heightShape}px`
            };
        }

        if (this.selectedShape === "square") {
            this.widthShape = height * 3.1;
            this.heightShape = height * 3.1;
            return {
            width: `${this.widthShape}px`,
            height: `${this.heightShape}px`
            };
        }

        return {};
        },
  
    computedBottom() {
      if (this.$refs.SeccionDerecha) {
        return this.heightShape - this.$refs.SeccionDerecha.offsetHeight;
      }
      return 0; 
    },
    computedTop() {
      if (this.$refs.SeccionIzquierda) {
        return this.heightShape - this.$refs.SeccionIzquierda.offsetHeight;
      }
      return 0; 
    },
      opcionesDisponibles() {
        const valoresUsados = this.opciones.map((item) => item.valor);
        return this.opcionesBase.filter((opcion) => !valoresUsados.includes(opcion));
      },
      banosDerecha() {
        return this.secciones?.[3]?.banos ?? 0;
      },
      seccionesMasBanosVertical() {
        const verticales = this.secciones.filter(sec => sec.nombre === "inferior" || sec.nombre === "superior");
        const maxBanos = Math.max(...verticales.map(sec => sec.banos || 0));
  
        return verticales
          .filter(sec => sec.banos === maxBanos)
          .map(sec => sec.nombre);
      },
  
      seccionesMasBanosHorizontal() {
        const horizontales = this.secciones.filter(sec => sec.nombre === "izquierda" || sec.nombre === "derecha");
        const maxBanos = Math.max(...horizontales.map(sec => sec.banos || 0));
  
        return horizontales
          .filter(sec => sec.banos === maxBanos)
          .map(sec => sec.nombre);
      },
        maxBanosHorizontal() {
          const banosIzq = this.secciones.find(sec => sec.nombre === "izquierda")?.banos || 0;
          const banosDer = this.secciones.find(sec => sec.nombre === "derecha")?.banos || 0;
          return Math.max(banosIzq, banosDer);
        },
  
        maxNivelesVertical() {
          const nivelesSup = this.secciones.find(sec => sec.nombre === "superior")?.banos || 0;
          const nivelesInf = this.secciones.find(sec => sec.nombre === "inferior")?.banos || 0;
          return Math.max(nivelesSup, nivelesInf);
        },

     opcionesCompletas() {
          return this.opciones.every(opcion => opcion.valor.trim() !== "");
      },

        dataIzquierdaTranspuesta() {
            if (!this.secciones2.izquierda.data?.length) return [];

            // Invertimos niveles (filas originales)
            const nivelesInvertidos = this.secciones2.izquierda.data.slice().reverse();

            // Transponemos
            let transpuesta = nivelesInvertidos[0].map((_, colIndex) =>
            nivelesInvertidos.map(fila => fila[colIndex])
            );

            // Si es horario, invertimos el orden de las filas transpuestas
            if (this.selectedOrientation === 'Horario') {
            transpuesta = transpuesta.slice().reverse();
            }

            return transpuesta;
        },

        dataDerechaTranspuesta() {
            if (!this.secciones2.derecha.data?.length) return [];

            const nivelesOriginales = this.secciones2.derecha.data;

            let transpuesta = nivelesOriginales[0].map((_, colIndex) =>
                nivelesOriginales.map(fila => fila[colIndex])
            );

            if (this.selectedOrientation === 'AntiHorario') {
                transpuesta = transpuesta.slice().reverse();
            }

            return transpuesta;
        },
  
    },
     methods: {
      
      actualizarSeleccion2(fila, columna) {
        if (this.seleccionando) {
          const inicio = this.celdaInicio;
          this.seleccionMultiple = [];
    
          // Define los límites del área seleccionada
          const minFila = Math.min(inicio.fila, fila);
          const maxFila = Math.max(inicio.fila, fila);
          const minColumna = Math.min(inicio.columna, columna);
          const maxColumna = Math.max(inicio.columna, columna);
          console.log("Sección seleccionada es:" , this.seccionSeleccionada)
          // Selecciona todas las celdas dentro del área rectangular
          for (let f = minFila; f <= maxFila; f++) {
            for (let c = minColumna; c <= maxColumna; c++) {
              this.seleccionMultiple.push({ fila: f, columna: c, seccion: this.seccionSeleccionada  });
            }
          }
        }
      },

      aplicarEstado(valor) {
        const nuevaSeccion = JSON.parse(JSON.stringify(this.secciones)); // Clonar la prop localmente

        this.seleccionMultiple.forEach(({ fila, columna }) => {
          const seccion = nuevaSeccion.find(s => s.nombre === this.seccionSeleccionada);
          if (seccion) {
            if (!seccion.seleccion[fila]) seccion.seleccion[fila] = {}; // Manejar inicialización si es undefined
            seccion.seleccion[fila][columna] = valor;
          }
        });
        console.log(nuevaSeccion)
        this.$emit('actualizar-secciones', nuevaSeccion); 
        this.mostrarModal = false;
        this.seleccionMultiple = [];
      },
      toggleSection(section) {
        this[section] = !this[section];
      },
      updateRightWidth() {
        if (this.$refs.SeccionDerecha) {
          this.rightWidth = this.$refs.SeccionDerecha.offsetWidth;
          console.log("Ancho de sección derecha:", this.rightWidth);
        }
      },
      updateLeftWidth() {
        if (this.$refs.SeccionIzquierda) {
          this.leftWidth = this.$refs.SeccionIzquierda.offsetWidth;
          console.log("Ancho de sección derecha:", this.leftWidth);
        }
      },
  
      seleccionar(estado) {
        if (!this.celdaSeleccionada) return;
  
        const { seccion, fila, columna } = this.celdaSeleccionada;
  
        // Buscar la sección dentro de this.secciones
        const seccionEncontrada = this.secciones.find(sec => sec.nombre === seccion);
  
        if (!seccionEncontrada) {
          console.error(` Sección "${seccion}" no encontrada.`);
          return;
        }
  
        // Asegurar que seleccion existe
        if (!seccionEncontrada.seleccion) seccionEncontrada.seleccion = [];
        if (!seccionEncontrada.seleccion[fila]) seccionEncontrada.seleccion[fila] = {};
        seccionEncontrada.seleccion[fila][columna] = estado;
  
        this.modalVisible = false;
      },

      getNumberDerecha(nivel,bano){
        if(this.selectedOrientation == "Horario"){
          return `${nivel}.${bano}`
        } else {
          const result = this.banosDerecha - bano
          return `${nivel}.${result+1}`
        }
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

  
      abrirModalX(index, event) {
        this.indiceSeleccionado = index;
        this.modalAbierto = true;
      },
      seleccionarOpcion(opcion) {
        if (this.indiceSeleccionado !== null) {
          this.opciones[this.indiceSeleccionado].valor = opcion;
          this.cerrarModal();
        }
      },
      seleccionarOpcionTabla(opcion) {
        this.newChangeTable.tabla = opcion;
        this.mostrarOpcionesCelda = false; 
      },
      cerrarModal() {
        this.modalAbierto = false;
        this.indiceSeleccionado = null;
      },
      cerrarSiClickFuera(event) {
        if (this.modalAbierto) {
          const modal = this.$el.querySelector(".absolute");
          if (modal && !modal.contains(event.target)) {
            this.cerrarModal();
          }
        }
        const menu = this.$el.querySelector('.menu-contextual');
        if (this.menu.visible && (!menu || !menu.contains(event.target)) && !this.seleccionando) {
            console.log('gaa')
            this.menu.visible = false;
        }
      },

    generarTablas(secciones2) {
        let contadorGlobal = 1;

        this.opciones.forEach((opcion) => {
        const key = opcion.valor;
        const seccion = secciones2[key];

        if (seccion && seccion.niveles > 0 && seccion.panos > 0) {
            const dataGenerada = [];

            for (let fila = 0; fila < seccion.niveles; fila++) {
            const filaActual = [];
            for (let col = 0; col < seccion.panos; col++) {
                filaActual.push({
                numero: contadorGlobal++, 
                estado: '', 
                });
            }
            dataGenerada.push(filaActual);
            }

            this.$emit('actualizar-secciones', { key, data: dataGenerada });
        }
        });
   },
    mostrarMenuContextual(event, nombreSeccion, rowIndex, colIndex) {
        console.log('Click en:', nombreSeccion, rowIndex, colIndex)
        this.menu.visible = true
        this.menu.x = event.clientX
        this.menu.y = event.clientY
        this.menu.seccion = nombreSeccion
        this.menu.row = rowIndex
        this.menu.col = colIndex
    },
    
    cambiarEstadoCelda(estado) {
        const { seccion, row, col } = this.menu

        if (this.celdasSeleccionadas.length > 0) {
        // Cuando son varias celdas
        this.celdasSeleccionadas.forEach(({ row, col }) => {
            if (this.secciones2[seccion]?.data?.[row]?.[col]) {
            this.secciones2[seccion].data[row][col].estado = estado
            }
        })
        } 
        if (this.secciones2[seccion]?.data?.[row]?.[col]) {
            this.secciones2[seccion].data[row][col].estado = estado
        }

        this.$emit('estado-celda-cambiado')
        this.menu.visible = false
        this.celdasSeleccionadas = []
    },

    iniciarSeleccion(row, col, seccion) {
        this.seleccionando = true
        this.celdasSeleccionadas = [{ row, col, seccion  }]
    },
    seleccionarCelda(row, col, seccion) {
        if (this.seleccionando) {
        const yaSeleccionada = this.celdasSeleccionadas.some(
            c => c.row === row && c.col === col && c.seccion === seccion
        )
        if (!yaSeleccionada) {
            this.celdasSeleccionadas.push({ row, col, seccion  })
        }
        }
    },
    finalizarSeleccion(event, seccionName) {
        this.seleccionando = false
        if (this.celdasSeleccionadas.length > 0) {
        this.menu.visible = true
        this.menu.x = event.clientX
        this.menu.y = event.clientY
        this.menu.seccion = seccionName 
        }
        this.menu.visible = true
    },

    handleLeftClick(event, row, col, seccionName) {
        this.finalizarSeleccion(event, seccionName)
        if (this.celdasSeleccionadas.length === 1) {
            this.mostrarMenuContextual(event, seccionName, row, col)
        }
    },

    },
    watch: {
      niveles: {
        deep: true,
        handler(niveles) {
          niveles.forEach(nivel => {
            if (nivel.total > 0) {
              nivel.porcentaje = Math.round((nivel.actual / nivel.total) * 100);
            } else {
              nivel.porcentaje = 0;
            }
          });
        }
      },
      secciones: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          if (this.$refs.SeccionSuperior) {
            this.heightSeccionSuperior = this.$refs.SeccionSuperior.offsetHeight;
          }
          if (this.$refs.SeccionInferior) {
            this.heightSeccionInferior = this.$refs.SeccionInferior.offsetHeight;
          }
          if (this.$refs.SeccionDerecha) {
            this.widthSeccionDerecha = this.$refs.SeccionDerecha.offsetWidth;
          }
          if (this.$refs.SeccionIzquierda) {
            this.widthSeccionIzquierda = this.$refs.SeccionIzquierda.offsetWidth;
          }
        });
      }
    },
        secciones2: {
            handler(nuevasSecciones) {
                this.generarTablas(nuevasSecciones);
                },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
      this.updateRightWidth();
      this.updateLeftWidth();
      window.addEventListener("resize", this.updateRightWidth);
      window.addEventListener("resize", this.updateLeftWidth);
      document.addEventListener("mousedown", this.cerrarSiClickFuera);
      this.niveles.forEach(nivel => {
        nivel.porcentaje = Math.round((nivel.actual / nivel.total) * 100);
      });
      
    },
    beforeDestroy() {
      document.removeEventListener("mousedown", this.cerrarSiClickFuera);
      window.removeEventListener("resize", this.updateRightWidth);
      window.removeEventListener("resize", this.updateLeftWidth);
    },
    beforeUnmount() {
    window.removeEventListener('click', () => {
      this.menu.visible = false
    })
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input:focus {
    outline: none;
    border-color: inherit;
  }
  .styled-table {
    border-collapse: collapse;
    user-select: none; 
    width: 100%;
  }
  .vertical-text {
    writing-mode: vertical-rl; 
    text-orientation: mixed;
    white-space: nowrap; 
  }
  .vertical-textLeft {
    writing-mode: vertical-lr; 
    text-orientation: mixed;
    white-space: nowrap; 
  }
  
  .styled-table th,
  .styled-table td {
    border: 1px solid rgb(221, 221, 221);
    padding: 8px 15px;
    text-align: center;
  }
  
  .styled-table thead th {
    background-color: #dde5f4; 
    font-weight: bold;
  }
  
  .styled-table tbody td:first-child {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .reverse-table {
    border-collapse: collapse;
    width: 100%;
    user-select: none; 
  }
  
  .reverse-table th,
  .reverse-table td {
    border: 1px solid rgb(228, 228, 228);
    padding: 8px 15px;
    text-align: center;
  }
  .resaltado {
    background-color: rgba(173, 216, 230, 0.6);
    transition: background 0.2s;
  }
  
  .reverse-table thead th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .reverse-table tbody td:first-child {
    background-color: #dde5f4; 
    font-weight: bold;
  }
  
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    appearance: auto;
  }
  .dropdownStyle2 {
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); 
  }
  td {
    cursor: pointer;
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
  }
  td.resaltado {
    cursor: crosshair; 
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .modalSecondary{
    z-index:10,
  }
  
  
   </style>