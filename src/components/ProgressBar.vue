<template>
    <div class="progress-container">
      <div
        class="h-1.5 border-1 rounded border-slate-500 progress-bar"
        :style="{ width: progress + '%', backgroundColor: progressColor }"
      ></div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "progress-bar-component",
    props: {
      progress: {
        type: Number,
        default: 0,
      },
      progressColor: {
        type: String,
        default: "white", 
      },
    },
  };
  </script>
  
  
  <style scoped>
  .progress-container {
    width: 100%;
    overflow: hidden; 
  }
  
  .progress-bar {
    width: 0%;
    transition: width 0.1s ease-in-out;
  }
  </style>
  