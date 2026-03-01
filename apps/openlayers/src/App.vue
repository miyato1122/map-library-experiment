<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { XYZ } from "ol/source";

const mapContainer = ref<HTMLDivElement | null>(null);
let map: Map | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
          attributions: "国土地理院"
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([135.8048, 34.6851]),
      zoom: 16,
    }),
  });
});

onBeforeUnmount(() => {
  map?.setTarget(undefined);
  map = null;
});
</script>

<template>
  <div class="app">
    <div ref="mapContainer" class="map-container" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

.map-container {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
