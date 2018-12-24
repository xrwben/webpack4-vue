import "./style.css"
import "./app.scss"
import './asserts/logo.png';
console.log("我是入口文件！！！");

const test = () => {
  console.log("123");
}
test();
console.log(...[1,2,3]);

if (process.env.NODE_ENV === "development") {
  console.log("process.env->", process.env.NODE_ENV);
} else {
  console.log("qer");
}

// var img = document.createElement("img");img.src = "./asserts/logo.png"
// document.body.appendChild(img);