<template>
    <div>
      <div>
        <h1 class="font-semibold">Panel Avance Grafico</h1>
        <div class="grid grid-cols-3 gap-20 py-5 px-14">
            <section class="border-2 border-gray-300 rounded-md p-3 h-[480px] flex flex-col justify-between">
                <div class="px-2">
                    <h1 class="text-2xl flex items-center font-semibold">Fase 1</h1>
                    <div class="flex place-content-center pb-10 pt-5">
                        <div class="relative w-24 h-24 flex items-center justify-center">
                            <span class="absolute text-xs font-semibold">80%</span>
                            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <!-- Fondo del anillo -->
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="38" 
                                fill="none" 
                                stroke="gray" 
                                stroke-width="23" 
                                opacity="0.3"
                            />
                            <!-- Progreso -->
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="38" 
                                fill="none" 
                                stroke="#92CF2F" 
                                stroke-width="23"
                                stroke-dasharray="238" 
                                :stroke-dashoffset="238 - (80 / 100) * 238"
                                class="transition-all duration-300"
                            />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col gap-7 font-normal">
                        <div class="text-xs flex items-center gap-6 px-4 justify-center">
                            <p>Secciones</p>
                            <div class="relative w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div 
                                    class="absolute top-0 left-0 h-full bg-green-800 transition-all duration-300"
                                    :style="{ width: `${(11 / 13) * 100}%` }"
                                ></div>
                            </div>
                            <p>11/13</p>
                        </div>
                        <div class="text-sm px-7 flex flex-col gap-4">
                            <span class="flex items-center justify-between">
                                <p>AVANCE NIVEL 1</p>
                                <p>23 / 23</p>
                            </span>
                            <span class="flex items-center justify-between">
                                <p>AVANCE NIVEL 2</p>
                                <p>23 / 23</p>
                            </span>
                            <span class="flex items-center justify-between">
                                <p>AVANCE NIVEL 3</p>
                                <p>23 / 23</p>
                            </span>
                        </div>
                    </div>
                </div>    
                <div class="flex justify-end my-3">
                    <button @click="ingresarFase(1)" class="bg-orange-500 text-white rounded-md shadow-lg text-xs px-2 py-1 hover:cursor-pointer">Ingresar</button>
                </div>
            </section>
            <section class="border-2 border-gray-300 rounded-md p-3 h-[480px] flex flex-col justify-between">
                <div class="px-2">
                    <h1 class="text-2xl flex items-center font-semibold"> Fase 2</h1>
                    <div class="flex place-content-center pb-10 pt-5">
                        <div class="relative w-24 h-24 flex items-center justify-center">
                            <span class="absolute text-xs font-semibold">80%</span>
                            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <!-- Fondo del anillo -->
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="38" 
                                fill="none" 
                                stroke="gray" 
                                stroke-width="23" 
                                opacity="0.3"
                            />
                            <!-- Progreso -->
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="38" 
                                fill="none" 
                                stroke="#92CF2F" 
                                stroke-width="23"
                                stroke-dasharray="238" 
                                :stroke-dashoffset="238 - (80 / 100) * 238"
                                class="transition-all duration-300"
                            />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col gap-7 font-normal">
                        <div class="text-xs flex items-center gap-6 px-4 justify-center">
                            <p>Actividades</p>
                            <div class="relative w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div 
                                    class="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                                    :style="{ width: `${(11 / 13) * 100}%` }"
                                ></div>
                            </div>
                            <p>11/13</p>
                        </div>
                        <div class="text-sm px-7 flex flex-col gap-4">
                            <span class="flex items-center justify-between">
                                <p>Retrasadas</p>
                                <span class="flex items-center gap-2">
                                    <p>25</p>
                                    <span class="w-3 h-3 bg-red-500 mb-[1px]"></span>
                                </span>
                            </span>
                            <span class="flex items-center justify-between">
                                <p>Completadas</p>
                                <span class="flex items-center gap-2">
                                    <p>25</p>
                                    <span class="w-3 h-3 bg-orange-500 mb-[1px]"></span>
                                </span>
                            </span>
                            <span class="flex items-center justify-between">
                                <p>Pendientes</p>
                                <span class="flex items-center gap-2">
                                    <p>25</p>
                                    <span class="w-3 h-3 bg-gray-300 mb-[1px]"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>    
                <div class="flex justify-end my-3">
                    <button @click="ingresarFase(2)" class="bg-orange-500 text-white rounded-md shadow-lg text-xs px-2 py-1 hover:cursor-pointer">Ingresar</button>
                </div>
            </section>
            <section class="border-2 border-gray-300 rounded-md p-3 h-[480px] flex flex-col justify-between">
                <div class="px-2">
                    <h1 class="text-2xl flex items-center font-semibold"> Fase 3</h1>
                    <div class="flex place-content-center pb-10 pt-5">
                        <div class="relative w-24 h-24 flex items-center justify-center">
                            <span class="absolute text-xs font-semibold">80%</span>
                            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <!-- Fondo del anillo -->
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="38" 
                                fill="none" 
                                stroke="gray" 
                                stroke-width="23" 
                                opacity="0.3"
                            />
                            <!-- Progreso -->
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="38" 
                                fill="none" 
                                stroke="#92CF2F" 
                                stroke-width="23"
                                stroke-dasharray="238" 
                                :stroke-dashoffset="238 - (80 / 100) * 238"
                                class="transition-all duration-300"
                            />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col gap-7 font-normal">
                        <div class="text-xs flex items-center gap-6 px-4 justify-center">
                            <p>Pisos</p>
                            <div class="relative w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div 
                                    class="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                                    :style="{ width: `${(11 / 13) * 100}%` }"
                                ></div>
                            </div>
                            <p>11/13</p>
                        </div>
                        <div class="text-sm px-7 flex flex-col gap-4">
                            <span class="flex items-center justify-between">
                                <p>Retrasadas</p>
                                <span class="flex items-center gap-2">
                                    <p>25</p>
                                    <span class="w-3 h-3 bg-red-500 mb-[1px]"></span>
                                </span>
                            </span>
                            <span class="flex items-center justify-between">
                                <p>Completadas</p>
                                <span class="flex items-center gap-2">
                                    <p>25</p>
                                    <span class="w-3 h-3 bg-orange-500 mb-[1px]"></span>
                                </span>
                            </span>
                            <span class="flex items-center justify-between">
                                <p>Pendientes</p>
                                <span class="flex items-center gap-2">
                                    <p>25</p>
                                    <span class="w-3 h-3 bg-gray-300 mb-[1px]"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>    
                <div class="flex justify-end my-3">
                    <button @click="ingresarFase(3)" class="bg-orange-500 text-white rounded-md shadow-lg text-xs px-2 py-1 hover:cursor-pointer">Ingresar</button>
                </div>
            </section>
        </div>
      </div>  
    </div>
</template>
  
<script>
    export default {
        name: "add-avance-grafico",
        components: {
            
        },
    
        data: () => ({
            nameProyecto: "",
        }),
        computed: {
        
        },
        methods: {
            ingresarFase(fase){
                switch (fase){
                    case 1:
                        this.$router.push({
                            name: 'fase-uno',
                        });
                        break;
                    case 2:
                        this.$router.push({
                            name: 'fase-dos',
                        });
                        break;
                    case 3:
                        this.$router.push({
                            name: 'fase-tres',
                        });
                        break;
                }
            }
        },
    
        async mounted() {
        },
        beforeUnmount() {

        },
    };
</script>