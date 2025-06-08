<template>
    <div>

      <div class="gap-2 w-full flex justify-between items-center">
        <div>
          <button 
          @click="name = 'ManejadorGrafico'; showOpciones = false" 
            :class="{ 'font-bold border-2 border-[#002B6B] text-[#002B6B] rounded-tl-lg': name === 'ManejadorGrafico' }"
            class="px-4 py-2">
            Manejador Gráfico
          </button>
        </div>
      </div>
  
      <div class="relative">
        <ManejadorGrafico v-if="name === 'ManejadorGrafico'" :selectedOrientation = "selectedOrientation" :secciones="secciones" :opciones="opciones2" :opcionesOption="opciones"     @actualizar-secciones="actualizarSecciones" :secciones2="secciones2" @estado-celda-cambiado="manejarCambioDeEstado"
        />
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <!-- Seleccion de Forma de Figuras -->

        <!-- Orientacion de los datos -->
        <div v-show="name === 'ManejadorGrafico'" class="dropdownStyle whitespace-nowrap bg-white w-[160px] h-[40px] text-xs font-normal flex items-center justify-between px-2"
        @click="toggleSection2('isHourOrientation')">
          <p v-if="selectedOrientation">{{ selectedOrientation }}</p>
          <p v-else>Orientacion de los datos </p>
          <p class="flex gap-1 items-center">
            <i v-if="selectedOrientation == 'Horario'" class="fa-solid fa-arrow-rotate-right text-sm"></i>
            <i v-if="selectedOrientation == 'AntiHorario'" class="fa-solid fa-arrow-rotate-left  text-sm"></i>
            <i v-if="isHourOrientation" class="fa-solid fa-caret-down text-sm"></i>
            <i v-else class="fa-solid fa-caret-right text-sm"></i>
          </p>
        </div>
    
    
        <div v-show="name === 'ManejadorGrafico'" v-if="isHourOrientation" class="flex gap-2">
            <div  class="w-[80px] h-[70px] border flex items-center justify-center cursor-pointer bg-white text-xs flex-col font-normal rounded-md"  @click="cambiarOrientacion('Horario')"
            :class="{ 'border-blue-500': selectedOrientation === 'Horario' }">
              <p class="pb-2">Horario</p>
              <i class="fa-solid fa-rotate-right text-2xl font-normal"></i>
            </div>
            <div  class="w-[80px] h-[70x] border flex items-center justify-center cursor-pointer bg-white text-xs flex-col font-normal rounded-md" @click="cambiarOrientacion('AntiHorario')"
            :class="{ 'border-blue-500': selectedOrientation === 'AntiHorario' }">
              <p class="pb-2">AntiHorario</p>
              <i class="fa-solid fa-rotate-left text-2xl font-normal"></i>
            </div>
        </div>
    
         <!-- Orden de las Secciones -->
         <div v-show="name === 'ManejadorGrafico'" class="dropdownStyle whitespace-nowrap bg-white w-[160px] h-[40px] text-xs font-normal flex items-center justify-between px-2"
         @click="toggleSection2('isOrder')">
          <p>
            Orden de las Secciones
          </p>
          <p>
            <i v-if="isOrder && selectedOrientation !== ''" class="fa-solid fa-caret-down text-sm"></i>
            <i v-else class="fa-solid fa-caret-right text-sm"></i>
          </p>
        </div>
    
        <div v-show="name === 'ManejadorGrafico'" class="relative">
          <div v-if="isOrder && selectedOrientation !== ''" class="dropdownStyle2 bg-white w-[160px] text-xs font-normal flex flex-col px-2 py-2 gap-2">
            <div v-for="(item, index) in opciones2" :key="index" class="flex justify-between w-full px-1 items-center">
              <p>{{ item.nombre }}</p>
              <div class="flex items-center gap-1">
                <input
                  type="text"
                  class="w-[60px] text-xs border border-gray-300 px-1 py-0.5 rounded flex-grow-0 text-center bg-gray-100 cursor-pointer"
                  v-model="item.valor"
                  readonly
                />
                <i class="fa-solid fa-chevron-right cursor-pointer" @click="abrirModalX(index, $event)"></i>
              </div>
            </div>
          </div>
    
          <!-- Modal de opciones a la derecha -->
          <div
            v-if="modalAbierto "
            class="absolute bg-white shadow-md rounded w-[120px] text-xs border top-0 left-40 flex flex-col gap-1">
            <button
              v-for="opcion in opcionesDisponibles"
              :key="opcion"
              @click="seleccionarOpcion3(opcion)"
              class="w-full  px-4 py-1 hover:bg-gray-200">
              {{ opcion }}
            </button>
          </div>
        </div>
    
        <!-- Secciónes  -->
        <div v-show="name === 'ManejadorGrafico'" class="w-full flex flex-col gap-2 z-50">
            <div
            v-for="([nombre, seccion], index) in Object.entries(secciones2)"
            :key="index"
            class="dropdownStyle bg-white w-[160px] text-xs font-normal px-2 flex flex-col border rounded shadow-md"
            >
            <!-- Sección principal con íconos -->
            <div
            :class="!opcionesCompletas ? 'opacity-50 cursor-not-allowed' : ''"
                class="flex items-center justify-between w-full py-2 cursor-pointer"
                @click="seccion.expandido = !seccion.expandido"
            >
                <p>{{ nombre }}</p>
                <div class="flex gap-1">
                <i :class="seccion.icono"></i>
                <i class="fa-solid fa-caret-right"></i>
                </div>
            </div>
    
            <!-- Contenido expandido -->
            <transition name="fade">
                <div v-if="seccion.expandido  && selectedOrientation !== ''" class="flex flex-col gap-1 pb-2">
                <div   class="relative w-full cursor-pointer"
                style="pointer-events: auto;">
                <input
                    v-model="seccion.direccion"
                    placeholder="Dirección"
                    class="border border-gray-300 px-2 py-1 rounded text-xs w-full"
                />
                </div>
                <div  class="relative w-full flex gap-2 items-center cursor-pointer"
                style="pointer-events: auto;">
                <p>Niveles</p>
                <input
                    v-model="seccion.niveles"
                    type="number"
                    placeholder="Niveles"
                    class="border border-gray-300 px-2 py-1 rounded text-xs w-full"
                    
                    @input="limitarRango($event, 'niveles', nombre)"
                />
                </div>
    
                <div   class="relative w-full flex gap-2 items-center cursor-pointer"
                style="pointer-events: auto;">
                <p>Paños</p>
                <input
                    v-model="seccion.panos"
                    type="number"
                    placeholder="Paños"
                    class="border border-gray-300 px-2 py-1 rounded text-xs w-full"
                    
                    @input="limitarRango($event, 'panos', nombre)"
                />
                </div>
    
                </div>
            </transition>
            </div>
            <div v-if="showModal" class=" modal-overlay flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
                <p class="text-lg font-semibold">¿Seguro que quiere editar, perderas gran parte de información de progreso?</p>
                <div class="flex justify-center gap-2 mt-4">
                <button @click="confirmarCambio" class="px-4 py-2 bg-red-500 text-white rounded">Sí</button>
                <button @click="cancelarCambio" class="px-4 py-2 bg-gray-300 rounded">No</button>
                </div>
            </div>
            </div>
        </div>

      </div>
      </div>
  
      <div  v-if="isDocumentosOpen"  class="w-[400px] bg-white border-l border-gray-200 transition-all duration-300 ml-4 fixed right-0 top-12 h-full pt-5 px-4 z-20">
      </div>
    </div>
    
  </template>
  
  <script>
  import ManejadorGrafico from "./ManejadorGrafico.vue";
  export default {
    name: "fase-uno",
    components: {
      ManejadorGrafico,
    },
    data() {
      return {
        name: "ManejadorGrafico" ,
        isDocumentosOpen : false,
        campo: "Estados",
        valor: "",    
        showFilter: false,   
        showOpciones: false, 
        mostrarOpciones: false,
        contenedorHeight: 0,
        isShapeExpanded: false,
        isHourOrientation: false,
        isOrder: false,
        opciones: [
          { texto: "Completo", icono: "text-green-500" , valor: "completo"},
          { texto: "No aplica", icono: "text-gray-400", valor: "no_aplica" },
        ],
        shapes: [
           { label: "Rectángulo Vertical", value: "vertical" },
           { label: "Rectángulo Horizontal", value: "horizontal" },
           { label: "Cuadrado", value: "square" }
         ],
         selectedOrientation:"",
         opciones2: [
          { nombre: "Primero", valor: "" },
          { nombre: "Segunda", valor: "" },
          { nombre: "Tercera", valor: "" },
          { nombre: "Cuarto", valor: "" },
        ],
        modalAbierto: false,
        indiceSeleccionado: null,
        opcionesBase: ["Superior", "Inferior", "Izquierda", "Derecha"],
        activeSection: null,
        selectedShape: "vertical",
        tempValue: null,
        tempField: null,
        permitirEdicion : {},
        tempSeccion: null,
        temporizadorEdicion: {},  
          temporizadores: {},
          temporizadorModal: {},
          modalCooldown : false,
          permitirBajarSinModal: {} ,
          lastFocusedInput: null,
          showModal: false,
        secciones: [
          { 
              nombre: "inferior", 
              icono: "fa-solid fa-down-long", 
              expandido: false, 
              direccion: "", 
              niveles: null, 
              banos: null, 
              seleccion: {}
          },
          { 
              nombre: "superior", 
              icono: "fa-solid fa-up-long", 
              expandido: false, 
              direccion: "", 
              niveles: null, 
              banos: null, 
              seleccion: {}
          },
          { 
              nombre: "izquierda", 
              icono: "fa-solid fa-left-long", 
              expandido: false, 
              direccion: "", 
              niveles: null, 
              banos: null, 
              seleccion: {}
          },
          { 
              nombre: "derecha", 
              icono: "fa-solid fa-right-long", 
              expandido: false, 
              direccion: "", 
              niveles: null, 
              banos: null, 
              seleccion: {}
          }
        ],
        secciones2: {
            inferior: {
                niveles: 0,
                panos: 0,
                expandido: false, 
                direccion: "", 
                icono: "fa-solid fa-down-long", 
                data: [] 
            },
            izquierda: {
                niveles: 0,
                panos: 0,
                expandido: false, 
                direccion: "", 
                icono: "fa-solid fa-left-long",
                data: []
            },
            superior: {
                niveles: 0,
                panos: 0,
                expandido: false, 
                direccion: "", 
                icono: "fa-solid fa-up-long",
                data: []
            },
            derecha: {
                niveles: 0,
                panos: 0,
                expandido: false, 
                direccion: "", 
                icono: "fa-solid fa-right-long", 
                data: []
            }
        },
      };
    },
    methods: {
        actualizarInferior({ nombre, seleccion }) {
        const seccionActualizada = this.secciones.find(seccion => seccion.nombre === nombre);
        if (seccionActualizada) {
          seccionActualizada.seleccion = seleccion;
          console.log(`Sección ${nombre} actualizada:`, seleccion);
        }
      },
      getShapeStyleInput(shape) {
          switch (shape) {
            case "vertical":
              return { width: "15px", height: "30px" };
            case "horizontal":
              return { width: "30px", height: "15px" };
            case "square":
              return { width: "25px", height: "25px" };
            default:
              return {};
          }
        },
        seleccionarOpcion3(opcion) {
          if (this.indiceSeleccionado !== null) {
            this.opciones2[this.indiceSeleccionado].valor = opcion;
            this.cerrarModal();
          }
        },
        actualizarSecciones(nuevaSeccion) {
          this.secciones = nuevaSeccion; 
        },
      handleClickDocumentos() {
        this.isDocumentosOpen = !this.isDocumentosOpen;
      },
      seleccionarOpcion(opcion) {
        this.valor = opcion.texto;       
        this.mostrarOpciones = false;    
      },
      verFiltros(){
        this.showFilter = !this.showFilter
        this.valor = "";
      },
      verOpciones(){
        this.showOpciones = !this.showOpciones
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
      toggleSection(section) {
        this.activeSection = this.activeSection === section ? null : section;
      },
      toggleSection2(section) {
          this[section] = !this[section];
      },
      cambiarOrientacion(orientacion) {
          if (this.selectedOrientation !== orientacion) {
            this.selectedOrientation = orientacion;
            this.invertirSeleccion();
          }
      },
      invertirSeleccion() {
          this.secciones.forEach((seccion) => {
          if (seccion.nombre) {
              if (!seccion.seleccion || Object.keys(seccion.seleccion).length === 0) return;
  
              const esHorizontal = ["izquierda", "derecha"].includes(seccion.nombre);
              const esVertical = ["superior", "inferior"].includes(seccion.nombre);
  
              if (esHorizontal) {
              const claves = Object.keys(seccion.seleccion).map(Number).sort((a, b) => a - b);
              const nuevaSeleccion = {};
  
              claves.forEach((fila, index) => {
                  const nuevaFila = claves[claves.length - 1 - index]; 
                  nuevaSeleccion[nuevaFila] = { ...seccion.seleccion[fila] }; 
              });
  
              seccion.seleccion = JSON.parse(JSON.stringify(nuevaSeleccion));
  
              } else if (esVertical) {
              Object.keys(seccion.seleccion).forEach(fila => {
                  const valores = Object.entries(seccion.seleccion[fila]) 
                  .map(([columna, valor]) => [Number(columna), valor])
                  .sort((a, b) => a[0] - b[0]) // Ordenar por clave
                  .reverse(); // Invertir el orden
                  const nuevaFila = {};
                  valores.forEach(([columna, valor], index) => {
                  nuevaFila[index] = valor; 
                  });
  
                  seccion.seleccion[fila] = nuevaFila;
              });
              }
          }
          });
      },
      seleccionarOpcion2(opcion) {
        if (this.indiceSeleccionado !== null) {
          this.opciones2[this.indiceSeleccionado].valor = opcion;
          this.cerrarModal();
        }
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
      },
      nextSection(index) {
        if (index < this.secciones.length - 1) {
          this.activeSection = this.secciones[index + 1].nombre;
        }
      },
      prevSection(index) {
        if (index > 0) {
          this.activeSection = this.secciones[index - 1].nombre;
        }
      },
      isSectionComplete(index) {
        const seccion = this.secciones[index];
        return seccion.direccion.trim() !== "" && seccion.niveles !== null && seccion.banos !== null;
      },
      setContainerHeight(height) {
        this.contenedorHeight = height; // Asignar la altura recibida del hijo
      },
      actualizarSeleccion(nombreSeccion) {
          // Buscar la sección en el array de secciones
          // this.updateRightWidth(); SE DEBE IMPLEMENTAR PARA QUE FUNCIONE EN MANEJADOR GRAFICO
          // this.updateLeftWidth(); SE DEBE IMPLEMENTAR PARA QUE FUNCIONE EN MANEJADOR GRAFICO
          console.log("actualizando", nombreSeccion)
          const seccion = this.secciones.find(sec => sec.nombre === nombreSeccion);
          
          if (!seccion) {
            console.error(` Sección "${nombreSeccion}" no encontrada.`);
            return;
          }
    
          // Asegurar que seleccion sea un objeto
          if (!seccion.seleccion) {
            seccion.seleccion = {};
          }
    
          const { direccion, niveles, banos } = seccion;
    
          // Determinar el grupo según la orientación
          const esHorizontal = ["izquierda", "derecha"].includes(nombreSeccion);
          const esVertical = ["superior", "inferior"].includes(nombreSeccion);
    
          if (!esVertical && !esHorizontal) {
            console.error(`Dirección "${direccion}" no reconocida.`);
            return;
          }
    
          const nivelesMax = esVertical ? niveles : banos; 
          const banosMax = esVertical ? banos : niveles;
    
          // Limpiar niveles fuera del rango
          Object.keys(seccion.seleccion).forEach(nivel => {
            if (Number(nivel) >= nivelesMax) {
              delete seccion.seleccion[nivel]; // Elimina niveles fuera del rango
            }
          });
    
          // Recorremos los niveles válidos
          for (let i = 0; i < nivelesMax; i++) {
            if (!seccion.seleccion[i]) {
              seccion.seleccion[i] = {}; 
            }
    
            // Limpiar baños fuera del rango en cada nivel
            Object.keys(seccion.seleccion[i]).forEach(bano => {
              if (Number(bano) >= banosMax) {
                delete seccion.seleccion[i][bano]; 
              }
            });
    
            // Agregar los baños faltantes inicializados en `null`, manteniendo valores existentes
            for (let j = 0; j < banosMax; j++) {
              if (seccion.seleccion[i][j] === undefined) {
                seccion.seleccion[i][j] = null;
              }
            }
          }
        },
        validarTecla(event, seccion, field) {
          const nombreSeccion = seccion.nombre;
    
          if (!(nombreSeccion in this.permitirEdicion)) {
            // Si es la primera edición, permitir y activar temporizador
            this.permitirEdicion[nombreSeccion] = true;
            
            this.temporizadores[nombreSeccion] = setTimeout(() => {
              this.permitirEdicion[nombreSeccion] = false;
            }, 7000);
          }
    
          if (this.permitirEdicion[nombreSeccion]) {
            return; 
          }
    
          if (event.key === "ArrowDown") {
            event.preventDefault();
            this.validarCambio(seccion, field, event);
          } else if (event.key === "ArrowUp" || event.key === "Tab") {
            return;
          } else {
            event.preventDefault();
          }
        },
    
        validarCambio(seccion, field, event) {
          console.log(seccion)
          console.log(field)
          console.log(event)
          const nuevoValor = seccion[field] - 1;
    
          if (nuevoValor < seccion[field]) {
            // Verificar si hay algún estado distinto de null en `seleccion`
            const tieneEstados = Object.values(seccion.seleccion).some(fila => 
              Object.values(fila).some(valor => valor !== null)
            );
    
            if (!tieneEstados) {
              // Si todos los valores son `null`, permitir reducir sin modal
              seccion[field] = nuevoValor;
              return;
            }
    
            if (this.modalCooldown) {
              // Si está en cooldown, permitir la bajada sin mostrar el modal
              seccion[field] = nuevoValor;
              return;
            }
    
            this.tempSeccion = seccion;
            this.tempField = field;
            this.tempValue = seccion[field];
    
            this.lastFocusedInput = event.target; // Guardar el input activo
            this.lastFocusedInput.blur(); // Quitar el foco cuando se abre el modal
            console.log("asdasdas")
  
            this.showModal = true;
            this.modalCooldown = true; // Activar cooldown
    
            setTimeout(() => {
              this.modalCooldown = false; // Desactivar cooldown después de 7 segundos
            }, 7000);
          }
        },
    
        confirmarCambio() {
          if (this.tempSeccion && this.tempField) {
            this.tempSeccion[this.tempField]--; 
          }
          this.showModal = false;
    
          // Activar cooldown después de confirmar para permitir edición libre
          this.modalCooldown = true;
          setTimeout(() => {
            this.modalCooldown = false;
          }, 7000);
    
          // Restaurar el foco en el input después de aceptar
          if (this.lastFocusedInput) {
            this.$nextTick(() => {
              this.lastFocusedInput.focus();
            });
          }
        },
        actualizarValor(seccion, field, event) {
          seccion[field] = event.target.valueAsNumber;
        },
    
        cancelarCambio() {
          if (this.tempSeccion && this.tempField) {
            this.tempSeccion[this.tempField] = this.tempValue; 
          }
          this.showModal = false;
    
          // Bloquear la edición completamente al cancelar (sin temporizador)
          this.modalCooldown = false;
    
          if (this.lastFocusedInput) {
            this.$nextTick(() => {
              this.lastFocusedInput.focus();
            });
          }
        },
        actualizarSeleccion2(nombreSeccion) {
            const seccion = this.secciones2[nombreSeccion]
            const niveles = parseInt(seccion.niveles)
            const panos = parseInt(seccion.panos)

            if (!isNaN(niveles) && !isNaN(panos)) {
                // Generando grilla para la seccion
                seccion.data = this.generarSeccion(niveles, panos)

                // Recalcular numeración 
                this.recalcularNumeracion(this.secciones2)
            }
        },

        manejarCambioDeEstado() {
            this.recalcularNumeracion(this.secciones2)
        },

        limitarRango(event, tipo, nombre) {
            const maxValue = 10;
            let value = event.target.value;

            if (value > maxValue) {
            value = maxValue;
            } else if (value < 0) {
            value = 0;
            }

            if (tipo === 'niveles') {
            this.secciones2[nombre].niveles = value;
            } else if (tipo === 'panos') {
            this.secciones2[nombre].panos = value;
            }

            this.actualizarSeleccion2(nombre);
        },
        generarSeccion(rows, cols) {
            const data = []
            for (let i = 1; i <= rows; i++) {
            const fila = []
            for (let j = 1; j <= cols; j++) {
                fila.push({
                nivel: i,
                pano: j,
                estado: 'vacio',
                valor: ''
                })
            }
            data.push(fila)
            }
            return data
        },

        recalcularNumeracion(secciones) {
            const ordenRecorrido = this.opciones2.map(opcion => opcion.valor.toLowerCase())
            const conteoPorNivel = {}  
            ordenRecorrido.forEach(nombreSeccion => {
                const { data } = secciones[nombreSeccion]
                for (const row of data) { 
                    for (const celda of row) { 
                        const nivel = celda.nivel
                        if (celda.estado === 'no-aplica') {
                            celda.valor = ''
                        } else {
                            if (!conteoPorNivel[nivel]) conteoPorNivel[nivel] = 1
                            celda.valor = `${nivel}.${conteoPorNivel[nivel]}`
                            conteoPorNivel[nivel]++
                        }
                    }
                }
            })
        },
    },
    computed: {
      opcionesDisponibles() {
        const valoresUsados = this.opciones2.map((item) => item.valor);
        return this.opcionesBase.filter((opcion) => !valoresUsados.includes(opcion));
      },
      opcionesCompletas() {
          return this.opciones2.every(opcion => opcion.valor.trim() !== "");
      },
    },
    watch: {
      name(newValue) {
        if (newValue === 'FormatoTabla') {
          this.$nextTick(() => {
            // Esperar a que el DOM del FormatoTabla se actualice
            this.$refs.formatoTabla?.emitContainerHeight();
          });
        }
      }
    },
  
  };
  </script>
  <style>
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
   .dropdownStyle {
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); 
  }
  .dropdownStyle2 {
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); 
    }</style>