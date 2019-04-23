import { Overlay } from 'trading-vue-js'

export default {
    name: 'Next_Indicator',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { author: 'AlexanderPeters', version: '1.0.0' }
        },
        draw(ctx) {
            const l = this.$props.layout
            const upperLeftCorner = { x : 0, y : 0 }
            const upperRightCorner = { x : l.width, y : 0 }
            const bottomLeftCorner = { x : 0, y : l.height }
            const bottomRightCorner = { x : l.width, y : l.height }

            const offSetIntervalX = 15 //  % of Frame Width off of Corner
            const offSetIntervalY = 5 // % of Frame Height off of Corner
            const upperRightCornerOffset = { x : upperRightCorner.x - (l.width * offSetIntervalX / 100),
                                            y : upperRightCorner.y + (l.height * offSetIntervalY / 100) }
            const middleOfUpperRightCornerOffset = { x : upperRightCorner.x - (l.width * (offSetIntervalX/2) / 100),
                                                     y : upperRightCorner.y + (l.height * (offSetIntervalY/2) / 100) }

            ctx.lineWidth = 1
            ctx.strokeStyle = '#F9F9F9'
            ctx.fillStyle = '#F9F9F9'

            ctx.beginPath()           
            // Begin at Upper Right Conrer
            ctx.moveTo(upperRightCorner.x, upperRightCorner.y) 
            // Move Left
            ctx.lineTo(upperRightCornerOffset.x, upperRightCorner.y)
            // Move Down
            ctx.lineTo(upperRightCornerOffset.x, upperRightCornerOffset.y)
            // Move Right
            ctx.lineTo(upperRightCorner.x, upperRightCornerOffset.y)
            // Move Up
            ctx.lineTo(upperRightCorner.x, upperRightCorner.y)      
            ctx.fill()    
            ctx.stroke()

            ctx.font = "bold 13px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Next Indicator", middleOfUpperRightCornerOffset.x, middleOfUpperRightCornerOffset.y);

            //console.log("X: " + this.$props.cursor.x + " Y: " + this.$props.cursor.y)
            if(this.$props.cursor.x >= upperRightCornerOffset.x && this.$props.cursor.x <= upperRightCorner.x && 
                this.$props.cursor.y >= upperRightCorner.y && this.$props.cursor.y <= upperRightCornerOffset.y) {
                if(this.$props.cursor.locked) {
                    this.nextIndicator()
                }
            }
        },
        nextIndicator() {
            console.log("In box and middle button clicked.")
        },
        use_for() { 
            return ['Next_Indicator'] 
        },
        data_colors() { 
            return ['#F9F9F9'] 
        },
    },
    data() {
        return {}
    }
}
