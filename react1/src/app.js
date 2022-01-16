import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from "element-react";
import 'element-theme-default';


// class App extends React.Component {
//
//     state = {wo:true}
//
//     render() {
//         return (
//             <div>
//                 <Button onClick={this.App}>
//                     {this.state.wo?'我是傻逼':'我是天才'}
//                 </Button>
//             </div>
//         );
//     }
//     App = ()=>{
//         const s = this.state.wo
//         this.setState({wo:!s})
//     }
// }

// class List extends React.Component {
//     render() {
//         const {name, password} = this.props
//         return (
//             <ul>
//                 <li>姓名：{name}</li>
//                 <li>密码：{password}</li>
//             </ul>
//         )
//     }
//     static propTypes = {
//         name:Proptypes.string.isRequired
//     }
// }
//
// class Bpp extends React.Component {
//     MyRef = React.createRef()
//     render() {
//         return (
//             <div>
//                 <input ref="input1" placeholder="请输入"/>  {/*字符串形式的ref*/}
//                 <button onClick={this.show_data1}>点击</button>
//                 <input ref={(c) =>{this.input2 = c}} onBlur={this.show_data2}/>  {/*回调函数形式的ref*/}
//                 <input ref={this.MyRef} onBlur={this.show_data3}/> {/*createRef形式的ref*/}
//                 <input onBlur={this.show_data4} />
//             </div>
//         )
//     }
//     show_data1 = ()=>{
//         const {input1} = this.refs
//         alert(input1.value)
//     }
//     show_data2 = ()=>{
//         alert(this.input2.value)
//     }
//     show_data3 = ()=>{
//         alert(this.MyRef.current.value)
//     }
//     show_data4 = (event)=>{
//         alert(event.target.value)
//     }
// }

class Cpp extends React.Component {  //非受控组件：现用现取
    MyRef1 = React.createRef()
    MyRef2 = React.createRef()
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                请输入用户名：<input ref={this.MyRef1} type="text" name="username"/>
                请输入密码：<input ref={this.MyRef2} type="password" name="password"/>
                <button>提交</button>
            </form>
        )
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        alert(`用户名：${this.MyRef1.current.value}，密码：${this.MyRef2.current.value}`);
    }
}

// class Dpp extends React.Component {   //随着输入维护状态为受控组件，没有ref
//     state = {
//         username:'',
//         password:''
//     }
//     changeUsername = (event)=>{
//         this.setState({username:event.target.value})
//     }
//     changePassword = (event)=>{
//         this.setState({password:event.target.value})
//     }
//     handleSubmit = (event)=>{
//         event.preventDefault()
//         alert(`用户名：${this.state.username}，密码：${this.state.password}`)
//     }
//     render() {
//         return (
//             <form action={"https:baidu.com"} onSubmit={this.handleSubmit}>
//                 用户名：<input onChange={this.changeUsername} type="text" name="username"/>
//                 密码：<input onChange={this.changePassword} type="password" name="password"/>
//                 <button>提交</button>
//             </form>
//         )
//     }
// }

// class Epp extends React.Component {   //随着输入维护状态为受控组件，没有ref
//     state = {
//         username:'',
//         password:''
//     }
//     changeData1 = (dataType)=>{   //通过高阶函数实现柯里化
//         return (event)=>{
//             this.setState({[dataType]:event.target.value})
//         }
//     }
//     changeData2 = (dataType, eve)=>{   //不用柯里化实现
//         this.setState({[dataType]:eve.target.value})
//     }
//     handleSubmit = (event)=>{
//         event.preventDefault()
//         alert(`用户名：${this.state.username}，密码：${this.state.password}`)
//     }
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 用户名：<input onChange={this.changeData1('username')} type="text" name="username"/>
//                 密码：<input onChange={(event)=>{this.changeData2('password',event)}} type="password" name="password"/>
//                 <button>提交</button>
//             </form>
//         )
//     }
// }


class FPP extends React.Component {
    state = {opacity:1}
    death = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    componentDidMount() {
        this.timer = setInterval(()=>{
            let {opacity} = this.state
            opacity -= 0.1
            if(opacity <= 0) opacity = 1
            this.setState({opacity: opacity})
        },200)
    }
    render() {
        return (
            <div>
                <h1 style={{opacity:this.state.opacity}}>学不会React怎么办</h1>
                <button onClick={this.death}>不活了</button>
            </div>
        )
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
}
// ReactDOM.render(<App />, document.getElementById('root'));
// const p = {name:123,password:"123"}
// ReactDOM.render(<List {...p}/>, document.getElementById('root'));
// ReactDOM.render(<Bpp/>, document.getElementById('root'));
// ReactDOM.render(<Cpp/>, document.getElementById('root'));
// ReactDOM.render(<Dpp/>, document.getElementById('root'));
// ReactDOM.render(<Epp/>, document.getElementById('root'))
ReactDOM.render(<FPP/>, document.getElementById('root'))
