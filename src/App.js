import React, { Component } from 'react';
import Header from './components/Header';
import Navi from './components/Navi';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';
//import logo from './logo.svg';

class App extends Component {

  // 생성자, 초기화 -> 컴포넌트가 실행될때 제일먼저 실행되는 메소드 -> 보통 초기화 코드를 넣는다.
  // 컴포넌트가 실행될 때, render 메서드보다 먼저 실행되면서 컴포넌트의 값들을 초기화시켜주는 코드를 작성하고
  // 싶을때 생성자(constructor)메서드에 작성하면 된다.
  constructor(props) {
    super(props);
    // state값 초기화
    // console.log(props);
    this.max_content_id = 4;
    this.state = {
      mode:'welcome',
      selected_content_id:3,
      header:{title:'WEB', sub:'welcome,react!', sub1:'WEB 메인페이지입니다.'},
      welcome: {title:'WELCOME USER! :L', desc:'다양한 강의를 선택해서 들을 수 있습니다.'},
      contents:[
        {id:1, title:'HTML', desc:'1번예제입니다.'},
        {id:2, title:'CSS', desc:'2번예제입니다.'},
        {id:3, title:'JAVA', desc:'3번예제입니다.'},
        {id:4, title:'JAVASCRIPT', desc:'4번예제입니다.'}
      ]
    }
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        //_title = data.title;
        //_desc = data.desc;
        return data;
        //break;
      }
      i++;
    }
  }
  getContent() {
    var _title,_desc,_article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent 
                    title={_title} 
                    desc={_desc} 
                 >
                 </ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent 
                    title={_content.title} 
                    desc={_content.desc} 
                 >
                 </ReadContent>
    } else if (this.state.mode === 'create') {
      //console.log(this.state.mode);
      _article = <CreateContent 
                    title={_title} 
                    desc={_desc} 
                    onSubmit={function(_title,_desc){
                      this.max_content_id = this.max_content_id+1;
                      /*
                      var _contents = this.state.contents.concat(
                        {
                          id: this.max_content_id,
                          title: _title,
                          desc: _desc
                        }
                      );
                      */
                     var _contents = Array.from(this.state.contents);
                     _contents.push(
                        {
                          id: this.max_content_id,
                          title: _title,
                          desc: _desc
                        }
                     );
                      //console.log(_title,_desc);
                      this.setState({
                        contents: _contents,
                        mode: 'read',
                        selected_content_id: this.max_content_id
                      })
                    }.bind(this)}
                 >
                 </CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent
                    data = {_content}
                    onSubmit = {
                      function(_id,_title,_desc){
                        var _contents = Array.from(this.state.contents);
                        var i = 0;
                        while(i < _contents.length) {
                            if(_contents[i].id === _id) {
                              _contents[i] = {id:_id, title:_title, desc:_desc};
                              break;
                            }
                            i = i+1;
                        }
                        this.setState({
                            contents:_contents,
                            mode:'read'
                        });
                    }.bind(this)}
                    
                 >
                 </UpdateContent>
    }
    return _article;
  }
  render () {
    
    return (  
      <div className = "App">
        <Header title={this.state.header.title} 
                sub={this.state.header.sub1}
                onChangePage={function(){
                  this.setState({
                    mode:'welcome'
                  });
                }.bind(this)}
        >
        </Header>
        <Navi data={this.state.contents}
              onChangePage={function(id){
                //console.log(id);
                this.setState({
                  mode: 'read',
                  selected_content_id: Number(id)
                });
              }.bind(this)}
        >
        </Navi>
        <Control onChangeControl={function(mode){
                //console.log(mode);
                //alert('컨트롤 성공');
                var _mode = 'delete';
                if(_mode === 'delete') {
                  if(window.confirm('delete OK?')) {
                    var _contents = Array.from(this.state.contents);
                    var i = 0;
                    while (i < _contents.length) {
                      if(_contents[i].id === this.state.selected_content_id) {
                        _contents.splice(i,1);
                        break;
                      }
                      i ++;
                    }
                    this.setState({
                      mode:'welcome',
                      contents: _contents
                    });
                    alert('delete complete!');
                  }
                } else {
                  this.setState({
                    mode: mode
                  });
                }
              }.bind(this)}
        >
        </Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
