import { Overlay } from 'trading-vue-js'

export default {
    name: 'Next_Indicator',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { author: 'AlexanderPeters', version: '1.0.0' }
        },
        draw(ctx) {
            // TODO: Text wrapping for prev/next indicator labels 
            // when the chart is shrunk in the x direction
            //TODO: Debouncing on buttons needed?

            const l = this.$props.layout
            const upperLeftCorner = { x : 0, y : 0 }
            const upperRightCorner = { x : l.width, y : 0 }
            const bottomLeftCorner = { x : 0, y : l.height }
            const bottomRightCorner = { x : l.width, y : l.height }

            const offSetIntervalXPrev = 30 //  % of Frame Width off of Corner
            const offSetIntervalXNext = 15 // % of FraemWidth off of Corner
            const offSetIntervalY = 5 // % of Frame Height off of Corner
            const upperRightCornerOffsetPrev = { 
                x : upperRightCorner.x - (l.width * offSetIntervalXPrev / 100),
                y : upperRightCorner.y + (l.height * offSetIntervalY / 100) 
            }
            const middleOfUpperRightCornerOffsetPrev = { 
                x : upperRightCorner.x - (l.width * (offSetIntervalXNext + 
                    (offSetIntervalXPrev - offSetIntervalXNext)/2) / 100),
                y : upperRightCorner.y + (l.height * (offSetIntervalY/2) / 100) 
            }
            const upperRightCornerOffsetNext = { 
                x : upperRightCorner.x - (l.width * offSetIntervalXNext / 100),
                y : upperRightCorner.y + (l.height * offSetIntervalY / 100) 
            }
            const middleOfUpperRightCornerOffsetNext = { 
                x : upperRightCorner.x - (l.width * (offSetIntervalXNext/2) / 100),
                y : upperRightCorner.y + (l.height * (offSetIntervalY/2) / 100) 
            }

            // Box drawing settings
            ctx.lineWidth = 3
            ctx.strokeStyle = 'black'
            ctx.fillStyle = '#F9F9F9'

            /// Previous Indicator
            ctx.beginPath()           
            // Begin offset to the left from Upper Right Corner
            ctx.moveTo(upperRightCornerOffsetNext.x, upperRightCorner.y) 
            // Move Left
            ctx.lineTo(upperRightCornerOffsetPrev.x, upperRightCorner.y)
            // Move Down
            ctx.lineTo(upperRightCornerOffsetPrev.x, upperRightCornerOffsetPrev.y)
            // Move Right
            ctx.lineTo(upperRightCornerOffsetNext.x, upperRightCornerOffsetPrev.y)
            // Move Up
            ctx.lineTo(upperRightCornerOffsetNext.x, upperRightCorner.y)      
            ctx.fill()    
            ctx.stroke()

            // Write Text
            ctx.font = "bold 13px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Previous Indicator", middleOfUpperRightCornerOffsetPrev.x, middleOfUpperRightCornerOffsetPrev.y);

            // Reset settings for box drawing
            ctx.lineWidth = 3
            ctx.strokeStyle = 'black'
            ctx.fillStyle = '#F9F9F9'

            /// Next Indicator
            ctx.beginPath()           
            // Begin at Upper Right Corner
            ctx.moveTo(upperRightCorner.x, upperRightCorner.y) 
            // Move Left
            ctx.lineTo(upperRightCornerOffsetNext.x, upperRightCorner.y)
            // Move Down
            ctx.lineTo(upperRightCornerOffsetNext.x, upperRightCornerOffsetNext.y)
            // Move Right
            ctx.lineTo(upperRightCorner.x, upperRightCornerOffsetNext.y)
            // Move Up
            ctx.lineTo(upperRightCorner.x, upperRightCorner.y)      
            ctx.fill()    
            ctx.stroke()

            // Write Text
            ctx.font = "bold 13px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Next Indicator", middleOfUpperRightCornerOffsetNext.x, middleOfUpperRightCornerOffsetNext.y);

            //console.log("X: " + this.$props.cursor.x + " Y: " + this.$props.cursor.y)
            // Any mouse button clicked?
            if(this.$props.cursor.locked) {
                // Cursor within prev indicator box?
                if(this.$props.cursor.x >= upperRightCornerOffsetPrev.x && this.$props.cursor.x <= upperRightCornerOffsetNext.x && 
                    this.$props.cursor.y >= upperRightCorner.y && this.$props.cursor.y <= upperRightCornerOffsetPrev.y) {
                        this.previousIndicator()
                }
                // Cursor within next indicator box?
                if(this.$props.cursor.x >= upperRightCornerOffsetNext.x && this.$props.cursor.x <= upperRightCorner.x && 
                    this.$props.cursor.y >= upperRightCorner.y && this.$props.cursor.y <= upperRightCornerOffsetNext.y) {
                        this.nextIndicator()
                }
            }
        },
        previousIndicator() {
            console.log("Previous Indicator")
        },
        nextIndicator() {
            console.log("Next Indicator")
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
