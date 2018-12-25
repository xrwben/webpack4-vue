<template>
	<div id="login">
    登陆页
		<!-- <Form class="login-list">
			<img src="../assets/logo.png">
			<h2>登录</h2>
      <FormItem>
         <Input type="text" placeholder="用户名">
         		<Icon type="android-person" slot="prepend"></Icon>
         </Input>
      </FormItem>
      <FormItem>
         <Input type="password" placeholder="密码">
         	  <Icon type="android-lock" slot="prepend"></Icon>
         </Input>
         <Checkbox type="text">记住密码</Checkbox>
      </FormItem>
      <FormItem>
        <Button type="primary" long>登录</Button>
      </FormItem>
    </Form> -->
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	#login {
		width: 100%;
		height: 100%;
		color: #eee;
		// background: url('../assets/bg.jpg') no-repeat center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
  	justify-content: center;
		& > .login-list {
			width: 400px;
			height: 280px;
			border: 1px solid #eee;
			border-radius: 8px;
			box-shadow: 0 0 5px rgba(255,255,255,.6);
			padding: 10px 50px;
			background: rgba(0, 0, 0, .5);
			display: table;
			vertical-align: middle;
			&> h2 {
	  		text-align: center;
	  		padding: 15px 0;
	  	}
	  	/deep/ .ivu-input-group-prepend {
	  		border: none;
        background-color: white;
        border-radius: 4px;
	  	}
	  	/deep/ .ivu-input {
        border-radius: 4px;
        border: none;
        text-align: center;
        text-align: left;
        &:focus, &:hover {
          border: none;
          outline: none;
          box-shadow: none;
        }
      }
		}
	}
</style>