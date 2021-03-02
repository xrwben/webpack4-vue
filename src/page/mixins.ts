import axios from "axios";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Mixins extends Vue {
    awardRecord: object[] = []
    animationIns: number = 0

    // created
    created () {
        this.getAwardList()
    }

    // methods
    getAwardList () {
        axios.get('/luckySugar4/prizeList').then(res => {
            if (res.data.errno === 0) {
                const resData = res.data.data
                if (resData.length > 4) {
                    this.awardRecord = resData.concat(resData.slice(0, 4))
                    this.$nextTick(() => {
                        this.rowUpScroll()
                    })
                } else {
                    this.awardRecord = resData
                }
            } else {
                console.error(res.data.msg)
            }
        }).catch(err => {
            console.error(err)
        })
    }
    // 向上循环滚动动画
    rowUpScroll ():void {
        window.cancelAnimationFrame(this.animationIns)
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        const scrollWrapperHeight = document.querySelector('.scroll-up-container')!.getBoundingClientRect().height
        const scrollIns = document.querySelector('.scroll-up-wrapper')
        const cHeight = scrollIns!.getBoundingClientRect().height
        let sTop = scrollIns!.scrollTop
        console.log('滚动容器：', scrollWrapperHeight, cHeight, sTop)
        const run = () => {
            // window.cancelAnimationFrame(this.animationIns)
            sTop++
            (scrollIns as HTMLElement).style.transform = `translate3d(0, -${sTop}px, 0)`
            if (sTop >= cHeight - scrollWrapperHeight) {
                sTop = 0
            }
            this.animationIns = requestAnimationFrame(run)
        }
        this.animationIns = requestAnimationFrame(run)
        console.log('this.animationIns>>>>', this.animationIns)
    }
}