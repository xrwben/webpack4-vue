<template>
	<div id="login">
		<img src="../asserts/share.jpg" alt="">
		<div class="list-con">
			<div class="list-item" v-for="(item, index) in rankList" :key="index">
				<span class="keys">{{ index+4 }}</span>
				<div class="avatar">
					<span class="live icon-sprite-s" v-if="item.isPlaying && rankTab!=='user'"></span>
					<img :src="item.headPic" alt="">
				</div>
				<div class="name txt-of">
					<p class=" txt-of">{{ item.nickname }}</p>
					<span :class="['level_icon', (rankTab==='user'?'u':'m')+'_level_icon_'+item.level]"></span>
				</div>
				<div class="val txt-of">{{ item.score }}</div>
			</div>
		</div>
		<hello ref="loading"></hello>
		<p>{{ count }}</p>

		<div class="scroll-up-container">
			<div class="scroll-list scroll-up-wrapper">
				<div class="scroll-item txt-of" v-for="item in awardRecord" :key="item.pid + Math.random()">
					<span class="username txt-of">{{ item.userNickname }}</span>送出{{ item.sendGiftName }}，<span class="modname txt-of">{{ item.modNickname }}</span>获得<span>{{ item.prize }}*{{ item.num }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
	import Hello from "../components/hello.vue";
	import TestMixins from "./mixins";
	import axios from "axios";
	import { Vue, Component, Provide, Watch } from "vue-property-decorator";

	@Component({
		components: {
			Hello
		},
		mixins: [TestMixins]
	})
	export default class Login extends Vue {
		// data
		rankTab: string = 'mod'
		rankList = []
		pageType = 'pc'
		count: number = 0
		// awardRecord = []

		// computed
		get giftPer (): string {
			return this.pageType === 'pc' ? '克拉' : '花瓣'
		}

		// watch
		@Watch("count")
		_count (newVal: number, oldVal: number) {
			console.log(newVal, oldVal)
		}

		// created  所有周期钩子正常使用 （beforeCreated、created、beforeMounted、mounted、beforeDestroy、destroyed）
		created (): void {
			this.getRankData()
		}

		// mounted
		// mounted () {
		// 	this.getRankData()
		// }

		// methods
		// 获取榜单数据
		getRankData (): void {
			const path = this.rankTab === 'mod' ? '/luckySugar4/modRanks' : '/luckySugar4/userRanks'
			this.$refs.loading && (this.$refs.loading as any).show()
			axios.get(path, {
				params: {
					page: 1,
					pageRows: 100
				}
			}).then(res => {
				if (res.data.errno === 0) {
					const resData = res.data.data
					const createList = []
					if (!resData.hasNext && resData.ranks.length < 100) {
						const len = resData.ranks.length
						for (let i = len; i < 10; i++) {
							createList.push({
								isPlaying: false,
								headPic: require('../asserts/xwyd.png'),
								nickname: '虚位以待',
								score: '--'
							})
						}
					}
					this.rankList = resData.ranks.concat(createList)
				} else {
					console.error(res.data.msg)
				}
			}).catch(err => {
				console.error(err)
			}).finally(() => {
				this.$refs.loading && (this.$refs.loading as any).hide()
			})
		}



		// data () {
		// 	return {
		// 		// 榜单
		// 		rankTab: 'mod',
		// 		rankList: [],
		// 		rankCenter: null,
		// 	}
		// },
		// created () {
		// 	this.getRankData()
		// },
		// methods: {
		// 	// 获取奖池滚动列表
		// 	getAwardList () {
		// 		axios.get('/luckySugar4/prizeList').then(res => {
		// 			if (res.data.errno === 0) {
		// 				const resData = res.data.data
		// 				if (resData.length > 4) {
		// 					this.awardRecord = resData.concat(resData.slice(0, 4))
		// 					this.$nextTick(() => {
		// 						// this.rowUpScroll()
		// 					})
		// 				} else {
		// 					this.awardRecord = resData
		// 				}
		// 			} else {
		// 				console.error(res.data.msg)
		// 			}
		// 		}).catch(err => {
		// 			console.error(err)
		// 		})
		// 	},
		// 	// 向上循环滚动动画
		// 	rowUpScroll () {
		// 		window.cancelAnimationFrame(this.animationIns)
		// 		let run = null
		// 		const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
		// 		const scrollWrapperHeight = document.querySelector('.scroll-up-container').getBoundingClientRect().height
		// 		const scrollIns = document.querySelector('.scroll-up-wrapper')
		// 		const cHeight = scrollIns.getBoundingClientRect().height
		// 		let sTop = scrollIns.scrollTop
		// 		console.log('滚动容器：', scrollWrapperHeight, cHeight, sTop)
		// 		run = () => {
		// 			window.cancelAnimationFrame(this.animationIns)
		// 			sTop++
		// 			scrollIns.style.transform = `translate3d(0, -${sTop}px, 0)`
		// 			// console.log('滚动了:', sTop, this.animationIns)
		// 			if (sTop >= cHeight - scrollWrapperHeight) {
		// 				sTop = 0
		// 			}
		// 			this.animationIns = requestAnimationFrame(run)
		// 		}
		// 		this.animationIns = requestAnimationFrame(run)
		// 		console.log('this.animationIns>>>>', this.animationIns)
		// 	},
		// 	// 获取榜单数据
		// 	getRankData () {
		// 		const path = this.rankTab === 'mod' ? '/luckySugar4/modRanks' : '/luckySugar4/userRanks'
		// 		this.$refs.loading && this.$refs.loading.show()
		// 		axios.get(path, {
		// 			params: {
		// 				page: 1,
		// 				pageRows: 100
		// 			}
		// 		}).then(res => {
		// 			if (res.data.errno === 0) {
		// 				const resData = res.data.data
		// 				const createList = []
		// 				if (!resData.hasNext && resData.ranks.length < 100) {
		// 					const len = resData.ranks.length
		// 					for (let i = len; i < 10; i++) {
		// 						createList.push({
		// 							isPlaying: false,
		// 							headPic: require('../asserts/xwyd.png'),
		// 							nickname: '虚位以待',
		// 							score: '--'
		// 						})
		// 					}
		// 				}
		// 				this.rankList = resData.ranks.concat(createList)
		// 				this.rankCenter = resData.myRank
		// 			} else {
		// 				console.error(res.data.msg)
		// 			}
		// 		}).catch(err => {
		// 			console.error(err)
		// 		}).finally(() => {
		// 			this.$refs.loading && this.$refs.loading.hide()
		// 		})
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	#login {
		$bf: 1*2;
		width: 100%;
		.list-con {
			width: 100%;
			background: rgba(79, 44, 235, 1);
			.list-item {
				border-bottom: 2px/$bf solid #fff;
				padding: 35px/$bf 0;
				display: flex;
				align-items: center;
				.keys {
					width: 150px/$bf;
					font-size: 40px/$bf;
					color: #fff;
					margin-left: 20px/$bf;
					text-align: center;
				}
				.avatar {
					width: 145px/$bf;
					height: 145px/$bf;
					margin-left: 30px/$bf;
					position: relative;
					& > img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 2px solid #f87b27;
						display: block;
					}
					.live {
						position: absolute;
						left: 0;
						right: 0;
						bottom: -10px/$bf;
						margin: auto;
					}
				}
				.name {
					flex: 1;
					color: #fff;
					font-size: 36px/$bf;
					margin-left: 20px/$bf;
					display: flex;
					align-items: center;
					& > span {
						flex-shrink: 0;
						margin-left: 5px/$bf;
					}
				}
				.val {
					width: 180px/$bf;
					color: #fff;
					font-size: 34px/$bf;
					text-align: center;
					margin-right: 30px/$bf;
				}
			}
		}
		.scroll-up-container {
            width: 1200px/$bf;
			height: 240px/$bf;
			background: rgba(79, 44, 235, 1);
            margin: 30px/$bf auto;
            overflow: hidden;
            .scroll-list {
                position: relative;
                .scroll-item {
                    line-height: 60px/$bf;
                    color: #fff;
                    font-size: 30px/$bf;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    .username, .modname {
                        max-width: 220px/$bf;
                    }
                }
            }
        }   

	}

</style>