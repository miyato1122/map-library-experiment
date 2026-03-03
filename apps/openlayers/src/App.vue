<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import Map from 'ol/Map'
  import View from 'ol/View'
  import TileLayer from 'ol/layer/Tile'
  import OSM from 'ol/source/OSM'
  import type TileSource from 'ol/source/Tile'
  import { fromLonLat } from 'ol/proj'
  import 'ol/ol.css'
  import { XYZ } from 'ol/source'

  interface MapOption {
    id: string
    label: string
    makeSource: () => TileSource
  }

  const MAP_OPTIONS: MapOption[] = [
    {
      id: 'gsi-pale',
      label: '淡色地図',
      makeSource: () =>
        new XYZ({
          url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
          attributions: '国土地理院',
        }),
    },
    {
      id: 'gsi-std',
      label: '標準地図',
      makeSource: () =>
        new XYZ({
          url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
          attributions: '国土地理院',
        }),
    },
    {
      id: 'gsi-photo',
      label: '空中写真',
      makeSource: () =>
        new XYZ({
          url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
          attributions: '国土地理院',
        }),
    },
    {
      id: 'osm',
      label: 'OpenStreetMap',
      makeSource: () => new OSM(),
    },
  ]

  const mapContainer = ref<HTMLDivElement | null>(null)
  const activeMapId = ref<string>(MAP_OPTIONS[0].id)
  let map: Map | null = null
  let baseLayer: TileLayer<TileSource> | null = null

  onMounted(() => {
    if (!mapContainer.value) return

    const initialOption = MAP_OPTIONS.find((o) => o.id === activeMapId.value)!
    baseLayer = new TileLayer({ source: initialOption.makeSource() })

    map = new Map({
      target: mapContainer.value,
      layers: [baseLayer],
      view: new View({
        center: fromLonLat([135.8048, 34.6851]),
        zoom: 16,
      }),
    })
  })

  onBeforeUnmount(() => {
    map?.setTarget(undefined)
    map = null
    baseLayer = null
  })

  function switchBaseMap(option: MapOption): void {
    if (option.id === activeMapId.value) return
    activeMapId.value = option.id
    baseLayer?.setSource(option.makeSource())
  }
</script>

<template>
  <div class="app">
    <div class="map-wrapper">
      <div ref="mapContainer" class="map-container" />
      <div class="map-selector">
        <button
          v-for="option in MAP_OPTIONS"
          :key="option.id"
          :class="['map-btn', { active: option.id === activeMapId }]"
          @click="switchBaseMap(option)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
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

  .map-wrapper {
    flex: 1;
    position: relative;
  }

  .map-container {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .map-selector {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .map-btn {
    padding: 0.3rem 0.6rem;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    text-align: left;
    white-space: nowrap;
  }

  .map-btn:hover {
    background: #f0f0f0;
  }

  .map-btn.active {
    background: #0078d4;
    color: white;
    border-color: #0078d4;
  }
</style>
