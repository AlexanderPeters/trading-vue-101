<template>
<trading-vue
    :id	= "id"
    :titleTxt = "titleTxt"
    :data = "chart" 
    :overlays = "overlays"
    :width = "this.width" 
    :height = "this.height"
    :colorTitle = "colors.colorTitle"
    :color-back = "colors.colorBack"
    :color-grid = "colors.colorGrid"
    :color-text = "colors.colorText"
    :colorTextHL = "colors.colorTextHL"
    :colorScale = "colors.colorScale"
    :colorCross	= "colors.colorCross"
    :colorCandleUp = "colors.colorCandleUp"
    :colorCandleDw	= "colors.colorCandleDw"
    :colorWickUp = "colors.colorWickUp"
    :colorWickDw = "colors.colorWickDw"
    :colorWickSm = "colors.colorWickSm"
    :colorVolUp	= "colors.colorVolUp"
    :colorVolDw	= "colors.colorVolDw"
    :colorPanel	= "colors.colorPanel"
    :font = "font"
>   
</trading-vue>
</template>

<script>
// Import TradingVue Library
import TradingVue from 'trading-vue-js'
// Import Data
import Data from '../data/data.json'
// Import Overlays
//import Grin from './Grin.js'

export default {
    name: 'app',
    components: { 
        TradingVue
    },
    methods: {
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight
        }
    },
    created() {
        //this.overlays = [Grin]
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    data() {
        return {
            id: "0",
            titleTxt: "Example Plot",
            chart: Data,
            width: window.innerWidth,
            height: window.innerHeight,
            colors: {
                colorTitle: '#F9F9F9',                
                colorBack: '#181D26',
                colorGrid: '#363F4E',
                colorText: '#F9F9F9',
                colorTextHL: '#F9F9F9',
                colorScale: '#777777',
                colorCross: '#6F8594',
                colorCandleUp: '#00A399',
                colorCandleDw: '#FF5652',               
                colorWickUp: '#00A399',
                colorWickDw: '#FF5652',
                colorWickSm: "181D26", // What does this do?
                colorVolUp: '#132825',
                colorVolDw: '#281F27'
            },
            font: "bold 13px sans-serif"
            // Overlay update needed?
        }
    }
}
</script>

<style>
html,
body {
    background-color: #000;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
