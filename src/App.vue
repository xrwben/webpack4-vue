<template>
	<div id="app">
		<router-link to="/login">login</router-link>
		<router-link to="/about">about</router-link>
		<router-view></router-view>
		<!-- <login></login> -->
	</div>
</template>

<script lang="ts">
	import Login from "./page/Login.vue"
	import { Vue, Component } from "vue-property-decorator";

	@Component
	export default class App extends Vue {
		isApp = true
	}

</script>

<style>
	@import "./style/reset.css";
	#app {
		width: 100%;
		height: 100%;
	}
</style>